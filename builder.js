const OMNEEDIA={
	engine:"builder",
	version: "1.0.0a"
};

var fs=require('fs');
var path = require('path');

var cluster=require('cluster');
var numCPUs = require('os').cpus().length;


// check env
var check_env=-1;

if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'packages')) {
	fs.mkdirSync(__dirname+path.sep+'..'+path.sep+'packages');
	check_env=1;
};

function freeport(cb) {
    var net = require('net');
    var server = net.createServer()
        , port = 0
    server.on('listening', function () {
        port = server.address().port
        server.close()
    });
    server.on('close', function () {
        cb(null, port)
    });
    server.listen(0);
};

if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'config')) fs.mkdirSync(__dirname+path.sep+'..'+path.sep+'config');
				   
if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'config'+path.sep+'builder.json')) {
	var cmd={
		"cluster_host": "CLUSTER_HOST",
		"threads": "*",
		"port": "9292"
	};
	fs.writeFileSync(__dirname+path.sep+'..'+path.sep+'config'+path.sep+'workers.json',JSON.stringify(cmd,null,4));
	check_env=1;
};

//

var json=fs.readFileSync(__dirname+path.sep+".."+path.sep+"config"+path.sep+"builder.json");
var Config = JSON.parse(json);
if (Config.proxy) var Request=request.defaults({'proxy':Config.proxy}); else var Request=require('request');

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '0.0.0.0';
};

if (Config.threads != "*") {
    //if (Config.threads * 1 <= numCPUs) 
	numCPUs = Config.threads * 1;
};

