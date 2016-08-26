const OMNEEDIA={
	engine:"sandbox",
	version: "1.0.0b"
};

var fs=require('fs');
var path = require('path');

var cluster=require('cluster');
var numCPUs = require('os').cpus().length;

// check env
var check_env=-1;

if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'tmp')) {
	fs.mkdirSync(__dirname+path.sep+'..'+path.sep+'tmp');
	check_env=1;
};
if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'pids')) {
	fs.mkdirSync(__dirname+path.sep+'..'+path.sep+'pids');
	check_env=1;
};
if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'var')) {
	fs.mkdirSync(__dirname+path.sep+'..'+path.sep+'var');
	check_env=1;
};

if (!fs.existsSync(__dirname+path.sep+".."+path.sep+"config"+path.sep+"sandbox.json")) {
	console.log('!! sandbox.config not found. FATAL ERROR');
	return;
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

//

var json=fs.readFileSync(__dirname+path.sep+".."+path.sep+"config"+path.sep+"sandbox.json");
var Config = JSON.parse(json);

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

function Launch(xpath,dir,ndx,cb) {
	if (ndx>=dir.length) {
		cb();
		return;
	};
	var shelljs=require('shelljs');
	var file=xpath+path.sep+dir[ndx];
	file=fs.readFileSync(file,'utf-8').split(':');
	freeport(function(err,port) {
		var spawn = require('child_process').spawn;
		var oa=__dirname+path.sep+'oa';
		var pkg=file[2].substr(file[2].indexOf('.')+1,file[2].length).split('.'+Config.domain)[0];
		var prc = spawn('nohup',  [oa, 'start', '--port',port,'--app',pkg, '--sandbox','--user',file[2].split('.')[0],'&>log','&']);
		var ofile=xpath+path.sep+dir[ndx];
		if (fs.existsSync(ofile)) {
			var line=fs.readFileSync(ofile,'utf-8').split(':');
			if (line[1]!="XXX") shelljs.exec('kill -9 '+line[1]);
		};			
		//console.log(file[2]);return;
		fs.writeFileSync(ofile,port+':XXX:'+file[2].split('.')[0]+'.'+pkg+'.'+Config.domain);
		Launch(xpath,dir,ndx+1,cb);
	});	
};

if (cluster.isMaster) {
	if (check_env==1) {
		process.exit();
		return;
	} else {
		for (var i = 0, n = numCPUs; i < n; i += 1) cluster.fork();
		console.log('');
		console.log('  Omneedia Sandbox started at '+getIPAddress()+":"+Config.port+" ("+numCPUs+" threads)");

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
			socket.emit('@SANDBOX#ONLINE', {
				service: "sandbox"
				, host: hostname
				, pid: process.pid
			});
			socket.on('@SANDBOX#REGISTER', function () {
				console.log('  - Sandbox engine registered.');
			});
			
			var dir=fs.readdirSync(__dirname+path.sep+'..'+path.sep+'pids');
			Launch(__dirname+path.sep+'..'+path.sep+'pids',dir,0,function(){
				console.log('  - All engines started.')
			});

		});

		socket.on('event', function (data) {


		});

		socket.on('disconnect', function () {

		});			
		
	}
} else 
{

	var express=require("express");
	var shelljs = require('shelljs');
	var list=[];
	var ACTIVE=-1;
	
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
	app.get('/stats',function(req,res){
		var pusage=require('pidusage');
		pusage.stat(process.pid, function(err, stat) {
			res.end(JSON.stringify(stat));
		});
	});    
    
	var multer=require('multer');
	
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname+require('path').sep+'..'+require('path').sep+'tmp')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    });

    var UPLOAD = multer({ storage: storage })    

	app.post('/sandbox',UPLOAD.single("file"),function(req,res,next){
		var path=require('path');
		var jsoconf=JSON.parse(fs.readFileSync(__dirname+path.sep+'..'+path.sep+'..'+path.sep+'Sandbox'+path.sep+'config'+path.sep+'sandbox.json'));
		shelljs.exec('7z x "'+req.file.path+'" -o"'+__dirname+path.sep+'..'+path.sep+"tmp"+path.sep+req.file.path.split('snapshot.')[1]+'"');
		shelljs.rm(req.file.path);
		if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'var'+path.sep+req.body.pid)) fs.mkdirSync(__dirname+path.sep+'..'+path.sep+'var'+path.sep+req.body.pid); else {
			if (fs.existsSync(__dirname+path.sep+'..'+path.sep+'var'+path.sep+req.body.pid+path.sep+req.body.pkg)) shelljs.rm('-Rf',__dirname+path.sep+'..'+path.sep+'var'+path.sep+req.body.pid+path.sep+req.body.pkg);	
		};
		shelljs.mv(__dirname+path.sep+'..'+path.sep+"tmp"+path.sep+req.file.path.split('snapshot.')[1]+path.sep+".tmp",__dirname+path.sep+'..'+path.sep+'var'+ path.sep+req.body.pid+path.sep+req.body.pkg);
		process.chdir(__dirname+path.sep+'..'+path.sep+'var'+path.sep+req.body.pid+path.sep+req.body.pkg);
		console.log(__dirname+path.sep+'..'+path.sep+'var'+path.sep+req.body.pid+path.sep+req.body.pkg);
		shelljs.rm('-Rf',__dirname+path.sep+'..'+path.sep+"tmp"+path.sep+req.file.path.split('snapshot.')[1]);
		var uri=req.body.uri;
		var pkg=req.body.pkg;
		var prefix=req.body.pid;
		var path=require('path');
		var oa=__dirname+path.sep+'oa';
		var ob=oa+" update --sandbox --user "+prefix+" --app "+pkg;
		shelljs.exec(ob,{silent: false});

		// on lance le process
		freeport(function(err,port) {
			var spawn = require('child_process').spawn;
			var prc = spawn('nohup',  [oa, 'start', '--port',port,'--app',pkg, '--sandbox','--user',prefix,'&>/log','&']);
			console.log(oa, 'start --port '+port+' --app '+pkg+ ' --sandbox --user '+prefix);
			var ofile=__dirname+path.sep+'..'+path.sep+'pids'+path.sep+prefix+'.'+pkg+'.inf';
			if (fs.existsSync(ofile)) {
				var line=fs.readFileSync(ofile,'utf-8').split(':');
				console.log(line);
				if (line[1]!="XXX") shelljs.exec('kill -9 '+line[1]);
			};			
			fs.writeFileSync(ofile,port+':XXX:'+prefix+'.'+pkg+'.'+jsoconf.domain);
			if (fs.existsSync(ofile)) ofile=fs.readFileSync(ofile,'utf-8').split(':');
			res.end('{"url":"'+ofile[2]+'","success": true}');
		});
	});	
	
	app.enable('trust proxy');	
	app.listen(Config.port);
}