if (cluster.isMaster) {
	if (check_env==1) {
		process.exit();
		return;
	} else {
		if (fs.existsSync(__dirname+path.sep+"builder.lock")) fs.unlinkSync(__dirname+path.sep+"builder.lock");
		for (var i = 0, n = numCPUs; i < n; i += 1) cluster.fork();
		console.log('');
		console.log('  Omneedia Builder started at '+getIPAddress()+":"+Config.port+" ("+numCPUs+" threads)");	

		var cluster_host = Config.cluster.split(':')[0];

		console.log("  Connecting to cluster " + cluster_host);

		var socket = require('socket.io-client')('http://' + cluster_host);
		
		socket.on('disconnect', function () {
			console.log("  Cluster lost...".red);
		});

		socket.on('connect', function () {
			console.log('  - Cluster Connected');

			// update cluster
			if (Config.hostname) var hostname=Config.hostname; else var hostname=getIPAddress()+':'+Config.port;
			socket.emit('@BUILDER#ONLINE', {
				service: "builder"
				, host: hostname
				, pid: process.pid
			});
			socket.on('@BUILDER#REGISTER', function () {
				console.log('  - Builder engine registered.');
				Builder();
			});

		});

		socket.on('event', function (data) {


		});

		socket.on('disconnect', function () {

		});	
		
		function Builder() {
			if (!fs.existsSync(__dirname+path.sep+"builder.lock")) {
				var dir=fs.readdirSync(__dirname+path.sep+".."+path.sep+"var"+path.sep+"packages");
				if (dir.length==0) {
					setTimeout(function(){
						Builder();
					},1000);
					return;	
				};
				var output=__dirname+path.sep+".."+path.sep+"var"+path.sep+"packages"+path.sep+dir[0].split('.zip')[0];
				var shelljs=require('shelljs');
				if (fs.existsSync(output)) shelljs.rm('-Rf',output);
				var AdmZip = require('adm-zip');
				var prefix=dir[0].split('.zip')[0];
				var zip = new AdmZip(output+'.zip');
				zip.extractAllTo(output, true);				
				process.chdir(output);
				if (fs.existsSync(output+path.sep+'app.manifest')) {
					fs.writeFileSync(__dirname+path.sep+"builder.lock",'lock');
					var fest=fs.readFileSync(output+path.sep+'app.manifest','utf-8');
					try {
						fest=JSON.parse(fest);	
						shelljs.exec(__dirname+path.sep+"nodejs/bin/node \""+__dirname+path.sep+"omneedia.js\" update --builder");
						shelljs.cp(output+path.sep+"etc"+path.sep+"settings.json",output+path.sep+"etc"+path.sep+"settings-prod.json");
						shelljs.exec(__dirname+path.sep+"nodejs/bin/node \""+__dirname+path.sep+"omneedia.js\" clean build production --builder");
						var bld=fest.build+1;
						var ret=output+path.sep+"builds"+path.sep+"production"+path.sep+fest.version+'.'+bld+path.sep+fest.namespace+'.drone';
						if (fs.existsSync(ret)) {
							var response={
								pid: prefix,
								ns: fest.namespace,
								filename: path.basename(ret),
								status: "OK",
								file: fs.createReadStream(ret)
							};
						} else {
							var response={
								pid: prefix,
								ns: fest.namespace,
								status: "FAILED"
							};
						}
					} catch (e) {
						var response={
							pid: prefix,
							status: "FAILED"
						};						
					};
				} else {
					var response={
						pid: prefix,
						status: "FAILED"
					};
				};
				console.log("Sending response to Cluster");
				Request({
					url: 'http://'+Config.cluster+'/builder'
					, formData: response
					, method: "post"
					, encoding: null
				}, function (err, resx, body) {
					fs.unlinkSync(__dirname+path.sep+"builder.lock");
					if (fs.existsSync(output)) shelljs.rm('-Rf',output);
					fs.unlinkSync(output+'.zip');
					setTimeout(function(){
						Builder();
					},1000);
				});
			} else setTimeout(function(){
				Builder();
			},1000);
		};
			

	}
} else 
{
	console.log("  - thread started.");
	
	var express=require("express");
	var watchr = require('watchr');
	var shelljs = require('shelljs');
	var list=[];
	var ACTIVE=-1;

	if (!fs.existsSync(__dirname+path.sep+".."+path.sep+"config"+path.sep+"builder.json")) {
		console.log('!! builder.config not found. FATAL ERROR');
		return;
	};
	
	try {	
		if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+"tmp")) fs.mkdirSync(__dirname+path.sep+'..'+path.sep+"tmp");
	}catch(e){};
	
	var app = express();

	app.use(require('morgan')("dev"));
	app.use(require('cookie-parser')());
	app.use(require('body-parser').urlencoded({
		extended: true,
		limit: "5000mb"
	}));
	app.use(require('body-parser').json({
		limit: "5000mb"
	}));
	

    // initialize socket.io
    var http = app.listen(0, getIPAddress());

    app.IO = require('socket.io')(http);

    app.use(require('cookie-parser')());
	
	var redis=require('socket.io-redis');
	app.IO.adapter(redis(Config.cluster.split(':')[0]));
			
    app.IO.on('connection', function (socket) {
        console.log('connection...');
        var response = {
            omneedia: OMNEEDIA, 
			engine: "builder",
			session: socket.id
        };
        socket.on('#builder#create', function (room) {
            console.log("- " + room + " joined.");
            socket.join(room);
        });
        socket.on('#builder#send', function (o) {
            o = JSON.parse(o);
            /*console.log(Clients);
            if (!o.users) {
                // on envoie qu'à la session en cours
                app.IO.sockets.to(socket.id).emit(o.uri, o.data);
            } else {
                if (Object.prototype.toString.call(o.users) === '[object Array]') {
                    // on envoie qu'aux sockets des élus
                    for (var i = 0; i < o.users.length; i++) {
                        var _id = o.users[i];
                        if (Clients.uid[_id]) {
                            var tab = Clients.uid[_id];
                            for (var j = 0; j < tab.length; j++) {
                                app.IO.sockets.to(tab[j]).emit(o.uri, o.data);
                            }
                        };
                        if (Clients.mail[_id]) {
                            var tab = Clients.mail[_id];
                            for (var j = 0; j < tab.length; j++) app.IO.sockets.to(tab[j]).emit(o.uri, o.data);
                        };
                    };
                } else {
                    if (o.users == "*") {
                        // on broadcast à tout le monde connecté à l'application
                        app.IO.sockets.emit(o.uri, o.data);
                    }
                }
            };*/
        });

        socket.emit('#builder#session', JSON.stringify(response));
    });
	
	app.get('/',function(req,res) {
		var response={
			"omneedia" : OMNEEDIA
		};
		res.writeHead(200, {'Content-Type' : 'application/json','charset' : 'utf-8'});
		res.end(JSON.stringify(response,null,4));		
		return;
	});	
	app.get('/api',function(req,res) {
		res.writeHead(200, {'Content-Type' : 'application/json','charset' : 'utf-8'});
		res.end(JSON.stringify({omneedia: OMNEEDIA},null,4));
		return;
	});	
	var multer=require('multer');
	if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+"tmp")) fs.mkdirSync(__dirname+path.sep+'..'+path.sep+"tmp"); 
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname+require('path').sep+'..'+require('path').sep+'tmp')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    });

    var UPLOAD = multer({ storage: storage })    
	
	app.get('/stats',function(req,res){
		var pusage=require('pidusage');
		pusage.stat(process.pid, function(err, stat) {
			res.end(JSON.stringify(stat));
		});
	});  
	
	app.post('/upload',UPLOAD.single("file"),function(req,res,next){
		// Are you in my access list ?
			if(req.file){
				processFiles(req.file.path);
				res.end("File uploaded.");
			}
	});
	
	app.post('/builder',UPLOAD.single("file"),function(req,res,next){
		if(req.file){
			var shelljs=require('shelljs');	shelljs.mv(req.file.path,__dirname+path.sep+".."+path.sep+"var"+path.sep+"packages"+path.sep+path.basename(req.file.path));
			res.end("  File uploaded.");
		}
	});
	
	app.enable('trust proxy');	
	app.listen(Config.port);
}
