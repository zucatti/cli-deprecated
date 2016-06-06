/*
 *
 * OMNEEDIA Builder
 *
 */

$_VERSION = "0.9.8j";

CDN = "http://cdn.omneedia.com/"; //PROD
//CDN = "/cdn"; // DEBUG

var fs = require('fs');
var OS = require('os');
var path = require('path');
var isWin = /^win/.test(process.platform);

var Clients ={
	uid: {},
	mail: {}
};

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
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


Math.uuid = function () {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var chars = CHARS
        , uuid = new Array(36)
        , rnd = 0
        , r;
    for (var i = 0; i < 36; i++) {
        if (i == 8 || i == 13 || i == 18 || i == 23) {
            uuid[i] = '-';
        } else if (i == 14) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    return uuid.join('');
};

/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * @website: http://www.datejs.com/
 */
Date.CultureInfo = {
    name: "en-US"
    , englishName: "English (United States)"
    , nativeName: "English (United States)"
    , dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    , abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    , shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    , firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"]
    , monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    , abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    , amDesignator: "AM"
    , pmDesignator: "PM"
    , firstDayOfWeek: 0
    , twoDigitYearMax: 2029
    , dateElementOrder: "mdy"
    , formatPatterns: {
        shortDate: "M/d/yyyy"
        , longDate: "dddd, MMMM dd, yyyy"
        , shortTime: "h:mm tt"
        , longTime: "h:mm:ss tt"
        , fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt"
        , sortableDateTime: "yyyy-MM-ddTHH:mm:ss"
        , universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ"
        , rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT"
        , monthDay: "MMMM dd"
        , yearMonth: "MMMM, yyyy"
    }
    , regexPatterns: {
        jan: /^jan(uary)?/i
        , feb: /^feb(ruary)?/i
        , mar: /^mar(ch)?/i
        , apr: /^apr(il)?/i
        , may: /^may/i
        , jun: /^jun(e)?/i
        , jul: /^jul(y)?/i
        , aug: /^aug(ust)?/i
        , sep: /^sep(t(ember)?)?/i
        , oct: /^oct(ober)?/i
        , nov: /^nov(ember)?/i
        , dec: /^dec(ember)?/i
        , sun: /^su(n(day)?)?/i
        , mon: /^mo(n(day)?)?/i
        , tue: /^tu(e(s(day)?)?)?/i
        , wed: /^we(d(nesday)?)?/i
        , thu: /^th(u(r(s(day)?)?)?)?/i
        , fri: /^fr(i(day)?)?/i
        , sat: /^sa(t(urday)?)?/i
        , future: /^next/i
        , past: /^last|past|prev(ious)?/i
        , add: /^(\+|aft(er)?|from|hence)/i
        , subtract: /^(\-|bef(ore)?|ago)/i
        , yesterday: /^yes(terday)?/i
        , today: /^t(od(ay)?)?/i
        , tomorrow: /^tom(orrow)?/i
        , now: /^n(ow)?/i
        , millisecond: /^ms|milli(second)?s?/i
        , second: /^sec(ond)?s?/i
        , minute: /^mn|min(ute)?s?/i
        , hour: /^h(our)?s?/i
        , week: /^w(eek)?s?/i
        , month: /^m(onth)?s?/i
        , day: /^d(ay)?s?/i
        , year: /^y(ear)?s?/i
        , shortMeridian: /^(a|p)/i
        , longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i
        , timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i
        , ordinalSuffix: /^\s*(st|nd|rd|th)/i
        , timeContext: /^\s*(\:|a(?!u|p)|p)/i
    }
    , timezones: [{
        name: "UTC"
        , offset: "-000"
    }, {
        name: "GMT"
        , offset: "-000"
    }, {
        name: "EST"
        , offset: "-0500"
    }, {
        name: "EDT"
        , offset: "-0400"
    }, {
        name: "CST"
        , offset: "-0600"
    }, {
        name: "CDT"
        , offset: "-0500"
    }, {
        name: "MST"
        , offset: "-0700"
    }, {
        name: "MDT"
        , offset: "-0600"
    }, {
        name: "PST"
        , offset: "-0800"
    }, {
        name: "PDT"
        , offset: "-0700"
    }]
};
(function () {
    var $D = Date
        , $P = $D.prototype
        , $C = $D.CultureInfo
        , p = function (s, l) {
            if (!l) {
                l = 2;
            }
            return ("000" + s).slice(l * -1);
        };
    $P.clearTime = function () {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    };
    $P.setTimeToNow = function () {
        var n = new Date();
        this.setHours(n.getHours());
        this.setMinutes(n.getMinutes());
        this.setSeconds(n.getSeconds());
        this.setMilliseconds(n.getMilliseconds());
        return this;
    };
    $D.today = function () {
        return new Date().clearTime();
    };
    $D.compare = function (date1, date2) {
        if (isNaN(date1) || isNaN(date2)) {
            throw new Error(date1 + " - " + date2);
        } else if (date1 instanceof Date && date2 instanceof Date) {
            return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
        } else {
            throw new TypeError(date1 + " - " + date2);
        }
    };
    $D.equals = function (date1, date2) {
        return (date1.compareTo(date2) === 0);
    };
    $D.getDayNumberFromName = function (name) {
        var n = $C.dayNames
            , m = $C.abbreviatedDayNames
            , o = $C.shortestDayNames
            , s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) {
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s) {
                return i;
            }
        }
        return -1;
    };
    $D.getMonthNumberFromName = function (name) {
        var n = $C.monthNames
            , m = $C.abbreviatedMonthNames
            , s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) {
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
                return i;
            }
        }
        return -1;
    };
    $D.isLeapYear = function (year) {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };
    $D.getDaysInMonth = function (year, month) {
        return [31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };
    $D.getTimezoneAbbreviation = function (offset) {
        var z = $C.timezones
            , p;
        for (var i = 0; i < z.length; i++) {
            if (z[i].offset === offset) {
                return z[i].name;
            }
        }
        return null;
    };
    $D.getTimezoneOffset = function (name) {
        var z = $C.timezones
            , p;
        for (var i = 0; i < z.length; i++) {
            if (z[i].name === name.toUpperCase()) {
                return z[i].offset;
            }
        }
        return null;
    };
    $P.clone = function () {
        return new Date(this.getTime());
    };
    $P.compareTo = function (date) {
        return Date.compare(this, date);
    };
    $P.equals = function (date) {
        return Date.equals(this, date || new Date());
    };
    $P.between = function (start, end) {
        return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
    };
    $P.isAfter = function (date) {
        return this.compareTo(date || new Date()) === 1;
    };
    $P.isBefore = function (date) {
        return (this.compareTo(date || new Date()) === -1);
    };
    $P.isToday = function () {
        return this.isSameDay(new Date());
    };
    $P.isSameDay = function (date) {
        return this.clone().clearTime().equals(date.clone().clearTime());
    };
    $P.addMilliseconds = function (value) {
        this.setMilliseconds(this.getMilliseconds() + value);
        return this;
    };
    $P.addSeconds = function (value) {
        return this.addMilliseconds(value * 1000);
    };
    $P.addMinutes = function (value) {
        return this.addMilliseconds(value * 60000);
    };
    $P.addHours = function (value) {
        return this.addMilliseconds(value * 3600000);
    };
    $P.addDays = function (value) {
        this.setDate(this.getDate() + value);
        return this;
    };
    $P.addWeeks = function (value) {
        return this.addDays(value * 7);
    };
    $P.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
        return this;
    };
    $P.addYears = function (value) {
        return this.addMonths(value * 12);
    };
    $P.add = function (config) {
        if (typeof config == "number") {
            this._orient = config;
            return this;
        }
        var x = config;
        if (x.milliseconds) {
            this.addMilliseconds(x.milliseconds);
        }
        if (x.seconds) {
            this.addSeconds(x.seconds);
        }
        if (x.minutes) {
            this.addMinutes(x.minutes);
        }
        if (x.hours) {
            this.addHours(x.hours);
        }
        if (x.weeks) {
            this.addWeeks(x.weeks);
        }
        if (x.months) {
            this.addMonths(x.months);
        }
        if (x.years) {
            this.addYears(x.years);
        }
        if (x.days) {
            this.addDays(x.days);
        }
        return this;
    };
    var $y, $m, $d;
    $P.getWeek = function () {
        var a, b, c, d, e, f, g, n, s, w;
        $y = (!$y) ? this.getFullYear() : $y;
        $m = (!$m) ? this.getMonth() + 1 : $m;
        $d = (!$d) ? this.getDate() : $d;
        if ($m <= 2) {
            a = $y - 1;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = 0;
            f = $d - 1 + (31 * ($m - 1));
        } else {
            a = $y;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = s + 1;
            f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
        }
        g = (a + b) % 7;
        d = (f + g - e) % 7;
        n = (f + 3 - d) | 0;
        if (n < 0) {
            w = 53 - ((g - s) / 5 | 0);
        } else if (n > 364 + s) {
            w = 1;
        } else {
            w = (n / 7 | 0) + 1;
        }
        $y = $m = $d = null;
        return w;
    };
    $P.getISOWeek = function () {
        $y = this.getUTCFullYear();
        $m = this.getUTCMonth() + 1;
        $d = this.getUTCDate();
        return p(this.getWeek());
    };
    $P.setWeek = function (n) {
        return this.moveToDayOfWeek(1).addWeeks(n - this.getWeek());
    };
    $D._validate = function (n, min, max, name) {
        if (typeof n == "undefined") {
            return false;
        } else if (typeof n != "number") {
            throw new TypeError(n + " is not a Number.");
        } else if (n < min || n > max) {
            throw new RangeError(n + " is not a valid value for " + name + ".");
        }
        return true;
    };
    $D.validateMillisecond = function (value) {
        return $D._validate(value, 0, 999, "millisecond");
    };
    $D.validateSecond = function (value) {
        return $D._validate(value, 0, 59, "second");
    };
    $D.validateMinute = function (value) {
        return $D._validate(value, 0, 59, "minute");
    };
    $D.validateHour = function (value) {
        return $D._validate(value, 0, 23, "hour");
    };
    $D.validateDay = function (value, year, month) {
        return $D._validate(value, 1, $D.getDaysInMonth(year, month), "day");
    };
    $D.validateMonth = function (value) {
        return $D._validate(value, 0, 11, "month");
    };
    $D.validateYear = function (value) {
        return $D._validate(value, 0, 9999, "year");
    };
    $P.set = function (config) {
        if ($D.validateMillisecond(config.millisecond)) {
            this.addMilliseconds(config.millisecond - this.getMilliseconds());
        }
        if ($D.validateSecond(config.second)) {
            this.addSeconds(config.second - this.getSeconds());
        }
        if ($D.validateMinute(config.minute)) {
            this.addMinutes(config.minute - this.getMinutes());
        }
        if ($D.validateHour(config.hour)) {
            this.addHours(config.hour - this.getHours());
        }
        if ($D.validateMonth(config.month)) {
            this.addMonths(config.month - this.getMonth());
        }
        if ($D.validateYear(config.year)) {
            this.addYears(config.year - this.getFullYear());
        }
        if ($D.validateDay(config.day, this.getFullYear(), this.getMonth())) {
            this.addDays(config.day - this.getDate());
        }
        if (config.timezone) {
            this.setTimezone(config.timezone);
        }
        if (config.timezoneOffset) {
            this.setTimezoneOffset(config.timezoneOffset);
        }
        if (config.week && $D._validate(config.week, 0, 53, "week")) {
            this.setWeek(config.week);
        }
        return this;
    };
    $P.moveToFirstDayOfMonth = function () {
        return this.set({
            day: 1
        });
    };
    $P.moveToLastDayOfMonth = function () {
        return this.set({
            day: $D.getDaysInMonth(this.getFullYear(), this.getMonth())
        });
    };
    $P.moveToNthOccurrence = function (dayOfWeek, occurrence) {
        var shift = 0;
        if (occurrence > 0) {
            shift = occurrence - 1;
        } else if (occurrence === -1) {
            this.moveToLastDayOfMonth();
            if (this.getDay() !== dayOfWeek) {
                this.moveToDayOfWeek(dayOfWeek, -1);
            }
            return this;
        }
        return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
    };
    $P.moveToDayOfWeek = function (dayOfWeek, orient) {
        var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;
        return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
    };
    $P.moveToMonth = function (month, orient) {
        var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
        return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
    };
    $P.getOrdinalNumber = function () {
        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
    };
    $P.getTimezone = function () {
        return $D.getTimezoneAbbreviation(this.getUTCOffset());
    };
    $P.setTimezoneOffset = function (offset) {
        var here = this.getTimezoneOffset()
            , there = Number(offset) * -6 / 10;
        return this.addMinutes(there - here);
    };
    $P.setTimezone = function (offset) {
        return this.setTimezoneOffset($D.getTimezoneOffset(offset));
    };
    $P.hasDaylightSavingTime = function () {
        return (Date.today().set({
            month: 0
            , day: 1
        }).getTimezoneOffset() !== Date.today().set({
            month: 6
            , day: 1
        }).getTimezoneOffset());
    };
    $P.isDaylightSavingTime = function () {
        return (this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({
            month: 6
            , day: 1
        }).getTimezoneOffset());
    };
    $P.getUTCOffset = function () {
        var n = this.getTimezoneOffset() * -10 / 6
            , r;
        if (n < 0) {
            r = (n - 10000).toString();
            return r.charAt(0) + r.substr(2);
        } else {
            r = (n + 10000).toString();
            return "+" + r.substr(1);
        }
    };
    $P.getElapsed = function (date) {
        return (date || new Date()) - this;
    };
    if (!$P.toISOString) {
        $P.toISOString = function () {
            function f(n) {
                return n < 10 ? '0' + n : n;
            }
            return '"' + this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z"';
        };
    }
    $P._toString = $P.toString;
    $P.toString = function (format) {
        var x = this;
        if (format && format.length == 1) {
            var c = $C.formatPatterns;
            x.t = x.toString;
            switch (format) {
            case "d":
                return x.t(c.shortDate);
            case "D":
                return x.t(c.longDate);
            case "F":
                return x.t(c.fullDateTime);
            case "m":
                return x.t(c.monthDay);
            case "r":
                return x.t(c.rfc1123);
            case "s":
                return x.t(c.sortableDateTime);
            case "t":
                return x.t(c.shortTime);
            case "T":
                return x.t(c.longTime);
            case "u":
                return x.t(c.universalSortableDateTime);
            case "y":
                return x.t(c.yearMonth);
            }
        }
        var ord = function (n) {
            switch (n * 1) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th";
            }
        };
        return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function (m) {
            if (m.charAt(0) === "\\") {
                return m.replace("\\", "");
            }
            x.h = x.getHours;
            switch (m) {
            case "hh":
                return p(x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12));
            case "h":
                return x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12);
            case "HH":
                return p(x.h());
            case "H":
                return x.h();
            case "mm":
                return p(x.getMinutes());
            case "m":
                return x.getMinutes();
            case "ss":
                return p(x.getSeconds());
            case "s":
                return x.getSeconds();
            case "yyyy":
                return p(x.getFullYear(), 4);
            case "yy":
                return p(x.getFullYear());
            case "dddd":
                return $C.dayNames[x.getDay()];
            case "ddd":
                return $C.abbreviatedDayNames[x.getDay()];
            case "dd":
                return p(x.getDate());
            case "d":
                return x.getDate();
            case "MMMM":
                return $C.monthNames[x.getMonth()];
            case "MMM":
                return $C.abbreviatedMonthNames[x.getMonth()];
            case "MM":
                return p((x.getMonth() + 1));
            case "M":
                return x.getMonth() + 1;
            case "t":
                return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);
            case "tt":
                return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;
            case "S":
                return ord(x.getDate());
            default:
                return m;
            }
        }) : this._toString();
    };
}());
(function () {
    var $D = Date
        , $P = $D.prototype
        , $C = $D.CultureInfo
        , $N = Number.prototype;
    $P._orient = +1;
    $P._nth = null;
    $P._is = false;
    $P._same = false;
    $P._isSecond = false;
    $N._dateElement = "day";
    $P.next = function () {
        this._orient = +1;
        return this;
    };
    $D.next = function () {
        return $D.today().next();
    };
    $P.last = $P.prev = $P.previous = function () {
        this._orient = -1;
        return this;
    };
    $D.last = $D.prev = $D.previous = function () {
        return $D.today().last();
    };
    $P.is = function () {
        this._is = true;
        return this;
    };
    $P.same = function () {
        this._same = true;
        this._isSecond = false;
        return this;
    };
    $P.today = function () {
        return this.same().day();
    };
    $P.weekday = function () {
        if (this._is) {
            this._is = false;
            return (!this.is().sat() && !this.is().sun());
        }
        return false;
    };
    $P.at = function (time) {
        return (typeof time === "string") ? $D.parse(this.toString("d") + " " + time) : this.set(time);
    };
    $N.fromNow = $N.after = function (date) {
        var c = {};
        c[this._dateElement] = this;
        return ((!date) ? new Date() : date.clone()).add(c);
    };
    $N.ago = $N.before = function (date) {
        var c = {};
        c[this._dateElement] = this * -1;
        return ((!date) ? new Date() : date.clone()).add(c);
    };
    var dx = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/)
        , mx = ("january february march april may june july august september october november december").split(/\s/)
        , px = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/)
        , pxf = ("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/)
        , nth = ("final first second third fourth fifth").split(/\s/)
        , de;
    $P.toObject = function () {
        var o = {};
        for (var i = 0; i < px.length; i++) {
            o[px[i].toLowerCase()] = this["get" + pxf[i]]();
        }
        return o;
    };
    $D.fromObject = function (config) {
        config.week = null;
        return Date.today().set(config);
    };
    var df = function (n) {
        return function () {
            if (this._is) {
                this._is = false;
                return this.getDay() == n;
            }
            if (this._nth !== null) {
                if (this._isSecond) {
                    this.addSeconds(this._orient * -1);
                }
                this._isSecond = false;
                var ntemp = this._nth;
                this._nth = null;
                var temp = this.clone().moveToLastDayOfMonth();
                this.moveToNthOccurrence(n, ntemp);
                if (this > temp) {
                    throw new RangeError($D.getDayName(n) + " does not occur " + ntemp + " times in the month of " + $D.getMonthName(temp.getMonth()) + " " + temp.getFullYear() + ".");
                }
                return this;
            }
            return this.moveToDayOfWeek(n, this._orient);
        };
    };
    var sdf = function (n) {
        return function () {
            var t = $D.today()
                , shift = n - t.getDay();
            if (n === 0 && $C.firstDayOfWeek === 1 && t.getDay() !== 0) {
                shift = shift + 7;
            }
            return t.addDays(shift);
        };
    };
    for (var i = 0; i < dx.length; i++) {
        $D[dx[i].toUpperCase()] = $D[dx[i].toUpperCase().substring(0, 3)] = i;
        $D[dx[i]] = $D[dx[i].substring(0, 3)] = sdf(i);
        $P[dx[i]] = $P[dx[i].substring(0, 3)] = df(i);
    }
    var mf = function (n) {
        return function () {
            if (this._is) {
                this._is = false;
                return this.getMonth() === n;
            }
            return this.moveToMonth(n, this._orient);
        };
    };
    var smf = function (n) {
        return function () {
            return $D.today().set({
                month: n
                , day: 1
            });
        };
    };
    for (var j = 0; j < mx.length; j++) {
        $D[mx[j].toUpperCase()] = $D[mx[j].toUpperCase().substring(0, 3)] = j;
        $D[mx[j]] = $D[mx[j].substring(0, 3)] = smf(j);
        $P[mx[j]] = $P[mx[j].substring(0, 3)] = mf(j);
    }
    var ef = function (j) {
        return function () {
            if (this._isSecond) {
                this._isSecond = false;
                return this;
            }
            if (this._same) {
                this._same = this._is = false;
                var o1 = this.toObject()
                    , o2 = (arguments[0] || new Date()).toObject()
                    , v = ""
                    , k = j.toLowerCase();
                for (var m = (px.length - 1); m > -1; m--) {
                    v = px[m].toLowerCase();
                    if (o1[v] != o2[v]) {
                        return false;
                    }
                    if (k == v) {
                        break;
                    }
                }
                return true;
            }
            if (j.substring(j.length - 1) != "s") {
                j += "s";
            }
            return this["add" + j](this._orient);
        };
    };
    var nf = function (n) {
        return function () {
            this._dateElement = n;
            return this;
        };
    };
    for (var k = 0; k < px.length; k++) {
        de = px[k].toLowerCase();
        $P[de] = $P[de + "s"] = ef(px[k]);
        $N[de] = $N[de + "s"] = nf(de);
    }
    $P._ss = ef("Second");
    var nthfn = function (n) {
        return function (dayOfWeek) {
            if (this._same) {
                return this._ss(arguments[0]);
            }
            if (dayOfWeek || dayOfWeek === 0) {
                return this.moveToNthOccurrence(dayOfWeek, n);
            }
            this._nth = n;
            if (n === 2 && (dayOfWeek === undefined || dayOfWeek === null)) {
                this._isSecond = true;
                return this.addSeconds(this._orient);
            }
            return this;
        };
    };
    for (var l = 0; l < nth.length; l++) {
        $P[nth[l]] = (l === 0) ? nthfn(-1) : nthfn(l);
    }
}());
(function () {
    Date.Parsing = {
        Exception: function (s) {
            this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
        }
    };
    var $P = Date.Parsing;
    var _ = $P.Operators = {
        rtoken: function (r) {
            return function (s) {
                var mx = s.match(r);
                if (mx) {
                    return ([mx[0], s.substring(mx[0].length)]);
                } else {
                    throw new $P.Exception(s);
                }
            };
        }
        , token: function (s) {
            return function (s) {
                return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
            };
        }
        , stoken: function (s) {
            return _.rtoken(new RegExp("^" + s));
        }
        , until: function (p) {
            return function (s) {
                var qx = []
                    , rx = null;
                while (s.length) {
                    try {
                        rx = p.call(this, s);
                    } catch (e) {
                        qx.push(rx[0]);
                        s = rx[1];
                        continue;
                    }
                    break;
                }
                return [qx, s];
            };
        }
        , many: function (p) {
            return function (s) {
                var rx = []
                    , r = null;
                while (s.length) {
                    try {
                        r = p.call(this, s);
                    } catch (e) {
                        return [rx, s];
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        }
        , optional: function (p) {
            return function (s) {
                var r = null;
                try {
                    r = p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                return [r[0], r[1]];
            };
        }
        , not: function (p) {
            return function (s) {
                try {
                    p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                throw new $P.Exception(s);
            };
        }
        , ignore: function (p) {
            return p ? function (s) {
                var r = null;
                r = p.call(this, s);
                return [null, r[1]];
            } : null;
        }
        , product: function () {
            var px = arguments[0]
                , qx = Array.prototype.slice.call(arguments, 1)
                , rx = [];
            for (var i = 0; i < px.length; i++) {
                rx.push(_.each(px[i], qx));
            }
            return rx;
        }
        , cache: function (rule) {
            var cache = {}
                , r = null;
            return function (s) {
                try {
                    r = cache[s] = (cache[s] || rule.call(this, s));
                } catch (e) {
                    r = cache[s] = e;
                }
                if (r instanceof $P.Exception) {
                    throw r;
                } else {
                    return r;
                }
            };
        }
        , any: function () {
            var px = arguments;
            return function (s) {
                var r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        r = null;
                    }
                    if (r) {
                        return r;
                    }
                }
                throw new $P.Exception(s);
            };
        }
        , each: function () {
            var px = arguments;
            return function (s) {
                var rx = []
                    , r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        throw new $P.Exception(s);
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        }
        , all: function () {
            var px = arguments
                , _ = _;
            return _.each(_.optional(px));
        }
        , sequence: function (px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            if (px.length == 1) {
                return px[0];
            }
            return function (s) {
                var r = null
                    , q = null;
                var rx = [];
                for (var i = 0; i < px.length; i++) {
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        break;
                    }
                    rx.push(r[0]);
                    try {
                        q = d.call(this, r[1]);
                    } catch (ex) {
                        q = null;
                        break;
                    }
                    s = q[1];
                }
                if (!r) {
                    throw new $P.Exception(s);
                }
                if (q) {
                    throw new $P.Exception(q[1]);
                }
                if (c) {
                    try {
                        r = c.call(this, r[1]);
                    } catch (ey) {
                        throw new $P.Exception(r[1]);
                    }
                }
                return [rx, (r ? r[1] : s)];
            };
        }
        , between: function (d1, p, d2) {
            d2 = d2 || d1;
            var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
            return function (s) {
                var rx = _fn.call(this, s);
                return [[rx[0][0], r[0][2]], rx[1]];
            };
        }
        , list: function (p, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return (p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
        }
        , set: function (px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return function (s) {
                var r = null
                    , p = null
                    , q = null
                    , rx = null
                    , best = [[], s]
                    , last = false;
                for (var i = 0; i < px.length; i++) {
                    q = null;
                    p = null;
                    r = null;
                    last = (px.length == 1);
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        continue;
                    }
                    rx = [[r[0]], r[1]];
                    if (r[1].length > 0 && !last) {
                        try {
                            q = d.call(this, r[1]);
                        } catch (ex) {
                            last = true;
                        }
                    } else {
                        last = true;
                    }
                    if (!last && q[1].length === 0) {
                        last = true;
                    }
                    if (!last) {
                        var qx = [];
                        for (var j = 0; j < px.length; j++) {
                            if (i != j) {
                                qx.push(px[j]);
                            }
                        }
                        p = _.set(qx, d).call(this, q[1]);
                        if (p[0].length > 0) {
                            rx[0] = rx[0].concat(p[0]);
                            rx[1] = p[1];
                        }
                    }
                    if (rx[1].length < best[1].length) {
                        best = rx;
                    }
                    if (best[1].length === 0) {
                        break;
                    }
                }
                if (best[0].length === 0) {
                    return best;
                }
                if (c) {
                    try {
                        q = c.call(this, best[1]);
                    } catch (ey) {
                        throw new $P.Exception(best[1]);
                    }
                    best[1] = q[1];
                }
                return best;
            };
        }
        , forward: function (gr, fname) {
            return function (s) {
                return gr[fname].call(this, s);
            };
        }
        , replace: function (rule, repl) {
            return function (s) {
                var r = rule.call(this, s);
                return [repl, r[1]];
            };
        }
        , process: function (rule, fn) {
            return function (s) {
                var r = rule.call(this, s);
                return [fn.call(this, r[0]), r[1]];
            };
        }
        , min: function (min, rule) {
            return function (s) {
                var rx = rule.call(this, s);
                if (rx[0].length < min) {
                    throw new $P.Exception(s);
                }
                return rx;
            };
        }
    };
    var _generator = function (op) {
        return function () {
            var args = null
                , rx = [];
            if (arguments.length > 1) {
                args = Array.prototype.slice.call(arguments);
            } else if (arguments[0] instanceof Array) {
                args = arguments[0];
            }
            if (args) {
                for (var i = 0, px = args.shift(); i < px.length; i++) {
                    args.unshift(px[i]);
                    rx.push(op.apply(null, args));
                    args.shift();
                    return rx;
                }
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var gx = "optional not ignore cache".split(/\s/);
    for (var i = 0; i < gx.length; i++) {
        _[gx[i]] = _generator(_[gx[i]]);
    }
    var _vector = function (op) {
        return function () {
            if (arguments[0] instanceof Array) {
                return op.apply(null, arguments[0]);
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var vx = "each any all".split(/\s/);
    for (var j = 0; j < vx.length; j++) {
        _[vx[j]] = _vector(_[vx[j]]);
    }
}());
(function () {
    var $D = Date
        , $P = $D.prototype
        , $C = $D.CultureInfo;
    var flattenAndCompact = function (ax) {
        var rx = [];
        for (var i = 0; i < ax.length; i++) {
            if (ax[i] instanceof Array) {
                rx = rx.concat(flattenAndCompact(ax[i]));
            } else {
                if (ax[i]) {
                    rx.push(ax[i]);
                }
            }
        }
        return rx;
    };
    $D.Grammar = {};
    $D.Translator = {
        hour: function (s) {
            return function () {
                this.hour = Number(s);
            };
        }
        , minute: function (s) {
            return function () {
                this.minute = Number(s);
            };
        }
        , second: function (s) {
            return function () {
                this.second = Number(s);
            };
        }
        , meridian: function (s) {
            return function () {
                this.meridian = s.slice(0, 1).toLowerCase();
            };
        }
        , timezone: function (s) {
            return function () {
                var n = s.replace(/[^\d\+\-]/g, "");
                if (n.length) {
                    this.timezoneOffset = Number(n);
                } else {
                    this.timezone = s.toLowerCase();
                }
            };
        }
        , day: function (x) {
            var s = x[0];
            return function () {
                this.day = Number(s.match(/\d+/)[0]);
            };
        }
        , month: function (s) {
            return function () {
                this.month = (s.length == 3) ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s) / 4 : Number(s) - 1;
            };
        }
        , year: function (s) {
            return function () {
                var n = Number(s);
                this.year = ((s.length > 2) ? n : (n + (((n + 2000) < $C.twoDigitYearMax) ? 2000 : 1900)));
            };
        }
        , rday: function (s) {
            return function () {
                switch (s) {
                case "yesterday":
                    this.days = -1;
                    break;
                case "tomorrow":
                    this.days = 1;
                    break;
                case "today":
                    this.days = 0;
                    break;
                case "now":
                    this.days = 0;
                    this.now = true;
                    break;
                }
            };
        }
        , finishExact: function (x) {
            x = (x instanceof Array) ? x : [x];
            for (var i = 0; i < x.length; i++) {
                if (x[i]) {
                    x[i].call(this);
                }
            }
            var now = new Date();
            if ((this.hour || this.minute) && (!this.month && !this.year && !this.day)) {
                this.day = now.getDate();
            }
            if (!this.year) {
                this.year = now.getFullYear();
            }
            if (!this.month && this.month !== 0) {
                this.month = now.getMonth();
            }
            if (!this.day) {
                this.day = 1;
            }
            if (!this.hour) {
                this.hour = 0;
            }
            if (!this.minute) {
                this.minute = 0;
            }
            if (!this.second) {
                this.second = 0;
            }
            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            if (this.day > $D.getDaysInMonth(this.year, this.month)) {
                throw new RangeError(this.day + " is not a valid value for days.");
            }
            var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
            if (this.timezone) {
                r.set({
                    timezone: this.timezone
                });
            } else if (this.timezoneOffset) {
                r.set({
                    timezoneOffset: this.timezoneOffset
                });
            }
            return r;
        }
        , finish: function (x) {
            x = (x instanceof Array) ? flattenAndCompact(x) : [x];
            if (x.length === 0) {
                return null;
            }
            for (var i = 0; i < x.length; i++) {
                if (typeof x[i] == "function") {
                    x[i].call(this);
                }
            }
            var today = $D.today();
            if (this.now && !this.unit && !this.operator) {
                return new Date();
            } else if (this.now) {
                today = new Date();
            }
            var expression = !!(this.days && this.days !== null || this.orient || this.operator);
            var gap, mod, orient;
            orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
            if (!this.now && "hour minute second".indexOf(this.unit) != -1) {
                today.setTimeToNow();
            }
            if (this.month || this.month === 0) {
                if ("year day hour minute second".indexOf(this.unit) != -1) {
                    this.value = this.month + 1;
                    this.month = null;
                    expression = true;
                }
            }
            if (!expression && this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (!this.month) {
                    this.month = temp.getMonth();
                }
                this.year = temp.getFullYear();
            }
            if (expression && this.weekday && this.unit != "month") {
                this.unit = "day";
                gap = ($D.getDayNumberFromName(this.weekday) - today.getDay());
                mod = 7;
                this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
            }
            if (this.month && this.unit == "day" && this.operator) {
                this.value = (this.month + 1);
                this.month = null;
            }
            if (this.value != null && this.month != null && this.year != null) {
                this.day = this.value * 1;
            }
            if (this.month && !this.day && this.value) {
                today.set({
                    day: this.value * 1
                });
                if (!expression) {
                    this.day = this.value * 1;
                }
            }
            if (!this.month && this.value && this.unit == "month" && !this.now) {
                this.month = this.value;
                expression = true;
            }
            if (expression && (this.month || this.month === 0) && this.unit != "year") {
                this.unit = "month";
                gap = (this.month - today.getMonth());
                mod = 12;
                this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                this.month = null;
            }
            if (!this.unit) {
                this.unit = "day";
            }
            if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
                this[this.unit + "s"] = this[this.unit + "s"] + ((this.operator == "add") ? 1 : -1) + (this.value || 0) * orient;
            } else if (this[this.unit + "s"] == null || this.operator != null) {
                if (!this.value) {
                    this.value = 1;
                }
                this[this.unit + "s"] = this.value * orient;
            }
            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            if (this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (temp.getMonth() !== today.getMonth()) {
                    this.month = temp.getMonth();
                }
            }
            if ((this.month || this.month === 0) && !this.day) {
                this.day = 1;
            }
            if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
                return Date.today().setWeek(this.value);
            }
            if (expression && this.timezone && this.day && this.days) {
                this.day = this.days;
            }
            return (expression) ? today.add(this) : today.set(this);
        }
    };
    var _ = $D.Parsing.Operators
        , g = $D.Grammar
        , t = $D.Translator
        , _fn;
    g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
    g.timePartDelimiter = _.stoken(":");
    g.whiteSpace = _.rtoken(/^\s*/);
    g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
    var _C = {};
    g.ctoken = function (keys) {
        var fn = _C[keys];
        if (!fn) {
            var c = $C.regexPatterns;
            var kx = keys.split(/\s+/)
                , px = [];
            for (var i = 0; i < kx.length; i++) {
                px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
            }
            fn = _C[keys] = _.any.apply(null, px);
        }
        return fn;
    };
    g.ctoken2 = function (key) {
        return _.rtoken($C.regexPatterns[key]);
    };
    g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
    g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
    g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
    g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
    g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
    g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
    g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
    g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
    g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));
    g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
    g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
    g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
    g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
    g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
    g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function (s) {
        return function () {
            this.weekday = s;
        };
    }));
    g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
    g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
    g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
    g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
    g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
    g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
    g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
    _fn = function () {
        return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
    };
    g.day = _fn(g.d, g.dd);
    g.month = _fn(g.M, g.MMM);
    g.year = _fn(g.yyyy, g.yy);
    g.orientation = _.process(g.ctoken("past future"), function (s) {
        return function () {
            this.orient = s;
        };
    });
    g.operator = _.process(g.ctoken("add subtract"), function (s) {
        return function () {
            this.operator = s;
        };
    });
    g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
    g.unit = _.process(g.ctoken("second minute hour day week month year"), function (s) {
        return function () {
            this.unit = s;
        };
    });
    g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function (s) {
        return function () {
            this.value = s.replace(/\D/g, "");
        };
    });
    g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
    _fn = function () {
        return _.set(arguments, g.datePartDelimiter);
    };
    g.mdy = _fn(g.ddd, g.month, g.day, g.year);
    g.ymd = _fn(g.ddd, g.year, g.month, g.day);
    g.dmy = _fn(g.ddd, g.day, g.month, g.year);
    g.date = function (s) {
        return ((g[$C.dateElementOrder] || g.mdy).call(this, s));
    };
    g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (fmt) {
        if (g[fmt]) {
            return g[fmt];
        } else {
            throw $D.Parsing.Exception(fmt);
        }
    }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function (s) {
        return _.ignore(_.stoken(s));
    }))), function (rules) {
        return _.process(_.each.apply(null, rules), t.finishExact);
    });
    var _F = {};
    var _get = function (f) {
        return _F[f] = (_F[f] || g.format(f)[0]);
    };
    g.formats = function (fx) {
        if (fx instanceof Array) {
            var rx = [];
            for (var i = 0; i < fx.length; i++) {
                rx.push(_get(fx[i]));
            }
            return _.any.apply(null, rx);
        } else {
            return _get(fx);
        }
    };
    g._formats = g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyy", "Mdyy", "dMyy", "d"]);
    g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
    g.start = function (s) {
        try {
            var r = g._formats.call({}, s);
            if (r[1].length === 0) {
                return r;
            }
        } catch (e) {}
        return g._start.call({}, s);
    };
    $D._parse = $D.parse;
    $D.parse = function (s) {
        var r = null;
        if (!s) {
            return null;
        }
        if (s instanceof Date) {
            return s;
        }
        try {
            r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
        } catch (e) {
            return null;
        }
        return ((r[1].length === 0) ? r[0] : null);
    };
    $D.getParseFunction = function (fx) {
        var fn = $D.Grammar.formats(fx);
        return function (s) {
            var r = null;
            try {
                r = fn.call({}, s);
            } catch (e) {
                return null;
            }
            return ((r[1].length === 0) ? r[0] : null);
        };
    };
    $D.parseExact = function (s, fx) {
        return $D.getParseFunction(fx)(s);
    };
}());

/*******/

function mkdir(path, root) {

    var dirs = path.split('/')
        , dir = dirs.shift()
        , root = (root || '') + dir + '/';

    try {
        fs.mkdirSync(root);
    } catch (e) {
        //dir wasn't made, something went wrong
        if (!fs.statSync(root).isDirectory()) throw new Error(e);
    }

    return !dirs.length || mkdir(dirs.join('/'), root);
};

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

if (process.argv.indexOf('--builder') > -1) {
    if (process.platform == "linux") {
        if (!fs.existsSync(__dirname + path.sep + 'im' + path.sep + 'convert')) {
            var cmd = "convert $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15";
            if (!fs.existsSync(__dirname + path.sep + 'im')) fs.mkdirSync(__dirname + path.sep + 'im');
            fs.writeFileSync(__dirname + path.sep + 'im' + path.sep + 'convert', cmd);
            fs.chmodSync(__dirname + path.sep + 'im' + path.sep + 'convert', 777);
        };
    };
};
/*
function _Task_execute(App,Tasker)
{
	if (fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs"+path.sep+Tasker.taskId+".json")) {
		try {
			var args=JSON.parse(fs.readFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs"+path.sep+Tasker.taskId+".json",'utf-8'));
		} catch(e) {
			setTimeout(function() {
				_Task_execute(App,Tasker);
			},1000);
		};
		if (args.length>0) App[Tasker.api](args[0],function(err,result) {
			if (!err) {
				args.shift();
				fs.writeFileSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Tasks'+path.sep+"jobs"+path.sep+Tasker.taskId+".json",JSON.stringify(args,null,4));
				setTimeout(function() {
					_Task_execute(App,Tasker);
				},1000);
			}
		});  else setTimeout(function() {
					_Task_execute(App,Tasker);
			},1000);
	};
};
*/
var uniqueid = require('node-uuid');
_SESSION_ = uniqueid.v4();

if (process.argv.indexOf('auto#0') > -1) _FIRST_TIME = 1;
else _FIRST_TIME = 0;

function __RESTART__(op) {
    var _CP = require('child_process');
    var aargs = process.argv.slice(2);
    var rr = aargs.indexOf('--watch');
    if (rr > -1) {
        aargs.splice(rr, 1);
        aargs.unshift('session#' + _SESSION_);
        aargs.unshift('auto#' + op);
    };
    var _CP2 = _CP.fork(__dirname + require('path').sep + "omneedia.js", aargs);
    _CP2.on('exit', function () {
        __RESTART__(1);
    });
};


if (process.argv.indexOf("--watch") > -1) {
    __RESTART__(0);
    return;
};

PROXY = "";

var shelljs = require('shelljs');
var moment = require('moment');
var colors = require('colors');
var github = require('github');
var file = require('fsutil');
if (isWin) {
    if (!fs.existsSync(__dirname + path.sep + '.home' + path.sep + 'AppData')) fs.mkdirSync(__dirname + path.sep + '.home' + path.sep + 'AppData');
    if (!fs.existsSync(__dirname + path.sep + '.home' + path.sep + 'AppData' + path.sep + 'Local')) fs.mkdirSync(__dirname + path.sep + '.home' + path.sep + 'AppData' + path.sep + 'Local');
};
var zip = require('adm-zip');
var unzip = require('unzip');
var Exec = require('child_process').exec;
var util = require('util');
var htmlminifier = require('html-minifier');
var glob = require('wrench');
var http = require('http');
var UglifyJS = require("uglify-js");
var async = require('async');
var htmlparser = require("htmlparser2");
var authom = require("authom");
var request = require('request');
var XML2JS = require('xml2js');

if (!fs.existsSync(__dirname + path.sep + '.appdata')) fs.mkdirSync(__dirname + path.sep + '.appdata');
if (!fs.existsSync(__dirname + path.sep + '.appdata' + path.sep + 'npm')) fs.mkdirSync(__dirname + path.sep + '.appdata' + path.sep + 'npm');
if (!fs.existsSync(__dirname + path.sep + '.home')) fs.mkdirSync(__dirname + path.sep + '.home');
if (!fs.existsSync(__dirname + path.sep + '.home' + path.sep + 'AppData')) fs.mkdirSync(__dirname + path.sep + '.home' + path.sep + 'AppData');
if (!fs.existsSync(__dirname + path.sep + '.home' + path.sep + 'AppData' + path.sep + 'Local')) fs.mkdirSync(__dirname + path.sep + '.home' + path.sep + 'AppData' + path.sep + 'Local');
if (!fs.existsSync(__dirname + path.sep + '.home' + path.sep + 'AppData' + path.sep + 'Local' + path.sep + 'Chromium')) fs.mkdirSync(__dirname + path.sep + '.home' + path.sep + 'AppData' + path.sep + 'Local' + path.sep + 'Chromium');

argv = process.argv;

_EXT_ = function () {
    var extTypes = {
        "3gp": "video/3gpp"
        , "a": "application/octet-stream"
        , "ai": "application/postscript"
        , "aif": "audio/x-aiff"
        , "aiff": "audio/x-aiff"
        , "asc": "application/pgp-signature"
        , "asf": "video/x-ms-asf"
        , "asm": "text/x-asm"
        , "asx": "video/x-ms-asf"
        , "atom": "application/atom+xml"
        , "au": "audio/basic"
        , "avi": "video/x-msvideo"
        , "bat": "application/x-msdownload"
        , "bin": "application/octet-stream"
        , "bmp": "image/bmp"
        , "bz2": "application/x-bzip2"
        , "c": "text/x-c"
        , "cab": "application/vnd.ms-cab-compressed"
        , "cc": "text/x-c"
        , "chm": "application/vnd.ms-htmlhelp"
        , "class": "application/octet-stream"
        , "com": "application/x-msdownload"
        , "conf": "text/plain"
        , "cpp": "text/x-c"
        , "crt": "application/x-x509-ca-cert"
        , "css": "text/css"
        , "csv": "text/csv"
        , "cxx": "text/x-c"
        , "deb": "application/x-debian-package"
        , "der": "application/x-x509-ca-cert"
        , "diff": "text/x-diff"
        , "djv": "image/vnd.djvu"
        , "djvu": "image/vnd.djvu"
        , "dll": "application/x-msdownload"
        , "dmg": "application/octet-stream"
        , "doc": "application/msword"
        , "docx": "application/msword"
        , "dot": "application/msword"
        , "dtd": "application/xml-dtd"
        , "dvi": "application/x-dvi"
        , "ear": "application/java-archive"
        , "eml": "message/rfc822"
        , "eps": "application/postscript"
        , "exe": "application/x-msdownload"
        , "f": "text/x-fortran"
        , "f77": "text/x-fortran"
        , "f90": "text/x-fortran"
        , "flv": "video/x-flv"
        , "for": "text/x-fortran"
        , "gem": "application/octet-stream"
        , "gemspec": "text/x-script.ruby"
        , "gif": "image/gif"
        , "gz": "application/x-gzip"
        , "h": "text/x-c"
        , "hh": "text/x-c"
        , "htm": "text/html"
        , "html": "text/html"
        , "ico": "image/vnd.microsoft.icon"
        , "ics": "text/calendar"
        , "ifb": "text/calendar"
        , "iso": "application/octet-stream"
        , "jar": "application/java-archive"
        , "java": "text/x-java-source"
        , "jnlp": "application/x-java-jnlp-file"
        , "jpeg": "image/jpeg"
        , "jpg": "image/jpeg"
        , "js": "application/javascript"
        , "json": "application/json"
        , "log": "text/plain"
        , "m3u": "audio/x-mpegurl"
        , "m4v": "video/mp4"
        , "man": "text/troff"
        , "mathml": "application/mathml+xml"
        , "mbox": "application/mbox"
        , "mdoc": "text/troff"
        , "me": "text/troff"
        , "mid": "audio/midi"
        , "midi": "audio/midi"
        , "mime": "message/rfc822"
        , "mml": "application/mathml+xml"
        , "mng": "video/x-mng"
        , "mov": "video/quicktime"
        , "mp3": "audio/mpeg"
        , "mp4": "video/mp4"
        , "mp4v": "video/mp4"
        , "mpeg": "video/mpeg"
        , "mpg": "video/mpeg"
        , "ms": "text/troff"
        , "msi": "application/x-msdownload"
        , "odp": "application/vnd.oasis.opendocument.presentation"
        , "ods": "application/vnd.oasis.opendocument.spreadsheet"
        , "odt": "application/vnd.oasis.opendocument.text"
        , "ogg": "application/ogg"
        , "p": "text/x-pascal"
        , "pas": "text/x-pascal"
        , "pbm": "image/x-portable-bitmap"
        , "pdf": "application/pdf"
        , "pem": "application/x-x509-ca-cert"
        , "pgm": "image/x-portable-graymap"
        , "pgp": "application/pgp-encrypted"
        , "pkg": "application/octet-stream"
        , "pl": "text/x-script.perl"
        , "pm": "text/x-script.perl-module"
        , "png": "image/png"
        , "pnm": "image/x-portable-anymap"
        , "ppm": "image/x-portable-pixmap"
        , "pps": "application/vnd.ms-powerpoint"
        , "ppt": "application/vnd.ms-powerpoint"
        , "pptx": "application/vnd.ms-powerpoint"
        , "ps": "application/postscript"
        , "psd": "image/vnd.adobe.photoshop"
        , "py": "text/x-script.python"
        , "qt": "video/quicktime"
        , "ra": "audio/x-pn-realaudio"
        , "rake": "text/x-script.ruby"
        , "ram": "audio/x-pn-realaudio"
        , "rar": "application/x-rar-compressed"
        , "rb": "text/x-script.ruby"
        , "rdf": "application/rdf+xml"
        , "roff": "text/troff"
        , "rpm": "application/x-redhat-package-manager"
        , "rss": "application/rss+xml"
        , "rtf": "application/rtf"
        , "ru": "text/x-script.ruby"
        , "s": "text/x-asm"
        , "sgm": "text/sgml"
        , "sgml": "text/sgml"
        , "sh": "application/x-sh"
        , "sig": "application/pgp-signature"
        , "snd": "audio/basic"
        , "so": "application/octet-stream"
        , "svg": "image/svg+xml"
        , "svgz": "image/svg+xml"
        , "swf": "application/x-shockwave-flash"
        , "t": "text/troff"
        , "tar": "application/x-tar"
        , "tbz": "application/x-bzip-compressed-tar"
        , "tcl": "application/x-tcl"
        , "tex": "application/x-tex"
        , "texi": "application/x-texinfo"
        , "texinfo": "application/x-texinfo"
        , "text": "text/plain"
        , "tif": "image/tiff"
        , "tiff": "image/tiff"
        , "torrent": "application/x-bittorrent"
        , "tr": "text/troff"
        , "txt": "text/plain"
        , "vcf": "text/x-vcard"
        , "vcs": "text/x-vcalendar"
        , "vrml": "model/vrml"
        , "war": "application/java-archive"
        , "wav": "audio/x-wav"
        , "wma": "audio/x-ms-wma"
        , "wmv": "video/x-ms-wmv"
        , "wmx": "video/x-ms-wmx"
        , "wrl": "model/vrml"
        , "wsdl": "application/wsdl+xml"
        , "xbm": "image/x-xbitmap"
        , "xhtml": "application/xhtml+xml"
        , "xls": "application/vnd.ms-excel"
        , "xlsx": "application/vnd.ms-excel"
        , "xml": "application/xml"
        , "xpm": "image/x-xpixmap"
        , "xsl": "application/xml"
        , "xslt": "application/xslt+xml"
        , "yaml": "text/yaml"
        , "yml": "text/yaml"
        , "zip": "application/zip"
    }
    return {
        getExt: function (path) {
            var ext = require('path').extname(path || '').split('.');
            return ext[ext.length - 1];
        }
        , getContentType: function (path) {
            return extTypes[this.getExt(path).toLowerCase()] || 'application/octet-stream';
        }
    };
}();

if (fs.existsSync(__dirname + path.sep + '.config')) {
    var ocfg = JSON.parse(fs.readFileSync(__dirname + path.sep + '.config'));
    if (ocfg.current) {
        if (ocfg.current.proxy) PROXY = ocfg.current.proxy;
    }
} else var ocfg={current:{}};

if (PROXY != "") var Request = request.defaults({
    'proxy': PROXY
});
else var Request = request;

var uuid = require('node-uuid');
var os = require('os');

var express = require('express');
var open = require('open');
var QRCode = require('qrcode-npm');

BOOTSTRAP_FILES = [];
PROCESSING_VIEW = [];
PROCESSING_STORE = [];
PROCESSING_MODEL = [];

Date.prototype.format = function (format) //author: meizz
    {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1
                    , RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };

function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};	
	
Auth = {
    user: function (profile, fn) {
        if (profile.provider == "google") var typ = "google";
        if (profile.provider == "cas") var typ = "cas";
        if (profile.provider == "twitter") var typ = "twitter";
        if (profile.provider == "facebook") var typ = "facebook";
        Auth.login(profile, typ, function (response) {
            console.log(response);
            fn(null, response);
        });

    }
    , login: function (profile, auth_type, cb) {
        var off = "Officer";
        if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + off + ".js")) {
            var Auth = require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + off + ".js");
            Auth.using = function (unit) {
                if (fs.existsSync(__dirname + path.sep + 'node_modules' + path.sep + unit))
                    return require(__dirname + path.sep + 'node_modules' + path.sep + unit);
                else
                    return require(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit);
            };
            Auth.getProfile = function (user) {
                var response = [];
                if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + 'Profiler.json')) {
                    var profiler = JSON.parse(require('fs').readFileSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + 'Profiler.json', 'utf-8'));
                    for (var el in profiler.profile) {
                        var p = profiler.profile[el];
                        if (p.indexOf(user) > -1) response.push(el);
                    };
                };
                return response;
            };
            Auth.login(profile, auth_type, function (response) {
                cb(response);
            });
        };
    }
};

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

    return '127.0.0.1';
};

Object.extend = function (destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};

function getUserInfo($user, $id) {
    var $dir = PROJECT_VAR + path.sep + "users" + path.sep + $user + ".id";
    if (!fs.existsSync($dir)) return false;
    if ($dir == "") return false;
    var $o = fs.readFileSync($dir, "utf-8");
    var $obj = explode("@@", $o);
    for (var $i = 0; $i < $obj.length; $i++) {
        var $_COM = $obj[$i];
        if ($_COM.substr(0, $id.length) == $id) {
            var $elem = $_COM.substr($id.length, $_COM.length);
            $elem = $elem.trim();
            if ($elem.substr(0, 5) == "data:") {
                $elem = $elem.replace(/\n/g, "");
            }
            return $elem;
        }
    }
};

function encodeCSS(css, dir) {
    var url = css.split('url(');
    var str = "";
    if (!dir) dir = PROJECT_HOME + path.sep + "src";
    for (var i = 0; i < url.length; i++) {
        var myURL = url[i].split(')')[0];
        var dd = path.resolve(dir + path.sep + myURL);
        if (fs.existsSync(dd)) {
            var stats = fs.lstatSync(dd);
            if (!stats.isDirectory()) {
                myURL = fs.realpathSync(dd);
                var type = path.extname(myURL).substring(1);
                if (type == 'jpg') type = 'jpeg';
                if (type == 'svg') type = 'svg+xml';
                var base64 = fs.readFileSync(myURL).toString('base64');
                var space = url[i].indexOf(')');
                str += "url(data:image/" + type + ";base64," + base64 + url[i].substr(space, url[i].length);
            } else str += url[i];
        } else {
            if ((myURL.substr(1, 4) == 'data') || (myURL.substr(0, 4) == 'data')) {
                str += "url(" + url[i];
            } else
                str += url[i];
        }
    };
    return str;
};

function inArray(array, p_val) {
    var l = array.length;
    for (var i = 0; i < l; i++) {
        if (array[i] == p_val) {
            return true;
        }
    };
    return false;
};

function download_repos(lst, ndx, result, cb) {
    if (ndx < lst.length) {
        Request({
            url: 'https://api.github.com/users/' + lst[ndx].trim() + '/repos'
            , encoding: null
            , headers: {
                'User-Agent': 'request'
            }
        }, function (err, res, body) {
            var bb = JSON.parse(body.toString());
            for (var i = 0; i < bb.length; i++) result.push(bb[i]);
            download_repos(lst, ndx + 1, result, cb);
        })
    } else cb(result);
};

function download(o, callback) {
    if (o.type == "local") {
        var text = fs.readFileSync(o.src, 'utf-8');
        if (o.src.indexOf('Settings.js') > -1) {
            var extend = require('util')._extend;
            var _JSON = extend({}, Settings);
            delete(_JSON.FRAMEWORKS);
            delete(_JSON.LIBRARIES);
            delete(_JSON.RESOURCES);
            delete(_JSON.PLUGINS);
            delete(_JSON.SIGN);
            _JSON.DEBUG = false;
            var text = "Settings=" + JSON.stringify(_JSON)+';var __SOCKET__=';
        };
        callback(null, text);
    } else {
        Request({
            url: o.src
            , encoding: null
        }, function (err, res, body) {
            try {
				callback(null, body.toString());
            } catch (ex) {
                //callback(null,"");
            }

        });
    };
};

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

API = {
    _use: function (conf) {

    }
    , using: function (service, host, fnx) {
        var http = require('http');
        var h = host.split(':');
        if (h.length > 1) var port = h[1] * 1;
        else var port = 80;
        host = h[0];
        var options = {
            host: host
            , port: port
            , path: '/api/' + service + '?javascript'
            , method: 'GET'
        };

        var req = http.request(options, function (res) {
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function (data) {
                responseString += data;
            });

            res.on('end', function () {
                var r = JSON.parse(responseString.split('.REMOTING_API=')[1].split(';')[0]).actions[service];
                API[service] = {};
                for (var i = 0; i < r.length; i++) {
                    var Args = require("vargs").Constructor;
                    if (r[i].name != "using") API[service][r[i].name] = function func() {
                        var args = new Args(arguments);
                        var va = args.all;

                        var name = "";
                        for (var p in this) {
                            if (this[p] === func) name = p;
                        };

                        var d = args.all;
                        if (!d[0]) d.push({});
                        d[0].page = 1;
                        d[0].start = 0;
                        d[0].limit = 50;

                        var user = [
                            {
                                action: service
                                , method: name
                                , data: args.all
                                , type: "rpc"
                                , tid: 1
					}
					];

                        var userString = JSON.stringify(user);

                        var headers = {
                            'Content-Type': 'application/json'
                            , 'Content-Length': userString.length
                        };

                        var options = {
                            host: 'omneedia.com'
                            , port: 3000
                            , path: '/api'
                            , method: 'POST'
                            , headers: headers
                        };

                        var req = http.request(options, function (res) {
                            res.setEncoding('utf-8');

                            var responseString = '';

                            res.on('data', function (data) {
                                responseString += data;
                            });

                            res.on('end', function () {
                                var resultObject = JSON.parse(responseString);
                                args.callback(resultObject[0].result);
                            });
                        });

                        req.on('error', function (e) {
                            console.log(e);
                        });

                        req.write(userString);
                        req.end();

                    };

                };
                if (fnx) fnx();
            });
        });
        req.on('error', function (e) {
            console.log(e);
        });
        req.end();
    }
};

/*
CALL SUBS
*/

copyFileSync = function (srcFile, destFile) {
    var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
    BUF_LENGTH = 64 * 1024;
    buff = new Buffer(BUF_LENGTH);
    fdr = fs.openSync(srcFile, "r");
    fdw = fs.openSync(destFile, "w");
    bytesRead = 1;
    pos = 0;
    while (bytesRead > 0) {
        bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
        fs.writeSync(fdw, buff, 0, bytesRead);
        pos += bytesRead;
    }
    fs.closeSync(fdr);
    return fs.closeSync(fdw);
};

function make_resources(cb) {
    console.log('  - Updating resources');

    if (Manifest.platform == "mobile") {
        if (fs.existsSync(PROJECT_DEV + path.sep + "mobi" + path.sep + "Resources.css")) {
            cb();
            return;
        };
        // Préparation des graphiques
        GRAPHICS = [];
        // startup
        if (!fs.existsSync(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup')) fs.mkdirSync(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup');
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 510 -extent 640x920 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + '640x920.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 510 -extent 640x1096 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + '640x1096.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 320x460 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + 'default.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 510 -extent 768x1004 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + '768x1004.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 510 -extent 748x1024 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + '748x1024.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 510 -extent 1496x2048 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + '1496x2048.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 510 -extent 1536x2008 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + '1536x2008.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -gravity center -background "' + Manifest.splashscreen.background + '" -resize 510 -extent 2048x1496 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + '2048x1496.png"';

        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -resize 256x256 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + 'logo.png"';
        // icons
        if (!fs.existsSync(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons')) fs.mkdirSync(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons');
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -flatten -resize 57x57 -background "' + Manifest.icon.background + '" "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -flatten -resize 72x72 -background "' + Manifest.icon.background + '" "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon@72.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -flatten -resize 114x114 -background "' + Manifest.icon.background + '" "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon@114.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -flatten -resize 144x144 -background "' + Manifest.icon.background + '" "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon@144.png"';
        async.map(GRAPHICS, convert, function (err, result) {
            cb();
        })
    };
    if (Manifest.platform == "desktop") {
        if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources.css")) {
            cb();
            return;
        };
        GRAPHICS = [];
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -bordercolor white -border 0 -resize x16 -gravity center -background transparent -flatten -colors 256 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'favicon.ico"';
        if (!fs.existsSync(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup')) fs.mkdirSync(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup');
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.splashscreen.file + '" -resize 256x256 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'startup' + path.sep + 'logo.png"';
        GRAPHICS[GRAPHICS.length] = '"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -resize x16 "' + PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'webapp' + path.sep + 'ico.png"';
        var linkme = false;
        async.map(GRAPHICS, convert, function (err, result) {
            cb();
        });
    }
}

function make_bootstrap() {
    // Parsing index.html
    console.log('  - Processing package & downloading libraries');
    if (!fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.cache")) {
        var parser = new htmlparser.Parser({
            onopentag: function (name, attribs) {
                if (name === "script" && attribs.type === "text/javascript") {
                    if (!fs.existsSync(PROJECT_WEB + path.sep + attribs.src)) {
                        if (attribs.src.indexOf('require')==-1) BOOTSTRAP_FILES.push( {
                            type: 'remote'
                            , src: attribs.src
                        });
                    } else {
                        if (attribs.src != "Contents/Application/app.js")
                            BOOTSTRAP_FILES.push( {
                                type: 'local'
                                , src: PROJECT_WEB + path.sep + attribs.src
                            });
                    }
                }
            }
            , onclosetag: function (tagname) {
                if (tagname === "html") {
                    BOOTSTRAP_FILES.unshift({
                        type: "local"
                        , src: PROJECT_WEB + path.sep + "Contents" + path.sep + "Settings.js"
                    });
                    BOOTSTRAP_FILES.push({
                        type: "remote"
                        , src: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.js"
                    });
                    BOOTSTRAP_FILES.push({
                        type: "remote"
                        , src: "http://cdn.omneedia.com/public/requirejs/require.js"
                    });
                    for (var i = 0; i < Settings.FRAMEWORKS.length; i++) {
                        if (!fs.existsSync(PROJECT_WEB + path.sep + Settings.FRAMEWORKS[i])) {
                            BOOTSTRAP_FILES.push( {
                                type: 'remote'
                                , src: Settings.FRAMEWORKS[i]
                            });
                        } else {
                            BOOTSTRAP_FILES.push( {
                                type: 'local'
                                , src: PROJECT_WEB + path.sep + Settings.FRAMEWORKS[i]
                            });
                        };
                    };
//					console.log(BOOTSTRAP_FILES);
                    async.map(BOOTSTRAP_FILES, download, function (err, result) {
                        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.js", "var Ext = Ext || {};Ext.manifest = {compatibility:{ext: '4.2'}}\n" + result.join('\n\n\n/*************************************************/\n\n\n'));
                        make_resources(make_libraries);
                    });
                }
            }
        });
        parser.write(fs.readFileSync(PROJECT_HOME + path.sep + "src" + path.sep + "index.html"));
        parser.end();
    } else make_resources(make_libraries);
};

function remote_api(i, tab, cb) {
    if (i < Settings.API.length) {
        Request(Settings.REMOTE_API + '/api/' + Settings.API[i] + '?javascript', function (error, response, body) {
            tab.push(body);
            remote_api(i + 1, tab, cb);
        });
    } else cb(tab);
};

function make_ws() {
    console.log('  - Looking for webservices');
    var result = [];

    result.push("if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');");
    if (Settings.REMOTE_API) {

        /*remote_api(0,[],function(x) {
        	fs.writeFileSync(PROJECT_DEV+path.sep+"webapp"+path.sep+"services.js",x.join(''));
        	make_mvc();
        });*/
        var REMOTE_API = {};
        REMOTE_API.url = "/api";
        REMOTE_API.type = "remoting";
        REMOTE_API.namespace = "App";
        REMOTE_API.descriptor = "App.REMOTING_API";
        REMOTE_API.actions = {};
        REMOTE_API.actions["__QUERY__"] = [];
        REMOTE_API.actions["__QUERY__"].push({
            name: "exec"
            , len: 1
        });
        REMOTE_API.actions["__QUERY__"].push({
            name: "post"
            , len: 3
        });
        REMOTE_API.actions["__QUERY__"].push({
            name: "del"
            , len: 3
        });
        var str = "if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
        str += "App.REMOTING_API=" + JSON.stringify(REMOTE_API, null) + ";";
        str += "Ext.Direct.addProvider(App.REMOTING_API);";
        //str = str.replace('App.REMOTING_API={"url":"', 'App.REMOTING_API={"url":'+Settings.REMOTE_API+'"');
        str = str.replace('App.REMOTING_API={"url":"', 'App.REMOTING_API={"url":"' + Settings.REMOTE_API);
        result.push(str);

        for (var i = 1; i < Settings.API.length; i++) {
            // charger le script
            console.log('    - Adding service descriptor ' + Settings.API[i]);
            var REMOTE_API = {};
            REMOTE_API.url = "/api";
            REMOTE_API.type = "remoting";
            REMOTE_API.namespace = "App";
            REMOTE_API.descriptor = "App.REMOTING_API";
            REMOTE_API.actions = {};
            REMOTE_API.actions[Settings.API[i]] = [];
            if (!fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + Settings.API[i] + ".js")) {
                res.end('');
                return;
            };
            var _api = require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + Settings.API[i] + ".js");
            for (var e in _api) {
                if (_api[e].toString().substr(0, 8) == "function") {
                    var obj = {};
                    obj.name = e;
                    var myfn = _api[e].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
                    obj.len = myfn.length - 1;
                    REMOTE_API.actions[Settings.API[i]][REMOTE_API.actions[Settings.API[i]].length] = obj;
                }
            };
            var str = "if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
            str += "App.REMOTING_API=" + JSON.stringify(REMOTE_API, null) + ";";
            str += "Ext.Direct.addProvider(App.REMOTING_API);";
            str = str.replace('App.REMOTING_API={"url":"', 'App.REMOTING_API={"url":"' + Settings.REMOTE_API);
            result.push(str);
        };
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "services.js", result.join(''));
        make_mvc();
    } else {
        var REMOTE_API = {};
        REMOTE_API.url = "/api";
        REMOTE_API.type = "remoting";
        REMOTE_API.namespace = "App";
        REMOTE_API.descriptor = "App.REMOTING_API";
        REMOTE_API.actions = {};
        REMOTE_API.actions["__QUERY__"] = [];
        REMOTE_API.actions["__QUERY__"].push({
            name: "exec"
            , len: 1
        });
        REMOTE_API.actions["__QUERY__"].push({
            name: "post"
            , len: 3
        });
        REMOTE_API.actions["__QUERY__"].push({
            name: "del"
            , len: 3
        });
        var str = "if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
        str += "App.REMOTING_API=" + JSON.stringify(REMOTE_API, null) + ";";
        str += "Ext.Direct.addProvider(App.REMOTING_API);";
        str = str.replace('App.REMOTING_API={"url":"', 'App.REMOTING_API={"url":document.location.origin+"');
        result.push(str);

        for (var i = 1; i < Settings.API.length; i++) {
            // charger le script
            console.log('    - Adding service descriptor ' + Settings.API[i]);
            var REMOTE_API = {};
            REMOTE_API.url = "/api";
            REMOTE_API.type = "remoting";
            REMOTE_API.namespace = "App";
            REMOTE_API.descriptor = "App.REMOTING_API";
            REMOTE_API.actions = {};
            REMOTE_API.actions[Settings.API[i]] = [];
            if (!fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + Settings.API[i] + ".js")) {
                res.end('');
                return;
            };
            var _api = require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + Settings.API[i] + ".js");
            for (var e in _api) {
                if (_api[e].toString().substr(0, 8) == "function") {
                    var obj = {};
                    obj.name = e;
                    var myfn = _api[e].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
                    obj.len = myfn.length - 1;
                    REMOTE_API.actions[Settings.API[i]][REMOTE_API.actions[Settings.API[i]].length] = obj;
                }
            };
            var str = "if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
            str += "App.REMOTING_API=" + JSON.stringify(REMOTE_API, null) + ";";
            str += "Ext.Direct.addProvider(App.REMOTING_API);";
            str = str.replace('App.REMOTING_API={"url":"', 'App.REMOTING_API={"url":document.location.origin+"');
            result.push(str);
        };
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "services.js", result.join(''));
        make_mvc();
    };
};

function getView(v, t) {
    v = v.replace(/\./g, "/");
    var workspace = PROJECT_WEB + path.sep + "Contents" + path.sep + "Application" + path.sep + "app" + path.sep;
    var myview = fs.readFileSync(workspace + "view" + path.sep + path.sep + v.trim() + ".js", "utf-8");
    console.log('    - Adding view ' + v.trim());
    try {
        var require = myview.split('require')[1].split(']')[0].split('[')[1].trim().replace(/\t/g, '').replace(/\n/g, '').replace(/"/g, '').replace(/'/g, "").split(',');
        for (var i = 0; i < require.length; i++) {
            getView(require[i], t);
        };
    } catch (e) {
        //console.log(e);
    };
    //console.log(workspace+"view"+path.sep+v.trim()+".js");
    t[t.length] = workspace + "view" + path.sep + v.trim() + ".js";
};

function getDistinctArray(arr) {
    var dups = {};
    return arr.filter(function (el) {
        var hash = el.valueOf();
        var isDup = dups[hash];
        dups[hash] = true;
        return !isDup;
    });
};

function getController(controller) {
    var workspace = PROJECT_WEB + path.sep + "Contents" + path.sep + "Application" + path.sep + "app" + path.sep;
    var _controller = workspace + "controller" + path.sep + controller.replace('.', path.sep) + ".js";

    console.log('    - Adding controller ' + controller);
    if (!fs.existsSync(_controller)) {
        console.error("  ! Can't find controller " + controller + "".yellow);
        return;
    };
    _controller = fs.readFileSync(_controller, "utf-8");

    var views = _controller.split('views')[1].split(']')[0].split('[')[1].trim().replace(/\t/g, '').replace(/\n/g, '').replace(/"/g, '').replace(/'/g, "").split(',');
    try {
        var stores = _controller.split('init')[0].split('stores')[1].split(']')[0].split('[')[1].trim().replace(/\t/g, '').replace(/\n/g, '').replace(/"/g, '').replace(/'/g, "").split(',');
    } catch (e) {
        var stores = [];
    };

    try {
        var models = _controller.split('init')[0].split('models')[1].split(']')[0].split('[')[1].trim().replace(/\t/g, '').replace(/\n/g, '').replace(/"/g, '').replace(/'/g, "").split(',');
    } catch (e) {
        var models = [];
    };
    var result = "";

    for (var i = 0; i < models.length; i++) {
        var m = models[i].replace(/\./g, "/");
        if (PROCESSING_MODEL.indexOf(m) == -1) {
            models[i] = workspace + "model" + path.sep + m.trim() + ".js";
            console.log('    - Adding model ' + m.trim());
            if (m != "") result += fs.readFileSync(models[i], "utf-8") + "\n";
            PROCESSING_MODEL.push(m);
        }
    };
    result += "\n\n";

    for (var i = 0; i < stores.length; i++) {
        var m = stores[i].replace(/\./g, "/");
        if (PROCESSING_STORE.indexOf(m) == -1) {
            stores[i] = workspace + "store" + path.sep + m.trim() + ".js";
            if (m != "") result += fs.readFileSync(stores[i], "utf-8") + "\n";
            PROCESSING_STORE.push(m);
        }
    };
    var nview = [];

    for (var i = 0; i < views.length; i++) {
        var v = views[i];
        if (PROCESSING_VIEW.indexOf(v) == -1) getView(v, nview);
        PROCESSING_VIEW.push(v);
    };
    nview = getDistinctArray(nview);

    for (var i = 0; i < nview.length; i++) {
        result += fs.readFileSync(nview[i].replace(/\\/g, require('path').sep), "utf-8") + "\n";
    };

    if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js"))
        fs.appendFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js", result);
    else
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js", result);
};

function make_app() {
    var app = fs.readFileSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Application" + path.sep + "app.js", "utf-8");
    var _apph = app.split("Ext.Loader.setConfig")[0];
    var _app = "Manifest" + app.split('Manifest')[1];
    fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "app.js", _apph + "\n" + _app);
    if (Settings.TYPE == "mobile") {
        var xapp = fs.readFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "app.js", "utf-8");
        var _JSON = {};
        _JSON["320x460"] = "data:image/png;base64," + b64(PROJECT_WEB + path.sep + "Contents" + path.sep + "Resources" + path.sep + "startup" + path.sep + "default.png");
        _JSON["640x920"] = "data:image/png;base64," + b64(PROJECT_WEB + path.sep + "Contents" + path.sep + "Resources" + path.sep + "startup" + path.sep + "640x920.png");
        _JSON["640x1096"] = "data:image/png;base64," + b64(PROJECT_WEB + path.sep + "Contents" + path.sep + "Resources" + path.sep + "startup" + path.sep + "640x1096.png");
        _JSON["768x1004"] = "data:image/png;base64," + b64(PROJECT_WEB + path.sep + "Contents" + path.sep + "Resources" + path.sep + "startup" + path.sep + "768x1004.png");
        _JSON["748x1024"] = "data:image/png;base64," + b64(PROJECT_WEB + path.sep + "Contents" + path.sep + "Resources" + path.sep + "startup" + path.sep + "748x1024.png");
        _JSON["1536x2008"] = "data:image/png;base64," + b64(PROJECT_WEB + path.sep + "Contents" + path.sep + "Resources" + path.sep + "startup" + path.sep + "1536x2008.png");
        _JSON["1496x2048"] = "data:image/png;base64," + b64(PROJECT_WEB + path.sep + "Contents" + path.sep + "Resources" + path.sep + "startup" + path.sep + "1496x2048.png");
        _JSON = "startupImage:" + JSON.stringify(_JSON) + ",";
        var t = xapp.split('startupImage')[0] + _JSON + "isIconPrecomposed" + xapp.split('startupImage')[1].split('isIconPrecomposed')[1];
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "app.js", t);
    };

    console.log('  - Compiling bootstrap');
    if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.cache"))
        var bootstrap = fs.readFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.cache", "utf-8");
    else {
        var bootstrap = UglifyJS.minify(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.js");
        bootstrap = bootstrap.code;
    }
    //console.log(bootstrap);
    console.log('  - Compiling libraries');
    var libraries = UglifyJS.minify(PROJECT_DEV + path.sep + "webapp" + path.sep + "libraries.js");
    libraries = libraries.code;
    console.log('  - Compiling services');
    var services = UglifyJS.minify(PROJECT_DEV + path.sep + "webapp" + path.sep + "services.js");
    services = services.code;
    console.log('  - Compiling localizer');
    var langs = UglifyJS.minify(PROJECT_DEV + path.sep + "webapp" + path.sep + "langs.js");
    langs = langs.code;
    console.log('  - Compiling MVC');
    var objects = UglifyJS.minify(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js");
    objects = objects.code;
    console.log('  - Linking...');
    var app = UglifyJS.minify(PROJECT_DEV + path.sep + "webapp" + path.sep + "app.js");
    app = app.code;
    var webapp = "";
    fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Application.js", "i18n={};i18n_framework={};" + bootstrap + libraries + webapp + services + langs + objects + app);
    fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "app.js");
    fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.cache", bootstrap);
    if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.js")) fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "bootstrap.js");
    fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "libraries.js");
    fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "services.js");
    fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "langs.js");
    fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js");

    // Make Resources
    res_html_compile();
};

function make_culture() {
    console.log('  - Loading culture');
    var LANG = [];
    var _LANG = [];
    for (var i = 0; i < Settings.LANGS.length; i++) {
        LANG[LANG.length] = {
            type: "remote"
            , src: CDN + "/framework.lang/" + Settings.TYPE + "/ext-lang-" + Settings.LANGS[i] + ".js"
        };
        if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Culture" + path.sep + Settings.LANGS[i] + ".js"))
            _LANG[_LANG.length] = PROJECT_WEB + path.sep + "Contents" + path.sep + "Culture" + path.sep + Settings.LANGS[i] + ".js";
    };
    async.map(LANG, download, function (err, result) {
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "langs.js", result.join('\n\n\n'));
        for (var i = 0; i < _LANG.length; i++) {
            fs.appendFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "langs.js", fs.readFileSync(_LANG[i], "utf-8"))
        };
        make_app();
    });
};

function make_mvc() {
    console.log('  - Create MVC');
    var appjs = fs.readFileSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Application" + path.sep + "app.js", 'utf-8');
    // get controllers
    var controllers = Settings.CONTROLLERS;

    for (var i = 0; i < controllers.length; i++) {
        getController(controllers[i]);
        var workspace = PROJECT_WEB + path.sep + "Contents" + path.sep + "Application" + path.sep + "app" + path.sep;
        var _controller = workspace + "controller" + path.sep + controllers[i].replace('.', path.sep) + ".js";
        var result = fs.readFileSync(_controller, "utf-8");
        if (!fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js")) {
            fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js", result);
        } else {
            fs.appendFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "objects.js", result);
        }
    };

    // load Culture
    make_culture();
};

function make_libraries() {
    console.log('  - Creating libraries');
    var app = PROJECT_WEB + path.sep + "Contents" + path.sep + "Application" + path.sep + "app.js";
    var code = fs.readFileSync(app, 'utf-8');

    APP_NAMESPACE = code.split('APP_NAMESPACE')[1].split(';')[0];
    var pluscode = "APP_NAMESPACE " + APP_NAMESPACE + ";\n";
    APP_NAMESPACE = code.split('LANGS')[1].split(';')[0];
    pluscode += "LANGS " + APP_NAMESPACE + "LANGS;\n";

    var arr = Settings.PATHS;
    var PATH = [];
    for (var i in arr) {
        PATH[i] = arr[i];
        if (fs.existsSync(PROJECT_WEB + path.sep + PATH[i])) PATH[i] = PROJECT_WEB + path.sep + PATH[i];
    };

    var _require = Settings.MODULES;

    for (var i = 0; i < _require.length; i++) {
        var element = _require[i];

        if (element != "") {
            for (var el in PATH) {
                if (el == element.substr(0, el.length)) {
                    var tmp = element.substr(el.length, element.length).split('.');
                    var _tmp = "";
                    for (var j = 0; j < tmp.length; j++) {
                        if (j > 0) _tmp += "/" + tmp[j];
                        else _tmp = PATH[el] + tmp[j];
                    };
                    _require[i] = _tmp + ".js";
                };
                if (el == element.substr(1, el.length)) {
                    var tmp = element.substr(el.length + 1, element.length).split('.');
                    var _tmp = "";
                    for (var j = 0; j < tmp.length; j++) {
                        if (j > 0) _tmp += "/" + tmp[j];
                        else _tmp = PATH[el] + tmp[j];
                    };
                    _require[i] = _tmp + ".js";
                };
            }
        } else _require.splice(i);
    };

    var require = [];
    for (var i = 0; i < _require.length; i++) {
        if (!fs.existsSync(_require[i])) {
            require.push( {
                type: "remote"
                , src: _require[i]+"?"+uniqueid.v4()
            });
        } else {
            require.push({
                type: "local"
                , src: _require[i]
            });
        }
    };

    async.map(require, download, function (err, result) {
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "libraries.js", pluscode + "\n\n" + result.join('\n\n\n'));
		make_ws();
    });
};

function b64(f) {
    return fs.readFileSync(f).toString('base64');
};

function convert(cmd, callback) {
    var ocmd = cmd.split(' ');
    ocmd.shift();
    ocmd[0] = ocmd[0].split('"')[1];
    ocmd[ocmd.length - 1] = ocmd[ocmd.length - 1].split('"')[1];
    var im = require('imagemagick');
    im.convert(ocmd, callback);
};

var loadBase64Image = function (url, callback) {

    // Make request to our image url
    if (url == -1) callback(null, "-1");
    else {

        Request({
            url: url
            , encoding: null
        }, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                // So as encoding set to null then request body became Buffer object
                var base64prefix = 'data:' + res.headers['content-type'] + ';base64,'
                    , image = body.toString('base64');
                if (typeof callback == 'function') {
                    callback(null, base64prefix + image);
                }
            } else {
                var str = "\n! Warning: Can\'t download image " + url;
                console.log(str.yellow);
				console.log(err);
                callback(null, "");
            }
        });

    }
};

function getURL(url, callback) {
    Request({
        url: url
        , encoding: null
    }, function (err, res, body) {
        callback(null, body.toString('utf-8'));
    });
};

function getRemoteCSS(url, callback) {
    console.log("  - Generating resource " + url);
    var u = [];
    u[u.length] = url;

    async.map(u, getURL, function (err, result) {
        var durl = url.lastIndexOf('/');
        durl = url.substr(0, durl);
        result = result[0].split('url(');
        var o = [];
        o[0] = "-1";
        for (var i = 1; i < result.length; i++) {
            var tt = result[i].indexOf(')');
            var test = result[i].substr(0, tt);
            var type = test.lastIndexOf('.');
            var type = test.substr(type + 1, test.length).toLowerCase();
            if ((type == "gif") || (type == "jpg") || (type == "png")) {
                o.push(durl + '/' + test);
            } else o.push("-1");
        };
        async.map(o, loadBase64Image, function (err, r) {
            for (var i = 0; i < r.length; i++) {
                var element = r[i];
                if (element != -1) {
                    var tt = result[i].indexOf(')');
                    result[i] = element + result[i].substr(tt, result[i].length);
                }
            };
            result = result.join('url(');
            if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources"))
                fs.appendFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources", result);
            else
                fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources", result);
            callback(null, result);
        });
    });

};

function getLocalCSS(url, callback) {
    console.log("  - Generating resource " + url);
    var bpath = PROJECT_WEB + path.sep + url;
    var css = fs.readFileSync(bpath, "utf-8");
    css = encodeCSS(css, PROJECT_HOME + path.sep + "src" + path.sep + "Contents" + path.sep + "Resources");
    if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources"))
        fs.appendFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources", css);
    else
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources", css);
    callback(null, css);
};

function getCSS(url, callback) {
    var bpath = PROJECT_WEB + path.sep + url;
    if (!fs.existsSync(bpath)) getRemoteCSS(url, callback);
    else getLocalCSS(url, callback);
};

function copyMyFiles(src, dst) {
    var p = glob.readdirSyncRecursive(src);
    if (!fs.existsSync(dst)) fs.mkdirSync(dst);
    for (var i = 0; i < p.length; i++) {
        var item = src + path.sep + p[i];
        if (fs.lstatSync(item).isDirectory()) {
            if (!fs.existsSync(dst + path.sep + p[i])) fs.mkdirSync(dst + path.sep + p[i]);
        } else {
            if (!fs.existsSync(dst + path.sep + p[i])) copyFileSync(item, dst + path.sep + p[i]);
        }
    };
};



function make_final(err, result) {
    // compress css
    if (!fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources.css")) {
        var css = result.join('\n');
        var link = require('sqwish').minify(css);
        fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources.css", link);
        fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources");
    };

    // On copie les fichiers dans build et on supprime le répertoire
    if (!fs.existsSync(PROJECT_BUILD)) fs.mkdirSync(PROJECT_BUILD);
    if (!fs.existsSync(PROJECT_BUILD + path.sep + "webapp")) fs.mkdirSync(PROJECT_BUILD + path.sep + "webapp");
    if (!fs.existsSync(PROJECT_BUILD + path.sep + "webapp")) fs.mkdirSync(PROJECT_BUILD + path.sep + "webapp");
    if (!fs.existsSync(PROJECT_BUILD + path.sep + "webapp" + path.sep + Settings.VERSION + '.' + Settings.BUILD)) fs.mkdirSync(PROJECT_BUILD + path.sep + "webapp" + path.sep + Settings.VERSION + '.' + Settings.BUILD);
    if (!fs.existsSync(PROJECT_BUILD + path.sep + "webapp" + path.sep + Settings.VERSION + '.' + Settings.BUILD + path.sep + "Contents")) fs.mkdirSync(PROJECT_BUILD + path.sep + "webapp" + path.sep + Settings.VERSION + '.' + Settings.BUILD + path.sep + "Contents");

    // et on copie les fichiers
    copyFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Application.js", PROJECT_BUILD + path.sep + "webapp" + path.sep + Settings.VERSION + '.' + Settings.BUILD + path.sep + "Contents" + path.sep + "Application.js");
    copyFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources.css", PROJECT_BUILD + path.sep + "webapp" + path.sep + Settings.VERSION + '.' + Settings.BUILD + path.sep + "Contents" + path.sep + "Resources.css");
    copyFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "index.html", PROJECT_BUILD + path.sep + "webapp" + path.sep + Settings.VERSION + '.' + Settings.BUILD + path.sep + "index.html");
    fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Application.js");
    fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "index.html");

    console.log('    Done.');
    console.log('');

    if (PROCESS_NATIVE) build_native();
    if (PROCESS_PRODUCTION) build_production();
};

function build_native() {
    if ((PROCESS_ANDROID == -1) && (PROCESS_IOS == -1)) {
        return;
    };

    function NS(ns) {
        var sp = ns.split('.');
        var str = [];
        for (var i = 0; i < sp.length; i++) {
            str.push(sp[i].substr(0, 1).toUpperCase() + sp[i].substr(1, 255));
        };
        return str.join('');
    };
    console.log('');
    console.log('  - Making native workspace');
    process.chdir(PROJECT_HOME + path.sep + 'dev');
    shelljs.exec("cordova create native -i " + Manifest.namespace + " -n " + Manifest.title.replace(/\s/g, "").replace(/([^a-z0-9]+)/gi, ''));
    // write config.xml
    var parseString = require('xml2js').parseString;
    var _config = require('fs').readFileSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'config.xml', 'utf-8');
    parseString(_config, function (err, config) {
        // trouver une solution pour ios (pas de titre avec espace)
        //config.widget.name[0]=Manifest.title;
        config.widget.name[0] = Manifest.title.replace(/\s/g, "").replace(/([^a-z0-9]+)/gi, '')
        config.widget.description[0] = Manifest.description;
        config.widget.author[0]._ = Manifest.author.name;
        config.widget.author[0].$.email = Manifest.author.mail;
        config.widget.author[0].$.href = Manifest.author.web;
        config.widget.preference = {
            $: {
                name: "Fullscreen"
                , value: "false"
            }
        };
        /*
        Unsafe operation
        */
        if (process.argv.indexOf("unsafe") > -1) {
            if (!config.widget['allow-navigation']) config.widget['allow-navigation'] = [];
            config.widget['allow-navigation'].push({
                $: {
                    href: "http://*/*"
                }
            });
        };

        process.chdir(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native');

        if (PROCESS_ANDROID != -1) {
            var t = -1;
            for (var i = 0; i < config.widget.platform.length; i++) {
                if (config.widget.platform[i].$.name == "android") t = i;
            };
            var f_android = config.widget.platform[t];
            f_android.icon = [
                {
                    $: {
                        src: "res/android/ldpi.png"
                        , density: "ldpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/mdpi.png"
                        , density: "mdpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/hdpi.png"
                        , density: "hdpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/xhdpi.png"
                        , density: "xhdpi"
                    }
				}
			];
            f_android.splash = [
                {
                    $: {
                        src: "res/android/splash-land-hdpi.png"
                        , density: "land-hdpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/splash-land-ldpi.png"
                        , density: "land-ldpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/splash-land-mdpi.png"
                        , density: "land-mdpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/splash-land-xhdpi.png"
                        , density: "land-xhdpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/splash-port-hdpi.png"
                        , density: "port-hdpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/splash-port-ldpi.png"
                        , density: "port-ldpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/splash-port-mdpi.png"
                        , density: "port-mdpi"
                    }
				}
                , {
                    $: {
                        src: "res/android/splash-port-xhdpi.png"
                        , density: "port-xhdpi"
                    }
				}
			];
        };
        if (PROCESS_IOS != -1) {
            var t = -1;
            for (var i = 0; i < config.widget.platform.length; i++) {
                if (config.widget.platform[i].$.name == "ios") t = i;
            };
            var f_ios = config.widget.platform[t];

            f_ios.icon = [
                {
                    $: {
                        src: "res/ios/icon-60@3x.png"
                        , width: "180"
                        , height: "180"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-60.png"
                        , width: "60"
                        , height: "60"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-60@2x.png"
                        , width: "120"
                        , height: "120"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-76.png"
                        , width: "76"
                        , height: "76"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-76@2x.png"
                        , width: "152"
                        , height: "152"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-40.png"
                        , width: "40"
                        , height: "40"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-40@2x.png"
                        , width: "80"
                        , height: "80"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon.png"
                        , width: "57"
                        , height: "57"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon@2x.png"
                        , width: "114"
                        , height: "114"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-72.png"
                        , width: "72"
                        , height: "72"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-72@2x.png"
                        , width: "144"
                        , height: "144"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-small.png"
                        , width: "29"
                        , height: "29"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-small@2x.png"
                        , width: "58"
                        , height: "58"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-50.png"
                        , width: "50"
                        , height: "50"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-50@2x.png"
                        , width: "100"
                        , height: "100"
                    }
				}
                , {
                    $: {
                        src: "res/ios/icon-83.5@2x.png"
                        , width: "83.5"
                        , height: "83.5"
                    }
				}
			];

            f_ios.splash = [
                {
                    $: {
                        src: "res/ios/Default~iphone.png"
                        , width: "320"
                        , height: "480"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default@2x~iphone.png"
                        , width: "640"
                        , height: "960"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-Portrait~ipad.png"
                        , width: "768"
                        , height: "1024"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-Portrait@2x~ipad.png"
                        , width: "1536"
                        , height: "2048"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-Landscape~ipad.png"
                        , width: "1024"
                        , height: "768"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-Landscape@2x~ipad.png"
                        , width: "2048"
                        , height: "1536"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-568h@2x~iphone.png"
                        , width: "640"
                        , height: "1136"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-667h.png"
                        , width: "750"
                        , height: "1334"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-736h.png"
                        , width: "1242"
                        , height: "2208"
                    }
				}
                , {
                    $: {
                        src: "res/ios/Default-Landscape-736h.png"
                        , width: "2208"
                        , height: "1242"
                    }
				}
			];
        };

        var builder = new XML2JS.Builder();
        var xml = builder.buildObject(config);
        require('fs').writeFileSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'config.xml', xml);


        if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res');
        if (PROCESS_ANDROID != -1) {
            if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res' + path.sep + 'android')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res' + path.sep + 'android');
        };
        if (PROCESS_IOS != -1) {
            if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res' + path.sep + 'ios')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res' + path.sep + 'ios');
        };

        var dir_native = PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www' + path.sep + 'res' + path.sep;
        GRAPHICS = [];

        // making icons & splashscreen
        // android
        if (PROCESS_ANDROID != -1) {
            var dir_native = PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res' + path.sep + 'android' + path.sep;
            // icons
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 36x36 "' + dir_native + 'ldpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 48x48 "' + dir_native + 'mdpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 72x72 "' + dir_native + 'hdpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 96x96 "' + dir_native + 'xhdpi.png"');
            // splashscreen
            // landscape
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 300x480 "' + dir_native + 'splash-land-hdpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 320x200 "' + dir_native + 'splash-land-ldpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 480x320 "' + dir_native + 'splash-land-mdpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 1280x720 "' + dir_native + 'splash-land-xhdpi.png"');
            // portrait
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 480x800 "' + dir_native + 'splash-port-hdpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 200x320 "' + dir_native + 'splash-port-ldpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 320x480 "' + dir_native + 'splash-port-mdpi.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -size 720x1280 "' + dir_native + 'splash-port-xhdpi.png"');
        };
        // ios
        if (PROCESS_IOS != -1) {
            var dir_native = PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'res' + path.sep + 'ios' + path.sep;
            // icons
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 180x180\! "' + dir_native + 'icon-60@3x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 87x87\! "' + dir_native + 'icon-small@3x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 60x60\! "' + dir_native + 'icon-60.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 120x120\! "' + dir_native + 'icon-60@2x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 76x76\! "' + dir_native + 'icon-76.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 152x152\! "' + dir_native + 'icon-76@2x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 40x40\! "' + dir_native + 'icon-40.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 80x80\! "' + dir_native + 'icon-40@2x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 57x57\! "' + dir_native + 'icon.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 114x114\! "' + dir_native + 'icon@2x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 72x72\! "' + dir_native + 'icon-72.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 144x144\! "' + dir_native + 'icon-72@2x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 29x29\! "' + dir_native + 'icon-small.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 58x58\! "' + dir_native + 'icon-small@2x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 50x50\! "' + dir_native + 'icon-50.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 100x100\! "' + dir_native + 'icon-50@2x.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + PROJECT_HOME + path.sep + Manifest.icon.file + '" -alpha remove -background "' + Manifest.icon.background + '" -flatten -resize 167x167\! "' + dir_native + 'icon-83.5@2x.png"');
            // splashscreen
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 320x480\! "' + dir_native + 'Default~iphone.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 640x960\! "' + dir_native + 'Default@2x~iphone.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 768x1024\! "' + dir_native + 'Default-Portrait~ipad.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 1536x2048\! "' + dir_native + 'Default-Portrait@2x~ipad.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 1024x768\! "' + dir_native + 'Default-Landscape~ipad.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 2048x1536\! "' + dir_native + 'Default-Landscape@2x~ipad.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 640x1136\! "' + dir_native + 'Default-568h@2x~iphone.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 750x1334\! "' + dir_native + 'Default-667h.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 1242x2208\! "' + dir_native + 'Default-736h.png"');
            GRAPHICS.push('"' + __dirname + path.sep + 'im' + path.sep + 'convert" "' + __dirname + path.sep + 'transparent.png" -alpha remove -gravity center -background "' + Manifest.splashscreen.background + '" -resize 2208x1242\! "' + dir_native + 'Default-Landscape-736h.png"');
        };

        console.log('  - Adding resources');

        async.map(GRAPHICS, convert, function (err, result) {

            if (PROCESS_IOS != -1) {
                // generate platforms
                console.log('  - Adding ios platform');
                shelljs.exec("cordova platform add ios");
            }

            if (PROCESS_ANDROID != -1) {
                // generate platforms
                console.log('  - Adding android platform');
                shelljs.exec("cordova platform add android");
            }
            var plugz = Manifest.plugins;
            console.log('  - Configuring plugins');
            for (var i = 0; i < plugz.length; i++) {
                console.log('    - Adding ' + plugz[i]);
                if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'plugins' + path.sep + plugz[i])) shelljs.exec('cordova plugin add "' + plugz[i] + '"');
            };

            glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www');
            shelljs.mkdir(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www');
            shelljs.cp(PROJECT_HOME + path.sep + 'builds' + path.sep + 'webapp' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + 'index.html', PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www' + path.sep + 'index.html');
            var ndx = fs.readFileSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www' + path.sep + 'index.html', 'utf-8');
            ndx = ndx.replace('</body>', '<script type=text/javascript src="cordova.js"></script></body>');
            fs.writeFileSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www' + path.sep + 'index.html', ndx);

            fs.mkdirSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www' + path.sep + 'Contents');
            shelljs.cp(PROJECT_HOME + path.sep + 'builds' + path.sep + 'webapp' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + 'Contents' + path.sep + 'Application.js', PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www' + path.sep + 'Contents' + path.sep + 'Application.js');
            shelljs.cp(PROJECT_HOME + path.sep + 'builds' + path.sep + 'webapp' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + 'Contents' + path.sep + 'Resources.css', PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'www' + path.sep + 'Contents' + path.sep + 'Resources.css');

            shelljs.exec("cordova prepare");

            /*if (PROCESS_IOS!=-1) {
                if (process.argv.indexOf("unsafe")>-1) {
                    var plist=require('plist');
                    // on parse le plist généré par cordova
                    var xcode_dir=PROJECT_HOME+path.sep+'dev'+path.sep+'native'+path.sep+'platforms'+path.sep+"ios";
                    var dir=fs.readdirSync(xcode_dir);
                    var project_ios="";
                    for (var i=0;i<dir.length;i++) {
                        if (dir[i].indexOf(".xcodeproj")>-1) project_ios=dir[i].substr(0,dir[i].indexOf(".xcodeproj"));
                    };
                    if (project_ios!="") project_ios=xcode_dir+path.sep+project_ios+path.sep+project_ios+"-Info.plist";
                    var cfg=fs.readFileSync(project_ios,"utf-8");
                    cfg=plist.parse(cfg);
                    console.log(cfg);
                    //
                }
            };*/

            if (PROCESS_ANDROID != -1) {
                shelljs.rm('-rf', PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'platforms' + path.sep + 'android' + path.sep + 'res' + path.sep + 'values-*');
                if (process.argv.indexOf("release") > -1) {
                    console.log('  - Compiling release APK... Please wait!');
                    shelljs.exec('cordova build --release android', {
                        silent: false
                    });
                    /*
                    keytool -genkey -noprompt \
 -alias alias1 \
 -dname "CN=mqttserver.ibm.com, OU=ID, O=IBM, L=Hursley, S=Hants, C=GB" \
 -keystore keystore \
 -storepass password \
 -keypass password*/
                    if (!fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'app.keystore')) shelljs.exec('keytool -genkey -v -keystore "' + PROJECT_HOME + path.sep + 'etc' + path.sep + 'app.keystore' + '" -alias alias_name -keyalg RSA -keysize 2048 -validity 10000');
                } else {
                    console.log('  - Compiling debug APK');
                    shelljs.exec('cordova build android');
                };
                if (!fs.existsSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'native')) fs.mkdirSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'native');
                if (!fs.existsSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'native' + path.sep + 'android')) fs.mkdirSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'native' + path.sep + 'android');
                fs.mkdirSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'native' + path.sep + 'android' + path.sep + Manifest.version + '.' + Manifest.build);
                shelljs.cp(PROJECT_HOME + path.sep + 'dev' + path.sep + 'native' + path.sep + 'platforms' + path.sep + 'android' + path.sep + 'ant-build' + path.sep + '*-debug.apk', PROJECT_HOME + path.sep + 'builds' + path.sep + 'native' + path.sep + 'android' + path.sep + Manifest.version + '.' + Manifest.build);
                console.log('    Done.');
            }

        });

    });


};

function make_res() {
    // get resource from frameworks

    if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources.css")) make_final();
    else {
        async.map(Settings.RESOURCES, getCSS, make_final);
    }

};

function res_html_compile() {
    if (Settings.TYPE == "mobile") {
		var css = "";
		if (!fs.existsSync(PROJECT_HOME+path.sep+".template")) {
			// OLD SCHOOL
			var css = "";
			var links = [];
			links.push('<meta name="HandheldFriendly" content="true"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black">');
			links.push('<link rel="apple-touch-icon" href="data:image/png;base64,' + b64(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon.png') + '">');
			links.push('<link rel="apple-touch-icon" sizes="72x72" href="data:image/png;base64,' + b64(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon@72.png') + '" />');
			links.push('<link rel="apple-touch-icon" sizes="114x114" href="data:image/png;base64,' + b64(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon@114.png') + '" />');
			links.push('<link rel="apple-touch-icon" sizes="144x144" href="data:image/png;base64,' + b64(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'icons' + path.sep + 'icon@144.png') + '" />');
			var linkme = false;
			var parser = new htmlparser.Parser({
				onopentag: function (name, attribs) {
					if (name === "link") linkme = true;
				}
				, ontext: function (text) {
					if (linkme) {
						css += encodeCSS(text);
					};
				}
				, onclosetag: function (tagname) {
					if (tagname === "head") {
						linkme = false;
					};
					if (tagname === "html") {
						var link = require('sqwish').minify(css);
						var html = fs.readFileSync(PROJECT_HOME + path.sep + "src" + path.sep + "index.html", "utf-8");
						var title = html.split('<title>')[1].split('</title')[0];
						var spinner = html.split('<script>')[1].split('</script>')[0].replace(/\s{2,}/g, '');
						//var favicon="<script>var docHead=document.getElementsByTagName('head')[0];var newLink=document.createElement('link');newLink.rel='shortcut icon';newLink.href='data:image/png;base64,"+b64(PROJECT_WEB+path.sep+'Contents'+path.sep+'Resources'+path.sep+'favicon.ico')+"';docHead.appendChild(newLink);</script>";
						var body = html.split('<body ')[1].split('<script src="http://cdn.omneedia.com/public/requirejs/require.js"')[0].replace(/\s{2,}/g, '');					
						var launcher = "<script>window.setTimeout(function(){var script=document.createElement('script');script.src=\"Contents/Application.js\";document.getElementsByTagName('body')[0].appendChild(script);},1000);</script>";
						//var launcher='<script src="Contents/Application.js"></script>';
						if (process.argv.indexOf("unsafe") > -1)
							var html = '<!DOCTYPE html><html><head><meta http-equiv="Content-Security-Policy" content="default-src *; style-src \'self\' \'unsafe-inline\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'"><title>' + title + '</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><script>' + spinner + '</script><style type="text/css">' + link + '</style>' + links.join('') + '</head><body ' + body + '><link rel=stylesheet type=text/css href="Contents/Resources.css"></link>' + launcher + '</body></html>';
						else
							var html = '<!DOCTYPE html><html><head><title>' + title + '</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><script>' + spinner + '</script><style type="text/css">' + link + '</style>' + links.join('') + '</head><body ' + body + '><link rel=stylesheet type=text/css href="Contents/Resources.css"></link>' + launcher + '</body></html>';
						var html = html.replace(/>>/g, '>');
						html = html.replace('<title>', '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>');
						fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "index.html", html);
						make_res();
					}
				}
			});
			parser.write(fs.readFileSync(PROJECT_HOME + path.sep + "src" + path.sep + "index.html"));
			parser.end();
		} else {
			// NEW SCHOOL
			var tpl=fs.readFileSync(PROJECT_HOME + path.sep + ".style", "utf-8");			
			tpl = tpl.replace(/{COLOR}/g, Manifest.splashscreen.background);
			
			tpl = tpl.replace(/{BKCOLOR}/g, Manifest.splashscreen.color);
			tpl = tpl.replace(/{TITLE}/g, Manifest.title);
			tpl = tpl.replace(/{DESCRIPTION}/g, Manifest.description);
			tpl = tpl.replace(/{ICON}/g, 'data:image/png;base64,'+b64(PROJECT_HOME+path.sep+"src"+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"logo.png"));
			
			var link = require('sqwish').minify(tpl);
			
			var tpl = fs.readFileSync(PROJECT_HOME + path.sep + '.template', 'utf-8');
			tpl = tpl.replace(/{COLOR}/g, Manifest.splashscreen.background);
			tpl = tpl.replace(/{BKCOLOR}/g, Manifest.splashscreen.color);
			tpl = tpl.replace(/{TITLE}/g, Manifest.title);
			tpl = tpl.replace(/{DESCRIPTION}/g, Manifest.description);
			tpl = tpl.replace(/{ICON}/g, "Contents/Resources/startup/logo.png");
			
			if (ocfg.current["publish.host"]) __CLUSTER__="var __CLUSTER__=\""+ocfg.current["publish.host"]+"\";"; else __CLUSTER__="var __CLUSTER__=\"http://cluster.omneedia.com/\"";
			
			if (process.argv.indexOf("unsafe") > -1) tpl=tpl.replace('<head>','<head><meta http-equiv="Content-Security-Policy" content="default-src *; style-src \'self\' \'unsafe-inline\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'">');
			
			tpl=tpl.replace('<head>','<head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');
			
			var favicon = "<script>"+__CLUSTER__+"</script>";
			
			var launcher = fs.readFileSync(__dirname+path.sep+'tpl'+path.sep+'oa'+path.sep+'bootstrap_mobi.tpl');

			tpl = tpl.replace('</head>','<style type="text/css">' + link + '</style><link rel=stylesheet type=text/css href="Contents/Resources.css"></link></head>');
			
			tpl = tpl.replace('</body>',favicon+launcher+'</body>');
			var minify = require('html-minifier').minify;
			var min=minify(tpl.replace(/\t/g,'').replace(/\n/g,''));
			fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "index.html", min);
			make_res();
		}

    };

    if (Settings.TYPE == "desktop") {
		var css = "";
		if (!fs.existsSync(PROJECT_HOME+path.sep+".template")) {
			// OLD SCHOOL
			var parser = new htmlparser.Parser({
				onopentag: function (name, attribs) {
					if (name === "link") linkme = true;
				}
				, ontext: function (text) {
					if (linkme) {
						css += encodeCSS(text);
					};
				}
				, onclosetag: function (tagname) {
					if (tagname === "head") {
						linkme = false;
					};
					if (tagname === "html") {
						var link = require('sqwish').minify(css);
						var html = fs.readFileSync(PROJECT_HOME + path.sep + "src" + path.sep + "index.html", "utf-8");
						var title = html.split('<title>')[1].split('</title')[0];
						var spinner = html.split('<script>')[1].split('</script>')[0].replace(/\s{2,}/g, '');
						var favicon = "<script>var docHead=document.getElementsByTagName('head')[0];var newLink=document.createElement('link');newLink.rel='shortcut icon';newLink.href='data:image/png;base64," + b64(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'favicon.ico') + "';docHead.appendChild(newLink);</script>";
						var body = html.split('<body ')[1].split('<script src="http://cdn.omneedia.com/public/requirejs/require.js"')[0].replace(/\s{2,}/g, '');
						if (ocfg.current["publish.host"]) __CLUSTER__="var __CLUSTER__=\""+ocfg.current["publish.host"]+"\";"; else __CLUSTER__="";
						var launcher = "<script>"+__CLUSTER__+"window.setTimeout(function(){var script=document.createElement('script');script.src=\"Contents/Application.js\";document.getElementsByTagName('body')[0].appendChild(script);},1000);</script>";
						var html = '<!DOCTYPE html><html><head><title>' + title + '</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><script>' + spinner + '</script><style type="text/css">' + link + '</style></head><body ' + body + '><link rel=stylesheet type=text/css href="Contents/Resources.css"></link>' + favicon + launcher + '</body></html>';
						var html = html.replace(/>>/g, '>');
						fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "index.html", html);
						make_res();
					}
				}
			});
			parser.write(fs.readFileSync(PROJECT_HOME + path.sep + "src" + path.sep + "index.html"));
			parser.end();
		} else {
			// NEW SCHOOL
			var tpl=fs.readFileSync(PROJECT_HOME + path.sep + ".style", "utf-8");			
			tpl = tpl.replace(/{COLOR}/g, Manifest.splashscreen.background);
			
			tpl = tpl.replace(/{BKCOLOR}/g, Manifest.splashscreen.color);
			tpl = tpl.replace(/{TITLE}/g, Manifest.title);
			tpl = tpl.replace(/{DESCRIPTION}/g, Manifest.description);
			tpl = tpl.replace(/{ICON}/g, 'data:image/png;base64,'+b64(PROJECT_HOME+path.sep+"src"+path.sep+"Contents"+path.sep+"Resources"+path.sep+"startup"+path.sep+"logo.png"));
			
			var link = require('sqwish').minify(tpl);
			var tpl = fs.readFileSync(PROJECT_HOME + path.sep + '.template', 'utf-8');
			tpl = tpl.replace(/{COLOR}/g, Manifest.splashscreen.background);
			tpl = tpl.replace(/{BKCOLOR}/g, Manifest.splashscreen.color);
			tpl = tpl.replace(/{TITLE}/g, Manifest.title);
			tpl = tpl.replace(/{DESCRIPTION}/g, Manifest.description);
			tpl = tpl.replace(/{ICON}/g, "Contents/Resources/startup/logo.png");
			if (ocfg.current["publish.host"]) __CLUSTER__="var __CLUSTER__=\""+ocfg.current["publish.host"]+"\";"; else __CLUSTER__="";
			var favicon = "<script>"+__CLUSTER__+"var docHead=document.getElementsByTagName('head')[0];var newLink=document.createElement('link');newLink.rel='shortcut icon';newLink.href='data:image/png;base64," + b64(PROJECT_WEB + path.sep + 'Contents' + path.sep + 'Resources' + path.sep + 'favicon.ico') + "';docHead.appendChild(newLink);</script>";
			var launcher = fs.readFileSync(__dirname+path.sep+'tpl'+path.sep+'oa'+path.sep+'bootstrap_prod.tpl');
			tpl = tpl.replace('</head>','<style type="text/css">' + link + '</style><link rel=stylesheet type=text/css href="Contents/Resources.css"></link></head>');
			tpl = tpl.replace('</body>',favicon+launcher+'</body>');
			var minify = require('html-minifier').minify;
			var min=minify(tpl.replace(/\t/g,'').replace(/\n/g,''));
			fs.writeFileSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "index.html", min);
			make_res();
		};			
	}
};

function generateCode(data) {
    var qr = QRCode.qrcode(4, 'L');
    qr.addData(data);
    qr.make();
    var qrimgtag = qr.createImgTag(4);
    var idx = qrimgtag.indexOf("base64,") + 7;
    qrimgtag = qrimgtag.substring(idx);
    idx = qrimgtag.indexOf("\"");

    return "data:image/png;base64," + qrimgtag.split('"')[0];
};

/********

Config

**********/

cfg = {
    set: function (ndx, value) {
        if (!fs.existsSync(__dirname + path.sep + ".config")) var config = {};
        else var config = JSON.parse(fs.readFileSync(__dirname + path.sep + ".config", 'utf-8'));
        if (!config.current) config.current = {};
        config.current[ndx] = value;
        fs.writeFileSync(__dirname + path.sep + ".config", JSON.stringify(config, null, 4));
    }
    , unset: function (ndx) {
        if (!fs.existsSync(__dirname + path.sep + ".config")) var config = {};
        else var config = JSON.parse(fs.readFileSync(__dirname + path.sep + ".config", 'utf-8'));
        if (!config.current) config.current = {};
        delete config.current[ndx];
        fs.writeFileSync(__dirname + path.sep + ".config", JSON.stringify(config, null, 4));
    }
    , update: function (ns) {
        // unset proxy for omneedia
        PROXY = "";
        console.log('  - Updating config');
        // unset proxy for npm
        shelljs.exec('npm config delete proxy', {
            silent: true
        });
        shelljs.exec('npm config delete https-proxy', {
            silent: true
        });
        // unset proxy for git
        shelljs.exec('git config --global core.pager cat', {
            silent: true
        });
        shelljs.exec('git config --global --unset http.proxy', {
            silent: true
        });
        shelljs.exec('git config --global --unset https.proxy', {
            silent: true
        });
        if (!fs.existsSync(__dirname + path.sep + ".config")) var config = {};
        else var config = JSON.parse(fs.readFileSync(__dirname + path.sep + ".config", 'utf-8'));
        if (!config.current) config.current = {};
        for (var el in config.current) {
            if (el == "proxy") {
                // set proxy for omneedia
                PROXY = config.current['proxy'];
                // set proxy for npm
                shelljs.exec('npm config set proxy ' + PROXY, {
                    silent: true
                });
                shelljs.exec('npm config set https-proxy ' + PROXY, {
                    silent: true
                });
                // set proxy for git
                shelljs.exec('git config --global http.proxy ' + PROXY);
                shelljs.exec('git config --global https.proxy ' + PROXY);
            }
        };
        console.log('  - Config updated.');
        console.log('');
    }
    , load: function (ns) {

        // unset proxy for omneedia
        PROXY = "";
        console.log('  - Loading config ' + ns.white);
        // unset proxy for npm
        shelljs.exec('npm config delete proxy', {
            silent: true
        });
        shelljs.exec('npm config delete https-proxy', {
            silent: true
        });
        // unset proxy for git
        shelljs.exec('git config --global core.pager cat', {
            silent: true
        });
        shelljs.exec('git config --global --unset http.proxy', {
            silent: true
        });
        shelljs.exec('git config --global --unset https.proxy', {
            silent: true
        });
        if (!fs.existsSync(__dirname + path.sep + ".config")) var config = {};
        else var config = JSON.parse(fs.readFileSync(__dirname + path.sep + ".config", 'utf-8'));
        if (!config.current) config.current = {};
        if (config[ns]) config.current = config[ns];
        for (var el in config.current) {
            if (el == "proxy") {
                // set proxy for omneedia
                PROXY = config.current['proxy'];
                // set proxy for npm
                shelljs.exec('npm config set proxy ' + PROXY, {
                    silent: true
                });
                shelljs.exec('npm config set https-proxy ' + PROXY, {
                    silent: true
                });
                // set proxy for git
                shelljs.exec('git config --global http.proxy ' + PROXY);
                shelljs.exec('git config --global https.proxy ' + PROXY);
            }
        };
        fs.writeFileSync(__dirname + path.sep + ".config", JSON.stringify(config, null, 4));
        console.log('  - Config ' + ns + ' loaded.');
        console.log('');
    }
    , save: function (ns) {
        if (!fs.existsSync(__dirname + path.sep + ".config")) var config = {};
        else var config = JSON.parse(fs.readFileSync(__dirname + path.sep + ".config", 'utf-8'));
        if (!config.current) config.current = {};
        config[ns] = config.current;
        fs.writeFileSync(__dirname + path.sep + ".config", JSON.stringify(config, null, 4));
        console.log('  - Config saved.'.green);
        console.log('');
    }
};

/***

***/

function get_mysql_tables(db, res, response) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: db.host
        , port: db.port
        , user: db.user
        , password: db.pass
    });

    connection.connect();
    var table = "";
    response.tables = [];
    response.db = db.name;
    response.table = {};
    connection.query("SELECT * FROM information_schema.columns WHERE table_schema =  '" + db.name + "' ORDER BY table_name, ordinal_position", function (err, rows) {
        if (err) {
            response.error = err;
        } else {
            for (var i = 0; i < rows.length; i++) {
                var r = rows[i];
                if (r.TABLE_NAME != table) {
                    response.tables[response.tables.length] = r.TABLE_NAME;
                    table = r.TABLE_NAME;
                    response.table[table] = {
                        key: -1
                        , fields: []
                        , field: {}
                    };
                };
                response.table[table].fields[response.table[table].fields.length] = r.COLUMN_NAME;
                if (r.COLUMN_KEY == "PRI") response.table[table].key = r.COLUMN_NAME;
                response.table[table].field[r.COLUMN_NAME] = {
                    default: r.COLUMN_DEFAULT
                    , isNull: r.IS_NULLABLE
                    , type: r.DATA_TYPE
                    , maxlength: r.CHARACTER_MAXIMUM_LENGTH
                    , num_precision: r.NUMERIC_PRECISION
                    , num_scale: r.NUMERIC_SCALE
                    , key: r.COLUMN_KEY
                    , extra: r.EXTRA
                    , comment: r.COLUMN_COMMENT
                };
            };
        };
        //if (!fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db")) fs.mkdirSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db");
        //if (!fs.existsSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme")) fs.writeFileSync(PROJECT_WEB+path.sep+"Contents"+path.sep+"Db"+path.sep+response.db+".scheme",JSON.stringify(response,null,4));
        res.end(JSON.stringify(response, null, 4));
    });
    connection.end();

};

function getFields(data, table, SCHEME, response, _from) {
    if (!response) var response = {
        fields: []
        , field: {}
    };
    if (!_from) _from = table;
    else _from = _from + "." + table;
    for (var e in data) {
        if (e == table) {
            for (var el in data[e]) {
                if (SCHEME[table]) {
                    if (SCHEME[table][el]) {
                        var mytable = SCHEME[table][el].split('.')[0];
                        getFields(data, mytable, SCHEME, response, _from);
                    } else {
                        response.fields[response.fields.length] = _from + "." + el;
                        response.field[_from + "." + el] = data[e][el];
                    }
                } else {
                    response.fields[response.fields.length] = _from + "." + el;
                    response.field[_from + "." + el] = data[e][el];
                }
            }
        }
    };
    return response;
};

function fieldz(db, res, response, data) {
    if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Db" + path.sep + response.db + ".scheme")) {
        var json = fs.readFileSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Db" + path.sep + response.db + ".scheme");
        var SCHEME = JSON.parse(json);
    } else SCHEME = {};
    result = getFields(data, response.table, SCHEME);
    response.fields = result.fields;
    response.field = result.field;
    res.end(JSON.stringify(response, null, 4));
};

function get_mysql_fields(db, res, response, cb) {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: db.host
        , port: db.port
        , user: db.user
        , password: db.pass
    });
    connection.connect();
    var table = db.table;
    response.db = db.name;
    response.table = db.table;
    response.fields = [];
    response.field = {};
    connection.query("SELECT * FROM information_schema.columns WHERE table_schema =  '" + db.name + "' ORDER BY table_name, ordinal_position", function (err, rows) {
        var data = {};
        for (var i = 0; i < rows.length; i++) {
            var r = rows[i];
            if ((r.COLUMN_KEY == "PRI") && (r.TABLE_NAME == response.table)) response.key = response.table + "." + r.COLUMN_NAME;
            if (!data[r.TABLE_NAME]) data[r.TABLE_NAME] = {};
            if (!data[r.TABLE_NAME][r.COLUMN_NAME]) data[r.TABLE_NAME][r.COLUMN_NAME] = {
                default: r.COLUMN_DEFAULT
                , isNull: r.IS_NULLABLE
                , type: r.DATA_TYPE
                , maxlength: r.CHARACTER_MAXIMUM_LENGTH
                , num_precision: r.NUMERIC_PRECISION
                , num_scale: r.NUMERIC_SCALE
                , key: r.COLUMN_KEY
                , extra: r.EXTRA
                , comment: r.COLUMN_COMMENT
            };
        };
        cb(db, res, response, data);
    });
    connection.end();

};

function get_mysql_datas(db, res, response, data) {
    var tables = [];
    var fields = [];
    if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Db" + path.sep + response.db + ".scheme")) {
        var json = fs.readFileSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Db" + path.sep + response.db + ".scheme");
        var SCHEME = JSON.parse(json);
    } else SCHEME = {};
    result = getFields(data, response.table, SCHEME);
    response.fields = result.fields;
    response.field = result.field;
    for (var i = 0; i < response.fields.length; i++) {
        var element = response.fields[i].split('.');
        for (var j = 0; j < element.length - 1; j++) {
            if (tables.indexOf(element[j]) == -1) tables[tables.length] = element[j];
        };
        fields[fields.length] = element[element.length - 2] + "." + element[element.length - 1];
    };
    var sql = "SELECT " + fields.join(', ') + " FROM " + tables.join(', ') + " WHERE";
    for (var table in SCHEME) {
        var mytable = SCHEME[table];
        for (var property in mytable) {
            sql += " " + table + "." + property + " = " + mytable[property] + " AND";
        }
    };
    console.log(sql);
    res.end(sql);
};

function get_mysql_data(db, res, response) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: db.host
        , port: db.port
        , user: db.user
        , password: db.pass
    });

    connection.connect();
    var table = db.table;
    response.db = db.name;
    response.table = db.table;
    response.fields = [];
    response.field = {};
    response.data = [];

    if (db.fields == "*") {
        get_mysql_fields(db, res, response, get_mysql_datas);
    }
};



API = [];
PROJECT_HOME = process.cwd();
PROJECT_GIT = false;

var parseArgs = require('minimist');
process.args=parseArgs(process.argv);




if (process.args.sandbox) {
    if (!process.args.user) {
        console.log('  ! No user provided'.yellow);
    };
    PROJECT_HOME=__dirname+path.sep+".."+path.sep+"var"+path.sep+process.args.user;
    if (!fs.existsSync(PROJECT_HOME)) fs.mkdirSync(PROJECT_HOME);
    if (process.argv.indexOf('get')>-1) {
		var gget=process.argv[process.argv.indexOf('get')+1];
		if (gget.indexOf('://')>-1) {
			mget=gget.substr(gget.lastIndexOf('/')+1,gget.length);
			PROJECT_GIT=gget;
		} else mget=gget;
		PROJECT_HOME+=path.sep+mget;
	};
	if (process.argv.indexOf('start')>-1) {
		PROJECT_HOME+=path.sep+process.args.app;
		ROOT = path.dirname(PROJECT_HOME);
        PROJECT_WEB = PROJECT_HOME + path.sep + "src";
        PROJECT_API = PROJECT_WEB + path.sep + "Contents" + path.sep + "Services";
        PROJECT_DEV = PROJECT_HOME + path.sep + "dev";
        PROJECT_VAR = PROJECT_HOME + path.sep + "var";
        PROJECT_SYSTEM = PROJECT_WEB + path.sep + "System";
        PROJECT_BUILD = PROJECT_HOME + path.sep + "builds";
        PROJECT_NS = ROOT.split(path.sep)[ROOT.split(path.sep).length - 1];

        if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev');
        if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'webapp')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'webapp');

        // Settings
        if (fs.existsSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Settings.js')) {
            var settings = fs.readFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Settings.js', 'utf-8');
            eval(settings);
        }

        // get app.manifest
        var json = fs.readFileSync(PROJECT_HOME + path.sep + "app.manifest");
        Manifest = JSON.parse(json);

        //get args

        PROCESS_CUSTOM = -1;

	}

};

ROOT = path.dirname(PROJECT_HOME);

if (!process.args.sandbox) {
    if (!fs.existsSync(PROJECT_HOME + path.sep + "app.manifest")) {
        if (!fs.existsSync(PROJECT_HOME + path.sep + ".." + path.sep + "app.manifest")) PROJECT_HOME = "-";
        else PROJECT_HOME = path.normalize(fs.realpathSync(PROJECT_HOME + path.sep + ".." + path.sep));
    };
};

if (!process.args.sandbox) {
    if (PROJECT_HOME != "-") {
        PROJECT_WEB = PROJECT_HOME + path.sep + "src";
        PROJECT_API = PROJECT_WEB + path.sep + "Contents" + path.sep + "Services";
        PROJECT_DEV = PROJECT_HOME + path.sep + "dev";
        PROJECT_VAR = PROJECT_HOME + path.sep + "var";
        PROJECT_SYSTEM = PROJECT_WEB + path.sep + "System";
        PROJECT_BUILD = PROJECT_HOME + path.sep + "builds";
        PROJECT_NS = ROOT.split(path.sep)[ROOT.split(path.sep).length - 1];

        if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev');
        if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'webapp')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'webapp');

        // Settings
        if (fs.existsSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Settings.js')) {
            var settings = fs.readFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Settings.js', 'utf-8');
            eval(settings);
        }

        // get app.manifest
        var json = fs.readFileSync(PROJECT_HOME + path.sep + "app.manifest");
        Manifest = JSON.parse(json);

        //get args
        if (process.argv.indexOf("start") > -1) var setmeup = process.argv[process.argv.indexOf("start") + 1];
        if (process.argv.indexOf("updatedb") > -1) var setmeup = process.argv[process.argv.indexOf("updatedb") + 1];
        if (process.argv.indexOf("migrationdb") > -1) var setmeup = process.argv[process.argv.indexOf("migrationdb") + 1];

        PROCESS_CUSTOM = -1;
        if (process.argv.indexOf('production') > -1) {
            PROCESS_NATIVE = false;
            PROCESS_PRODUCTION = true;
            var p = glob.readdirSyncRecursive(PROJECT_HOME + path.sep + 'etc');
            for (var z = 0; z < p.length; z++) {
                try {
                    var cc = p[z].split('settings-')[1].split('.json')[0];
                    if (process.argv.indexOf(cc) > -1) PROCESS_CUSTOM = cc;
                } catch (e) {

                }
            }
        };

        if (process.argv.indexOf("build") > -1) {
            setmeup = "prod";
            if (PROCESS_CUSTOM != -1) setmeup = PROCESS_CUSTOM;
            if (!fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings-' + setmeup + '.json')) {
                console.log("  ! No settings-prod found. Can't build.".yellow);
                return;
            }
        };

        if (setmeup && setmeup.indexOf('--')==-1) {
            if (fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings-' + setmeup + '.json')) {
                var _set = fs.readFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings-' + setmeup + '.json', 'utf-8');
                MSettings = JSON.parse(_set);
            } else console.log(setmeup + ' settings not found');
        } else {
            if (fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json')) {
                var _set = fs.readFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json', 'utf-8');
                MSettings = JSON.parse(_set);
            }
        };

    };
};

function update_npm() {
    if (fs.existsSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'package.json')) {
        var npm = fs.readFileSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'package.json', 'utf-8');
        npm = JSON.parse(npm);
        var list = [];
        for (var element in npm.dependencies) {
            list.push(element);
        };
        if (list.length > 0) {
            console.log('  - Updating npm packages');
            process.chdir(PROJECT_HOME + path.sep + 'bin');
            for (var i = 0; i < list.length; i++) {
                if (!fs.existsSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + list[i])) {
                    console.log('    - Downloading ' + list[i]);
					if (process.args.sandbox)
					    shelljs.exec(__dirname+path.sep+'nodejs'+path.sep+'bin'+path.sep+'npm install',{silent: true});
					else
					    shelljs.exec('npm install',{silent: true});
                    console.log('      Done.');
                };
            };
        };
        // remove unnecessary packages
        if (!fs.existsSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules')) fs.mkdirSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules');
        var dir = fs.readdirSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules');
        for (var i = 0; i < dir.length; i++) {
            if (list.indexOf(dir[i]) == -1) glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + dir[i]);
        };
        process.chdir(PROJECT_HOME);
    };
};

function build_production() {
    console.log('  - Downloading worker API');
    Request('https://github.com/Omneedia/tpl.omneedia.production/archive/master.zip').on('end', function () {
        console.log('  - Expanding production template');
        var readStream = fs.createReadStream(PROJECT_HOME + path.sep + 'master.zip');
        var writeStream = require('fstream').Writer(PROJECT_HOME);
        readStream
            .pipe(unzip.Parse())
            .pipe(writeStream.on('close', function () {
                if (!fs.existsSync(PROJECT_HOME + path.sep + 'builds')) fs.mkdirSync(PROJECT_HOME + path.sep + 'builds');
                if (!fs.existsSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production')) fs.mkdirSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production');
                if (!fs.existsSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + Manifest.version + '.' + Manifest.build)) fs.mkdirSync(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + Manifest.version + '.' + Manifest.build);
                glob.copyDirSyncRecursive(PROJECT_HOME + path.sep + 'tpl.omneedia.production-master', PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + Manifest.namespace);
                require('fs').unlinkSync(PROJECT_HOME + path.sep + 'master.zip');
                glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'tpl.omneedia.production-master');
                var _cdir = PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + Manifest.namespace + path.sep + 'Contents';
                if (!fs.existsSync(_cdir + path.sep + 'bin')) fs.mkdirSync(_cdir + path.sep + 'bin');
                if (!fs.existsSync(_cdir + path.sep + 'etc')) fs.mkdirSync(_cdir + path.sep + 'etc');
                if (!fs.existsSync(_cdir + path.sep + 'api')) fs.mkdirSync(_cdir + path.sep + 'api');
                if (!fs.existsSync(_cdir + path.sep + 'var')) fs.mkdirSync(_cdir + path.sep + 'var');
                if (!fs.existsSync(_cdir + path.sep + 'www')) fs.mkdirSync(_cdir + path.sep + 'www');
                if (!fs.existsSync(_cdir + path.sep + 'www' + path.sep + 'Contents')) fs.mkdirSync(_cdir + path.sep + 'www' + path.sep + 'Contents');

                if (Manifest.platform == "mobile") {
                    console.log('  - Processing index');
                    var index = [
					"OMNEEDIA API SERVER"
				];
                    fs.writeFileSync(_cdir + path.sep + 'www' + path.sep + 'index.html', index.join('\n'));
                } else {
                    console.log('  - Processing app');
                    shelljs.cp(PROJECT_HOME + path.sep + 'builds' + path.sep + 'webapp' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + 'index.html', _cdir + path.sep + 'www' + path.sep + 'index.html');
                    shelljs.cp(PROJECT_HOME + path.sep + 'builds' + path.sep + 'webapp' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + 'Contents' + path.sep + 'Application.js', _cdir + path.sep + 'www' + path.sep + 'Contents' + path.sep + 'Application.js');
                    shelljs.cp(PROJECT_HOME + path.sep + 'builds' + path.sep + 'webapp' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + 'Contents' + path.sep + 'Resources.css', _cdir + path.sep + 'www' + path.sep + 'Contents' + path.sep + 'Resources.css');
                }

                // update package.json
                console.log('  - Processing package.json');
                var pkg = JSON.parse(fs.readFileSync(_cdir + path.sep + 'package.json', 'utf-8'));
                for (var i = 0; i < Manifest.packages.length; i++) pkg.dependencies[Manifest.packages[i]] = "*";
                fs.writeFileSync(_cdir + path.sep + 'package.json', JSON.stringify(pkg, null, 4));

                // update settings
                console.log('  - Processing settings');
                shelljs.cp(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings-prod.json', _cdir + path.sep + 'etc' + path.sep + 'settings-prod.json');

                // update api
                console.log('  - Processing api');
                glob.copyDirSyncRecursive(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Services', _cdir + path.sep + 'api', {
                    forceDelete: true
                });

                // update api
                console.log('  - Processing worker system');
                glob.copyDirSyncRecursive(PROJECT_HOME + path.sep + 'src' + path.sep + 'System', _cdir + path.sep + 'var', {
                    forceDelete: true
                });

                // update manifest
                console.log('  - Processing manifest');
                shelljs.cp(PROJECT_HOME + path.sep + 'app.manifest', _cdir + path.sep + 'app.manifest');

                // update auth (officer)
                console.log('  - Processing Auth');
                shelljs.mkdir(_cdir + path.sep + 'auth');
                shelljs.cp(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Auth' + path.sep + 'Officer.js', _cdir + path.sep + 'auth' + path.sep + 'Officer.js');
                if (fs.existsSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Auth' + path.sep + 'Profiler.json'))
                    shelljs.cp(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Auth' + path.sep + 'Profiler.json', _cdir + path.sep + 'auth' + path.sep + 'Profiler.json');

                // creating package
                console.log('  - Creating drone');

                shelljs.exec('7z a "' + PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + Manifest.namespace + '.drone" "' + PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + Manifest.namespace + '"', {
                    silent: true
                });

                // deleting temp files
                console.log('  - Deleting temp files');
                shelljs.rm('-rf', PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + Manifest.version + '.' + Manifest.build + path.sep + Manifest.namespace);

                /*
                Publishing it
                */

                if (argv.indexOf('publish') > -1) {
				
					// OLD SCHOOL
					
                    if (!ocfg.current["publish.host"]) {
                        console.log('  ! Publishing failed. No publish.host defined'.yellow);
                        return;
                    }
                    // get last drone
                    var p = glob.readdirSyncRecursive(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production');
                    if (p.length == 0) {
                        console.log('  ! Publishing failed. No drone found'.yellow);
                        return;
                    };
                    console.log('  - Publishing drone v' + p[p.length - 1].split(require('path').sep)[0]);
                    if (ocfg.current["publish.port"]) var port = ocfg.current["publish.port"];
                    else var port = 9191;

                    var req = request.post("http://" + ocfg.current["publish.host"] + ":" + port + "/upload", function (err, resp, body) {
                        console.log(err);
                        console.log(resp);
                        console.log(body);
                        if (err) {
                            console.log('  ! Publishing failed. Check your config'.yellow);
                        } else {
                            console.log('  Done.');
                        }
                    });
                    var form = req.form();
                    form.append('file', fs.createReadStream(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + p[p.length - 1]));
					
                    return;
                };


                console.log('    Done. ');



            }));

    }).pipe(fs.createWriteStream(PROJECT_HOME + path.sep + 'master.zip'));
};

function do_get() {
    var op = argv[argv.indexOf('get') + 1];

    if (process.args.sandbox) {
		var dir=PROJECT_HOME;
	} else var dir=op;

    if (fs.existsSync(__dirname + path.sep + '.repositories')) {
        var ff = JSON.parse(fs.readFileSync(__dirname + path.sep + '.repositories', 'utf-8'));
    } else {
        if (!fs.existsSync(__dirname + path.sep + 'repositories.config')) {
            var lst = [
				"Omneedia"
				, "oxpm"
			];
            fs.writeFileSync(__dirname + path.sep + 'repositories.config', lst.join('\n'));
        };
        var lst = fs.readFileSync(__dirname + path.sep + 'repositories.config', 'utf-8').split('\n');
        download_repos(lst, 0, [], function (r) {
            fs.writeFileSync(__dirname + path.sep + '.repositories', JSON.stringify(r, null, 4));
            do_get();
        });
        return;
    };
    if (process.args.sandbox) {
		if (op.indexOf('://')>-1) var ppmine=op.substr(op.lastIndexOf('/')+1,op.length); else ppmine=op;
		if (fs.existsSync(__dirname + path.sep +'..'+path.sep+'pids'+path.sep+process.args.user+'.'+ppmine+'.inf')) {
			var ff=fs.readFileSync(__dirname + path.sep +'..'+path.sep+'pids'+path.sep+process.args.user+'.'+ppmine+'.inf','utf-8').split(':');
			console.log('kill -9 '+ff[1]);
			shelljs.exec('kill -9 '+ff[1]);
		};
        if (fs.existsSync(PROJECT_HOME)) shelljs.exec("rm -Rf "+PROJECT_HOME);
    };
    console.log('  - Cloning project ' + op);
    var url = "";
    for (var i = 0; i < ff.length; i++) {
        if (ff[i].name == op) var url = ff[i].git_url;
    };
	if (process.args.sandbox) {
		if (PROJECT_GIT) url=PROJECT_GIT;
	};

    if (url == "") {
        console.log("   ! " + op + " not found".yellow);
    } else {
        var r = shelljs.exec('git clone ' + url.replace('git://github.com/', 'https://github.com/')+' '+dir, {
            silent: true
        });

        if (r.output.indexOf('fatal') > -1) {
            console.log('  ! Cloning failed'.yellow);
        } else {
            //console.log('  - Updating project');
            PROJECT_WEB = PROJECT_HOME + path.sep + "src";
			PROJECT_API = PROJECT_WEB + path.sep + "Contents" + path.sep + "Services";
			PROJECT_DEV = PROJECT_HOME + path.sep + "dev";
			PROJECT_VAR = PROJECT_HOME + path.sep + "var";
			PROJECT_SYSTEM = PROJECT_WEB + path.sep + "System";
			PROJECT_BUILD = PROJECT_HOME + path.sep + "builds";
            AppUpdate(op);
        }
    };
}

function do_push() {

	var PACKAGE_NAME=PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length-1];
	var PACKAGE_COMPANY=PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length-2].toUpperCase();	
	if (fs.existsSync(__dirname+path.sep+'.login','utf-8')) var __PID=fs.readFileSync(__dirname+path.sep+'.login','utf-8');

	if (__PID) {
		if (__PID=="") console.log("  You are not logged in. Sorry!".yellow); else {
			console.log("  Deploying package "+PACKAGE_NAME);
			if (!fs.existsSync('.tmp')) fs.mkdirSync('.tmp'); else {
				shelljs.rm('-Rf','.tmp');	
				fs.mkdirSync('.tmp');
			};
			shelljs.cp('app.manifest','.tmp'+path.sep+"app.manifest");
			shelljs.cp('app.png','.tmp'+path.sep+"app.png");
			shelljs.cp('README.md','.tmp'+path.sep+"README.md");
			shelljs.cp('.gitignore','.tmp'+path.sep+".gitignore");	
			shelljs.cp('.style','.tmp'+path.sep+".style");	
			shelljs.cp('.template','.tmp'+path.sep+".template");	
			shelljs.cp('-R','src','.tmp');
			var uniqueid = require('node-uuid');
			var unik = uniqueid.v4();	
			shelljs.exec('7z a snapshot.'+unik+' .tmp',{silent: true});
			shelljs.rm('-Rf','.tmp');
			
			if (!ocfg.current["deploy.host"]) {
				var sandbox={
					uri: "http://sandbox.omneedia.com",
					repository: "snapshot"
				};
			} else var sandbox={
				uri: ocfg.current["deploy.host"],
				repository: "snapshot"
			};
			Request({
				url: sandbox.uri+'/sandbox'
				, formData: {
					pid: __PID,
					pkg: PACKAGE_NAME,
					uri: sandbox.repository,
					file: fs.createReadStream('snapshot.'+unik)
				}
				, method: "post"
				, encoding: null
			}, function (err, resp, body) {		
				if (fs.existsSync('snapshot.'+unik)) shelljs.rm('snapshot.'+unik);
				if (err) {
					console.log('  ! Deploying failed.'.yellow);
				} else {
					var b=JSON.parse(body.toString('utf-8'));
					var manifest=PROJECT_HOME+path.sep+'app.manifest';
					if (!fs.existsSync(manifest)) {
						console.log('  ! Can\'t open manifest file.'.yellow);
						return;
					};
					Manifest=JSON.parse(fs.readFileSync(manifest));		
					if (Manifest.platform=="mobile") var mobi="/connect"; else var mobi="";
					var texto='  Done. Your project is now online at: http://'+b.url+mobi;
					console.log(texto.green);
					setTimeout(function(){
						open('http://' + b.url+mobi, 'chrome');
					},3000);
				}			
			});
		}
	} else console.log("  You are not logged in. Sorry!".yellow);
	
};

function do_push_production() {

	var PACKAGE_NAME=PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length-1];
	var PACKAGE_COMPANY=PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length-2].toUpperCase();	
	if (fs.existsSync(__dirname+path.sep+'.login','utf-8')) var __PID=fs.readFileSync(__dirname+path.sep+'.login','utf-8');
	
	if (__PID) {
		if (__PID=="") console.log("  You are not logged in. Sorry!".yellow); else {

			console.log("  Publishing package "+PACKAGE_NAME);
			if (!fs.existsSync('.tmp')) fs.mkdirSync('.tmp'); else {
				shelljs.rm('-Rf','.tmp');	
				fs.mkdirSync('.tmp');
			};
			shelljs.cp('app.manifest','.tmp'+path.sep+"app.manifest");
			shelljs.cp('app.png','.tmp'+path.sep+"app.png");
			shelljs.cp('README.md','.tmp'+path.sep+"README.md");
			shelljs.cp('.gitignore','.tmp'+path.sep+".gitignore");	
			shelljs.cp('.style','.tmp'+path.sep+".style");	
			shelljs.cp('.template','.tmp'+path.sep+".template");	
			shelljs.cp('-R','src','.tmp');
			var uniqueid = require('node-uuid');
			var unik = uniqueid.v4();	
			shelljs.exec('7z a snapshot.'+unik+' .tmp',{silent: true});
			shelljs.rm('-Rf','.tmp');
		
			if (!ocfg.current['publish.host']) {
				var prod={
					uri: "http://production.omneedia.com",
					repository: "snapshot"
				} 
			} else var prod={
				uri: ocfg.current['publish.host'],
				repository: "snapshot"
			};

			Request({
				url: prod.uri+'/production'
				, formData: {
					pid: __PID,
					pkg: PACKAGE_NAME,
					uri: prod.repository,
					file: fs.createReadStream('snapshot.'+unik)
				}
				, method: "post"
				, encoding: null
			}, function (err, resp, body) {		
				if (fs.existsSync('snapshot.'+unik)) shelljs.rm('snapshot.'+unik);
				if (err) {
					console.log('  ! Publishing failed.'.yellow);
				} else {
					var b=JSON.parse(body.toString('utf-8'));
					console.log("Done");
					console.log(b);
					/*var manifest=PROJECT_HOME+path.sep+'app.manifest';
					if (!fs.existsSync(manifest)) {
						console.log('  ! Can\'t open manifest file.'.yellow);
						return;
					};
					Manifest=JSON.parse(fs.readFileSync(manifest));		
					if (Manifest.platform=="mobile") var mobi="/connect"; else var mobi="";
					var texto='  Done. Your project is now online at: http://'+b.url+mobi;
					console.log(texto.green);
					setTimeout(function(){
						open('http://' + b.url+mobi, 'chrome');
					},3000);*/
				}			
			});
		}
	} else console.log("  You are not logged in. Sorry!".yellow);
	
};




function App_Migration_Db()
{

	console.log('  - Migrating DB Schemes');

	if (!fs.existsSync(PROJECT_HOME+path.sep+'app.manifest')) {
		PROJECT_HOME=pcwd;
		PROJECT_DEV=PROJECT_HOME+path.sep+"dev";
		PROJECT_WEB=PROJECT_HOME+path.sep+"src";
		var manifest=PROJECT_HOME+path.sep+'app.manifest';
		if (!fs.existsSync(manifest)) {
			console.log('  ! Can\'t open manifest file.'.yellow);
			return;
		};
		Manifest=JSON.parse(fs.readFileSync(manifest));
	};

	var manifest=PROJECT_HOME+path.sep+'app.manifest';
	var PACKAGE_NAME=PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length-1];
	var PACKAGE_COMPANY=PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length-2].toUpperCase();
	if (!fs.existsSync(manifest)) {
		console.log('  ! Can\'t open manifest file.'.yellow);
		return;
	};
	manifest=JSON.parse(fs.readFileSync(manifest));
	// list all databases
	var dbo=manifest.db;

	for (var i=0;i<dbo.length;i++) {


		var mydb=dbo[i];
		var c=-1;
		for (var j=0;j<MSettings.db.length;j++) {
			if (MSettings.db[j].name==mydb) c=j;
		};
		var setup=MSettings.db[c].uri;
		var cmd=['sequelize-auto'];

		setup=setup.split('://');
		cmd.push('-e '+setup[0]);
		setup=setup[1];
		cmd.push('-o "'+PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db"');
		var users=setup.split('@')[0];
		var user=users.split(':')[0];
		var password=users.split(':')[1];
		cmd.push('-u '+user);
		cmd.push('-x '+password);
		var hosts=setup.split('@')[1].split('/')[0];
		var host=hosts.split(':')[0];
		try {
			var port=hosts.split(':')[1];
		}catch(e) {
			var port=-1;
		};
		cmd.push('-h '+host);
		if (port!=-1) cmd.push('-p '+port);
		var db=setup.split('/')[1];
		cmd.push('-d '+db);

		if (!fs.existsSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.scheme'))
		{
			fs.mkdirSync(PROJECT_HOME+path.sep+'src'+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db');
			console.log(cmd.join(' '));
			shelljs.exec(cmd.join(' '));
		}
	}


};

function App_Model_Db()
{
	function _SDATA(item)
	{
		// map type to sequelize
		if (item=="int") return "DataTypes.INTEGER(11)";
		if (item=="string") return "DataTypes.STRING(255)";
		if (item=="datetime") return "DataTypes.DATE";
		if (item=="date") return "DataTypes.DATE";
		if (item=="float") return "DataTypes.FLOAT";
		if (item=="blob") return "'LONGBLOB'";
		if (item=="boolean") return "DataTypes.BOOLEAN";
		if (item=="text") return "'LONGTEXT'";
		return false;
	};
	if (setmeup) console.log("  + switch to settings ["+setmeup+"]\n");
	if (fs.existsSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-'+setmeup+'.json')) {
		var _set=fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings-'+setmeup+'.json','utf-8');
		MSettings=JSON.parse(_set);
	} else {
		var _set=fs.readFileSync(PROJECT_HOME+path.sep+'etc'+path.sep+'settings.json','utf-8');
		MSettings=JSON.parse(_set);
	};

	console.log('  - Updating DB Scheme');

	if (!fs.existsSync(PROJECT_HOME+path.sep+'app.manifest')) {
		PROJECT_HOME=pcwd;
		PROJECT_DEV=PROJECT_HOME+path.sep+"dev";
		PROJECT_WEB=PROJECT_HOME+path.sep+"src";
		var manifest=PROJECT_HOME+path.sep+'app.manifest';
		if (!fs.existsSync(manifest)) {
			console.log('  ! Can\'t open manifest file.'.yellow);
			return;
		};
		Manifest=JSON.parse(fs.readFileSync(manifest));
	};

	var manifest=PROJECT_HOME+path.sep+'app.manifest';
	var PACKAGE_NAME=PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length-1];
	var PACKAGE_COMPANY=PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length-2].toUpperCase();
	if (!fs.existsSync(manifest)) {
		console.log('  ! Can\'t open manifest file.'.yellow);
		return;
	};
	manifest=JSON.parse(fs.readFileSync(manifest));

	// list all databases
	var dbo=manifest.db;
	for (var i=0;i<dbo.length;i++) {
		var cxx=MSettings.db[i].uri;
		var host=cxx.split('@')[1].split('/')[0].split(':')[0];
		if (cxx.split('@')[1].split('/')[0].split(':').length>1) var port=cxx.split('@')[1].split('/')[0].split(':')[1]; else var port=3306;
		var user=cxx.split('://')[1].split('@')[0].split(':');
		if (user.length>1) {
			user='-u '+user[0];
			var password="-p"+user[1];
		} else {
			user='-u '+user[0];
			var password="";		
		};
		var dboo=cxx.split('@')[1].split('/')[1];
        shelljs.exec('mysql '+user+password+' -h '+host+' -P '+port+' -e "CREATE DATABASE IF NOT EXISTS ' + dboo + '"', {
        	silent: true
        });
		var mydb=dbo[i];
		for (var j=0;j<MSettings.db.length;j++) {
			if (MSettings.db[j].name==mydb) c=j;
		};
		var setup=MSettings.db[c].uri;
		if (fs.existsSync(PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.scheme')) {
			var texto=fs.readFileSync(PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.scheme','utf-8').split('}');
			// Classes
			var _IMPORT={};
			var Sequelize=require('sequelize');
			var sequelize = new Sequelize(setup);
			for (var i=0;i<texto.length-1;i++) {
				var maclasse=texto[i].split('{')[0].trim();
				var madata=texto[i].split('{')[1];
				if (madata) madata=madata.split('-'); else madata=[];
				var COM=[];
				var XCOM=[];
				COM.push("module.exports = function(sequelize, DataTypes) {");
				COM.push("	return sequelize.define('"+maclasse+"', {");
				var LINKS=[];
				for (var j=0;j<madata.length;j++) {
					var mafield=madata[j].split('\r')[0].split('\n')[0].split('\t')[0].trim();
					if (mafield) {
						var matype=mafield.split(')')[0].split('(')[1];
						mafield=mafield.split(')')[1];
						mafield=mafield.replace(/\s/g,'');
						var mytype=_SDATA(matype);
						if (mytype) {
							if (mafield!="") {
								COM.push("		"+mafield+": {");
								COM.push("			type: "+_SDATA(matype)+",");
								COM.push("			allowNull: true");
								COM.push("		},");
							}
						} else {
							XCOM.push("		"+mafield+"Id: {");
							XCOM.push("			type: DataTypes.INTEGER(11),");
							XCOM.push("			allowNull: false");
							XCOM.push("		},");
							LINKS.push({
								from: maclasse,
								as: mafield,
								tb: matype
							});
						}
					}
				};
				var ZCOM=COM;
				ZCOM.push("	})");
				ZCOM.push("};");
				var dbdir=PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db';
				if (!fs.existsSync(dbdir)) fs.mkdirSync(dbdir);
				fs.writeFileSync(dbdir+path.sep+maclasse+'.js',ZCOM.join('\n'));
				_IMPORT[maclasse]=sequelize.import(dbdir+path.sep+maclasse+'.js');

				for (var k=0;k<LINKS.length;k++) {
					_IMPORT[maclasse].belongsTo(_IMPORT[LINKS[k].tb],{as: LINKS[k].as});
				};
				console.log('		- Creating '+maclasse);
				if (XCOM.length>0) {
					COM.splice(-1,1);
					COM.splice(-1,1);
				};
				for (var z=0;z<XCOM.length;z++) COM.push(XCOM[z]);
				var ZCOM=COM;
				ZCOM.push("	})");
				ZCOM.push("};");
				var dbdir=PROJECT_HOME+path.sep+"src"+path.sep+'Contents'+path.sep+'Db'+path.sep+mydb+'.db';
				if (!fs.existsSync(dbdir)) fs.mkdirSync(dbdir);
				if (XCOM.length>0) fs.writeFileSync(dbdir+path.sep+maclasse+'.js',ZCOM.join('\n'));

			};
			sequelize.sync({force: true});
			
		};

	};

};

function AppUpdate(zzz) {
    if (argv.indexOf('db') > -1) {
        console.log('  - Updating DB');
        Update_DB();
        console.log('    Done.');
        return;
    };
    if (!zzz) zzz = '-';
    try {
        if (Manifest) {
            shelljs.exec('git config user.name "'+Manifest.author.name+'"');
            shelljs.exec('git config user.email "'+Manifest.author.mail+'"');
        };
    } catch(e) {}; 
    App_Update(zzz, function () {
        if (fs.existsSync(PROJECT_HOME + require('path').sep + 'etc' + require('path').sep + 'db.json'))
            var x = JSON.parse(fs.readFileSync(PROJECT_HOME + require('path').sep + 'etc' + require('path').sep + 'db.json'));
        else
            var x = {};
        if (fs.existsSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + 'db.json'))
            var y = JSON.parse(fs.readFileSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + 'db.json'));
        else
            var y = {};
        var is_new = -1;
        shelljs.exec('git config user.name "'+Manifest.author.name+'"');
        shelljs.exec('git config user.email "'+Manifest.author.mail+'"');
        if (!Manifest.db) Manifest.db = [];
        if (Manifest.db.length > 0) {
            for (var i = 0; i < Manifest.db.length; i++) {
                var x0, y0 = -1;
                if (x[Manifest.db[i]]) x0 = x[Manifest.db[i]];
                if (y[Manifest.db[i]]) y0 = y[Manifest.db[i]];
                if (!x0) x0 = -1;
                if (!y0) y0 = -1;
                if (is_new == -1) {
                    if ((x0 == -1) && (y0 == -1)) is_new = 0;
                    if (y0 > x0) is_new = 1;
                }
            };
        };

        if (process.args.sandbox) {
            console.log(str);
            // Change detected !!!
            var DBA = Manifest.db;
			var PACKAGE_NAME=process.argv[process.argv.indexOf('get')+1];
			if (PACKAGE_NAME.indexOf('://')>-1) PACKAGE_NAME=PACKAGE_NAME.substr(PACKAGE_NAME.lastIndexOf('/')+1,PACKAGE_NAME.length);
			
			var jsoconf=JSON.parse(fs.readFileSync(__dirname+path.sep+'..'+path.sep+'config'+path.sep+'sandbox.json'));
			var host=jsoconf.mysql.split('@')[1].split(':')[0];
			var port=3306;
			if (jsoconf.mysql.split('@')[1].split(':').length>1) port=jsoconf.mysql.split('@')[1].split(':')[1];
			var user='-u '+jsoconf.mysql.split('@')[0].split(':')[0];
			var password="";
			if (jsoconf.mysql.split('@')[0].split(':').length>1) password=' -p"'+jsoconf.mysql.split('@')[0].split(':')[1]+'"';

			for (var i=0;i<DBA.length;i++) {
				var PACKAGE_NAME=process.args.app;
				DBA[i]=process.args.user+'_'+PACKAGE_NAME+'_'+DBA[i];
				DBA[i]=DBA[i].replace(/\./g,'_');
			};
            for (var i = 0; i < DBA.length; i++) {
                var o = shelljs.exec('mysql '+user+password+' -h '+host+' -P '+port+' -e "use ' + DBA[i] + '"', {
                    silent: true
                });
                if (o.output.indexOf('denied') > -1) {
                    var str = '  ! Access denied [' + DBA[i] + '] Aborting';
                    console.log(str.yellow);
                    return;
                };
                if (o.output.indexOf('Unknown') > -1) {
                    var str = '    - Creating database [' + DBA[i] + ']';
                    console.log(str);
                    shelljs.exec('mysql '+user+password+' -h '+host+' -P '+port+' -e "CREATE DATABASE ' + DBA[i] + '"', {
                        silent: true
                    });
                } else {
                    var str = '    - Creating database [' + DBA[i] + ']';
					console.log(str);
                    shelljs.exec('mysql '+user+password+' -h '+host+' -P '+port+' -e "DROP DATABASE ' + DBA[i] + '"', {
                        silent: true
                    });
                    shelljs.exec('mysql '+user+password+' -h '+host+' -P '+port+' -e "CREATE DATABASE ' + DBA[i] + '"', {
                        silent: true
                    });
				};

			};
			App_Model_Db();
			return;
		};

        var md5 = require('md5-file');
        console.log('  - Checking remote project');
        // test if content has changed
        var test0 = shelljs.exec('git diff-index --name-only HEAD', {
            silent: true
        }).output.split('\n');
        shelljs.exec('git add --all', {
            silent: true
        });
        var test1 = shelljs.exec('git diff-index --name-only HEAD', {
            silent: true
        }).output.split('\n');
        shelljs.exec('git reset', {
            silent: true
        });
        test0.pop();
        test1.pop();
        var diff = test1.diff(test0);
        if (diff.length > 0) {
            shelljs.exec('git config --global core.autocrlf false', {
                silent: true
            });
            shelljs.exec('git add --all', {
                silent: true
            });
            var x = shelljs.exec('git log', {
                silent: true
            }).output;
            shelljs.exec('git commit -m "Update# ' + x.split('commit ').length + '"', {
                silent: true
            });
        };
        shelljs.exec('git fetch', {
            silent: true
        });
        var LOCAL = shelljs.exec('git rev-parse @', {
            silent: true
        }).output;
        var REMOTE = shelljs.exec('git rev-parse @{u}', {
            silent: true
        }).output;
        var BASE = shelljs.exec('git merge-base @ @{u}', {
            silent: true
        }).output;
        if (LOCAL == REMOTE) {
            var err = shelljs.exec('git status', {
                silent: true
            });
            if (err.output.indexOf('modified:') > -1) {
                shelljs.exec('git config --global core.autocrlf false', {
                    silent: true
                });
                shelljs.exec('git add --all', {
                    silent: true
                });
                var x = shelljs.exec('git log', {
                    silent: true
                }).output;
                shelljs.exec('git commit -m "Update# ' + x.split('commit ').length + '"', {
                    silent: true
                });
                var LOCAL = shelljs.exec('git rev-parse @', {
                    silent: true
                }).output;
                var REMOTE = shelljs.exec('git rev-parse @{u}', {
                    silent: true
                }).output;
                var BASE = shelljs.exec('git merge-base @ @{u}', {
                    silent: true
                }).output;
            } else {
                console.log('    Up-to-date.');
                return;
            }
        };

        if (LOCAL == BASE) {
            console.log('    <- Updating project');
            shelljs.exec('git config --global user.name "' + Manifest.author.name + '"', {
                silent: true
            });
            shelljs.exec('git config --global user.email ' + Manifest.author.mail, {
                silent: true
            });
            shelljs.exec('git pull origin master', {
                silent: true
            });
            // detect change beetween db.json
            if (fs.existsSync(PROJECT_HOME + require('path').sep + 'etc' + require('path').sep + 'db.json'))
                var x = JSON.parse(fs.readFileSync(PROJECT_HOME + require('path').sep + 'etc' + require('path').sep + 'db.json'));
            else
                var x = {};
            if (fs.existsSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + 'db.json'))
                var y = JSON.parse(fs.readFileSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + 'db.json'));
            else
                var y = {};
            var is_new = -1;
            if (Manifest.db.length > 0) {
                for (var i = 0; i < Manifest.db.length; i++) {
                    var x0, y0 = -1;
                    if (x[Manifest.db[i]]) x0 = x[Manifest.db[i]];
                    if (y[Manifest.db[i]]) y0 = y[Manifest.db[i]];
                    if ((x0 == -1) && (y0 == -1)) is_new = 0;
                    if (y0 > x0) is_new = 1;
                };
            };
            /*if (is_new == 1) {
                // Change detected !!!
                var DBA = Manifest.db;
                for (var i = 0; i < DBA.length; i++) {
                    var o = shelljs.exec('mysql -u root -h 127.0.0.1 -P 3306 -e "use ' + DBA[i] + '"', {
                        silent: true
                    });
                    if (o.output.indexOf('denied') > -1) {
                        var str = '  ! Access denied [' + DBA[i] + '] Aborting';
                        console.log(str.yellow);
                        return;
                    };
                    if (o.output.indexOf('1049') > -1) {
                        var str = '    - Creating database [' + DBA[i] + ']';
                        console.log(str);
                        shelljs.exec('mysql -u root -h 127.0.0.1 -P 3306 -e "CREATE DATABASE ' + DBA[i] + '"', {
                            silent: true
                        });
                        console.log('      Done.');
                    }
                    var fileme = PROJECT_HOME + require('path').sep + 'db' + require('path').sep + DBA[i] + '.scheme.sql';
                    var o = shelljs.exec('mysqldiff "jdbc:mysql://127.0.0.1:3306/' + DBA[i] + '?user=root" "' + PROJECT_HOME + require('path').sep + 'db' + require('path').sep + DBA[i] + '.scheme.sql' + '"', {
                        silent: true
                    });
                    console.log(o.output);
                    if (o.output != "") {
                        var str = '    - Updating database [' + DBA[i] + ']';
                        console.log(str);
                        var err = shelljs.exec('mysql -u root -h 127.0.0.1 -P 3306 -e "use ' + DBA[i] + ';' + o.output.split('\n').join('') + '"', {
                            silent: true
                        });
                        //console.log(err);
                        console.log('      Done.');
                    }
                }
            };*/
            console.log('\n    Done.');
        } else {
            if (REMOTE == BASE) {
                console.log('    -> Updating project');
                //Update_DB();
                shelljs.exec('git config --global core.autocrlf false', {
                    silent: true
                });
                shelljs.exec('git add --all', {
                    silent: true
                });
                var x = shelljs.exec('git log', {
                    silent: true
                }).output;
                shelljs.exec('git commit -m "Update# ' + x.split('commit ').length + '"', {
                    silent: true
                });
                if (Manifest.git != "") {
                    process.chdir(PROJECT_HOME);
                    var text = shelljs.exec('git remote', {
                        silent: true
                    });
                    if (text.output.indexOf('origin') == -1) {
                        console.log('       - Adding remote origin');
                        shelljs.exec('git remote add origin ' + Manifest.git, {
                            silent: true
                        });
                    };
                    shelljs.exec('git push -u origin master', {
                        silent: false
                    });
                    console.log('    Done.');
                } else console.log("\n  ! There is no github url in manifest".yellow);
            } else {
                if (process.argv.indexOf("--force") > -1) {
					if (process.argv[process.argv.indexOf("--force")+1]=="remote") {
						console.log('    -> Updating project');
						//Update_DB();
						shelljs.exec('git config --global core.autocrlf false', {
							silent: true
						});
						shelljs.exec('git add --all', {
							silent: true
						});
						var x = shelljs.exec('git log', {
							silent: true
						}).output;
						shelljs.exec('git commit -m "Update# ' + x.split('commit ').length + '"', {
							silent: true
						});
						if (Manifest.git != "") {
							process.chdir(PROJECT_HOME);
							var text = shelljs.exec('git remote', {
								silent: true
							});
							if (text.output.indexOf('origin') == -1) {
								console.log('       - Adding remote origin');
								shelljs.exec('git remote add origin ' + Manifest.git, {
									silent: true
								});
							};
							shelljs.exec('git push -f -u origin master', {
								silent: true
							});
							console.log('    Done.');
						} else console.log("\n  ! There is no github url in manifest".yellow);
						return;
					};
					if (process.argv[process.argv.indexOf("--force")+1]=="local") {
						console.log('    <- Updating project');
						shelljs.exec('git fetch --all', {
							silent: true
						});
						shelljs.exec('git reset --hard origin/master', {
							silent: true
						});
						console.log('    Done.');
						return;
					};
					console.log("  --force must be followed by local or remote".yellow);
                } else {
                    console.log("  Can't update repository... \n  Try to use --force remote to force updating remote repository or --force local to force updating local repository".yellow);
                }
            }
        };

        return;
    });
};

function explore_dbscheme(o) {
    var lines = o.split(';');
    var _tables = [];
    var table = [];
    var db = {};
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('CREATE TABLE') > -1) _tables.push(lines[i]);
    };
    for (var i = 0; i < _tables.length; i++) {
        var t = _tables[i];
        var _fields = t.split('CREATE TABLE ')[1].split(') ENGINE=')[0];
        var pos = _fields.indexOf('(');
        table = _fields.substr(0, pos - 1).split('`')[1];
        _fields = _fields.substr(pos + 1, _fields.length);
        console.log('[' + table + ']');
        var fields = [];
        var _fields = _fields.replace(/(?:\\[rn]|[\r\n]+)+/g, "").split(',');
        for (var j = 0; j < _fields.length; j++) {
            if ((_fields[j].indexOf('PRIMARY') == -1) && (_fields[j].indexOf('CONSTRAINT') == -1)) fields.push(_fields[j].trim());
        };
        console.log(fields);
    };
    //console.log(tables);
    return;
}

function Update_DB(cb) {
    var DBA = Manifest.db;
    var md5 = require('md5-file');
    var __INF__ = {};
    if (!fs.existsSync(PROJECT_HOME + require('path').sep + 'db')) fs.mkdirSync(PROJECT_HOME + require('path').sep + 'db');
    if (!fs.existsSync(PROJECT_HOME + require('path').sep + 'etc' + require('path').sep + 'db.json')) {
        fs.writeFileSync(PROJECT_HOME + require('path').sep + 'etc' + require('path').sep + 'db.json', '{}');
    } else {
        __INF__ = JSON.parse(fs.readFileSync(PROJECT_HOME + require('path').sep + 'etc' + require('path').sep + 'db.json'));
    };
    if (!fs.existsSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + 'db.json')) {
        fs.writeFileSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + 'db.json', '{}');
    } else {
        __INF__ = JSON.parse(fs.readFileSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + 'db.json'));
    };
    for (var i = 0; i < DBA.length; i++) {
        var o = shelljs.exec('mysql -u root -h 127.0.0.1 -P 3306 -e "use ' + DBA[i] + '"', {
            silent: true
        });
        if (o.output.indexOf('denied') > -1) {
            var str = '  ! Access denied [' + DBA[i] + '] Aborting';
            console.log(str.yellow);
            return;
        };
        if (o.output.indexOf('1049') > -1) {
            var str = '    - Creating database [' + DBA[i] + ']';
            console.log(str);
            shelljs.exec('mysql -u root -h 127.0.0.1 -P 3306 -e "CREATE DATABASE ' + DBA[i] + '"', {
                silent: true
            });
            console.log('      Done.');
        }
    };
    for (var i = 0; i < DBA.length; i++) {
        if (fs.existsSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + DBA[i] + '.scheme.sql')) fs.unlinkSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + DBA[i] + '.scheme.sql');
        if (!fs.existsSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + DBA[i] + '.scheme.sql')) {
            var str = '    - Dumping database [' + DBA[i] + ']';
            console.log(str);
            fs.writeFileSync(PROJECT_HOME + require('path').sep + 'db' + require('path').sep + DBA[i] + '.scheme.sql', '');
            var o = shelljs.exec('mysqldump --skip-comments -h 127.0.0.1 -P 3306 -uroot -d ' + DBA[i], {
                silent: true
            }).output;
            //fs.writeFileSync(PROJECT_HOME+require('path').sep+'db'+require('path').sep+DBA[i]+'.scheme.sql',o);
            explore_dbscheme(o);
            if (!__INF__[DBA[i]]) __INF__[DBA[i]] = 0;
            __INF__[DBA[i]]++;
            console.log('      Done.');
            return;
            /*var o=shelljs.exec('mysqldiff "'+PROJECT_HOME+require('path').sep+'db'+require('path').sep+DBA[i]+'.scheme.sql'+'" "jdbc:mysql://127.0.0.1:3306/'+DBA[i]+'?user=root"',{silent: true});
            fs.writeFileSync(PROJECT_HOME+require('path').sep+'db'+require('path').sep+DBA[i]+'.scheme.sql',o.output);
            if (!__INF__[DBA[i]]) __INF__[DBA[i]]=0;
            __INF__[DBA[i]]++;
            console.log('      Done.');*/
        };
    };
    //fs.writeFileSync(PROJECT_HOME+require('path').sep+'etc'+require('path').sep+'db.json',JSON.stringify(__INF__));
    //fs.writeFileSync(PROJECT_HOME+require('path').sep+'db'+require('path').sep+'db.json',JSON.stringify(__INF__));
    //if (cb) cb();
};

function App_Update(nn, cb) {
    console.log('  - Updating project');
    if (process.args.sandbox) {
		if (!fs.existsSync(PROJECT_HOME+path.sep+"app.manifest")) PROJECT_HOME+=path.sep+process.args.app;
		ROOT = path.dirname(PROJECT_HOME);
        PROJECT_WEB = PROJECT_HOME + path.sep + "src";
        PROJECT_API = PROJECT_WEB + path.sep + "Contents" + path.sep + "Services";
        PROJECT_DEV = PROJECT_HOME + path.sep + "dev";
        PROJECT_VAR = PROJECT_HOME + path.sep + "var";
        PROJECT_SYSTEM = PROJECT_WEB + path.sep + "System";
        PROJECT_BUILD = PROJECT_HOME + path.sep + "builds";
        PROJECT_NS = ROOT.split(path.sep)[ROOT.split(path.sep).length - 1];
		
		Manifest=JSON.parse(fs.readFileSync(PROJECT_HOME+path.sep+"app.manifest",'utf-8'));
	};
    // reading manifest.json
    var pcwd = process.cwd();
    if (nn == "-") pcwd += path.sep + argv[p + 1];
    else {
        if (nn != "") pcwd += path.sep + nn;
        else pcwd += path.sep + argv[p + 1];
    };

    var p = argv.indexOf('create');
    if (!fs.existsSync(PROJECT_HOME + path.sep + 'app.manifest')) {
        PROJECT_HOME = pcwd;
        PROJECT_DEV = PROJECT_HOME + path.sep + "dev";
        PROJECT_WEB = PROJECT_HOME + path.sep + "src";
        var manifest = PROJECT_HOME + path.sep + 'app.manifest';
        if (!fs.existsSync(manifest)) {
            console.log('  ! Can\'t open manifest file.'.yellow);
            return;
        };
        Manifest = JSON.parse(fs.readFileSync(manifest));
    };

    var manifest = PROJECT_HOME + path.sep + 'app.manifest';
    var PACKAGE_NAME = PROJECT_HOME.split(path.sep)[PROJECT_HOME.split(path.sep).length - 1];
    var PACKAGE_COMPANY = PACKAGE_NAME.split(".")[PACKAGE_NAME.split(".").length - 2].toUpperCase();
    if (!fs.existsSync(manifest)) {
        console.log('  ! Can\'t open manifest file.'.yellow);
        return;
    };
    manifest = JSON.parse(fs.readFileSync(manifest));

    // get api
    if (fs.existsSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Services')) {
        console.log('  - Updating API');
        if (!manifest.api) manifest.api = [];
        var api_dir = fs.readdirSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Services');
        for (var i = 0; i < api_dir.length; i++) {
            try {
                var text = fs.readFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Services' + path.sep + api_dir[i], 'utf-8');
                var idx = text.indexOf('module.exports');
                if (idx > -1) text = text.substr(idx, text.length).split('=')[1].trim().split(';')[0];
                if (text != "") {
                    if (manifest.api.indexOf(text) == -1) manifest.api.push(text);
                };
            } catch (ex) {

            }
        };
    };

    make_resources(function () {

        // updating manifest
        manifest.namespace = PACKAGE_NAME;
        if (manifest.title == "App") manifest.title = PACKAGE_NAME;
        if (manifest.description == "Template") manifest.description = "Package description goes here";
        var uniqueid = require('node-uuid');
        if (manifest.uid == "e4182ba0-d423-11e3-9c1a-0800200c9a66") manifest.uid = uniqueid.v4();
        var date = new Date();
        var year = date.getFullYear();
        if (manifest.copyright == "XXX") manifest.copyright = 'Copyright (c) ' + year + ' By ' + PACKAGE_COMPANY;
        // saving manifest
        fs.writeFileSync(PROJECT_HOME + path.sep + 'app.manifest', JSON.stringify(manifest, null, 4));

        // making settings
        Settings = {};
        Settings.DEBUG = true;
        Settings.NAMESPACE = manifest.namespace;
        Settings.TITLE = manifest.title;
        Settings.DESCRIPTION = manifest.description
        Settings.COPYRIGHT = manifest.copyright;
        Settings.TYPE = manifest.type;
        Settings.PLATFORM = manifest.targets;
        Settings.TYPE = manifest.platform;
        Settings.LANGS = manifest.langs;
        Settings.AUTH = {
            passports: [

				]
            , passport: {

            }
        };
        for (var i = 0; i < manifest.auth.length; i++) {
            var t0 = __dirname + path.sep + "auth.template" + path.sep + manifest.auth[i] + ".config";
            if (fs.existsSync(t0)) {
                t0 = JSON.parse(fs.readFileSync(t0, 'utf-8'));
                Settings.AUTH.passports.push(t0.type);
                Settings.AUTH.passport[t0.type] = {
                    caption: "PASSPORT_" + manifest.auth[i].toUpperCase()
                };
            }
        };
        var frameworks = [];
        var resources = [];
        for (var i = 0; i < manifest.frameworks.length; i++) {
            var m = manifest.frameworks[i];
            if (m.src) {
                if (m.src.constructor === Array) {
                    for (var zz = 0; zz < m.src.length; zz++) {
                        var src = m.src[zz].replace(/{version}/g, m.version);
                        src = src.replace(/{theme}/g, m.theme);
                        frameworks.push(src);
                    }
                } else {
                    var src = m.src.replace(/{version}/g, m.version);
                    src = src.replace(/{theme}/g, m.theme);
                    frameworks.push(src);
                }
            };
            if (m.res) {
                if (m.res.constructor === Array) {
                    for (var zz = 0; zz < m.res.length; zz++) {
                        var res = m.res[zz].replace(/{version}/g, m.version);
                        res = res.replace(/{theme}/g, m.theme);
                        resources.push(res);
                    }
                } else {
                    var res = m.res.replace(/{version}/g, m.version);
                    res = res.replace(/{theme}/g, m.theme);
                    resources.push(res);
                }
            };
        };
        Settings.FRAMEWORKS = frameworks;
        Settings.RESOURCES = resources;
        if (manifest.platform == "desktop") {
            Settings.RESOURCES.push(CDN + "/omneedia/res/webapp.css");
            Settings.RESOURCES.push(CDN + "/ext/res/ux.css");
            Settings.RESOURCES.push("Contents/Resources/webapp.css");
        };
        if (manifest.platform == "mobile") {
            Settings.RESOURCES.push(CDN + "/omneedia/res/mobi.css");
            Settings.RESOURCES.push("Contents/Resources/mobi.css");
        };
        if (manifest.libraries)
            Settings.LIBRARIES = manifest.libraries;
        else
            Settings.LIBRARIES = [];
        // we load omneedia.modules
        var SETMODULES = JSON.parse(require('fs').readFileSync(__dirname + require('path').sep + 'omneedia.modules', 'utf-8'));

        Settings.PATHS = {
            "Contents": "Contents/Application/app"
            , "Culture": "Contents/Culture"
            , "omneedia": CDN + "/omneedia"
            , "Ext.ux": CDN + "/ext/ux"
            , "Ext.plugin": CDN + "/ext/plugin"
            , "Ext.util": CDN + "/ext/util"
			, "Lib": "Contents/Application/app/libraries"
        };
        Settings.CONTROLLERS = [];
        for (var i = 0; i < manifest.controllers.length; i++) Settings.CONTROLLERS.push(manifest.controllers[i]);
        Settings.MODULES = SETMODULES['*'];

        Settings.LIBRARIES = [];
        if (manifest.libraries)
            for (var i = 0; i < manifest.libraries.length; i++) Settings.LIBRARIES.push(manifest.libraries[i]);

        if (manifest.platform == "desktop") {
            for (var i = 0; i < SETMODULES.desktop.length; i++) {
                Settings.MODULES.push(SETMODULES.desktop[i]);
            }
        };
        if (manifest.platform == "mobile") {
            for (var i = 0; i < SETMODULES.mobile.length; i++) {
                Settings.MODULES.push(SETMODULES.mobile[i]);
            }
        };

        for (var i = 0; i < manifest.modules.length; i++) Settings.MODULES.push(manifest.modules[i]);

        Settings.AUTHORS = [];
        Settings.API = [];
        Settings.API.push('__QUERY__');
        for (var i = 0; i < manifest.api.length; i++) Settings.API.push(manifest.api[i]);

        Settings.AUTHORS.push({
            role: "creator"
            , name: manifest.author.name
            , mail: manifest.author.mail
            , twitter: manifest.author.twitter
            , web: manifest.author.web
            , github: manifest.author.github
        });

        // REMOTES
        try {
            if (MSettings) {
                if (MSettings.remote) {
                    if (MSettings.remote.auth) {
                        Settings.REMOTE_AUTH = MSettings.remote.auth;
                    }
                    if (MSettings.remote.api) {
                        Settings.REMOTE_API = MSettings.remote.api;
                    }
                };
            };
        } catch (e) {

        };

        for (var el in manifest.team) {
            var tabx = manifest.team[el];
            var role = el;
            for (var i = 0; i < tabx.length; i++) {
                Settings.AUTHORS.push({
                    role: role
                    , name: tabx[i].name
                    , mail: tabx[i].mail
                    , twitter: tabx[i].twitter
                    , web: tabx[i].web
                    , github: tabx[i].github
                });
            };
        };

        Settings.VERSION = manifest.version;
        Settings.BUILD = manifest.build;
        Settings.CDN = CDN;

        if (manifest.blur) Settings.blur = manifest.blur;
        else Settings.blur = 1;
        
        fs.writeFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Settings.js', 'Settings=' + JSON.stringify(Settings));
        
		// OLD SCHOOL
		if (!fs.existsSync(PROJECT_HOME + path.sep + '.template')) {
			var ndx = fs.readFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'index.html', 'utf-8');
			ndx = ndx.split('<title>')[0] + '<title>' + manifest.title + '</title>' + ndx.split('</title>')[1];
			var style = fs.readFileSync(PROJECT_HOME + path.sep + '.style', 'utf-8');
			style = style.replace('{COLOR}', manifest.splashscreen.background);
			style = style.replace('{BKCOLOR}', manifest.splashscreen.color);
			style = style + '\t.omneedia-overlay{z-index: 9999999999;position:absolute;left:0px;top:0px;width:100%;height:100%;display:none;}\n';
			ndx = ndx.split('<style type="text/css">')[0] + '<style type="text/css">\n' + style + '\t</style>' + ndx.split('</style>')[1];
			fs.writeFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'index.html', ndx);
		} else {
			// NEW SCHOOL
			var tpl = fs.readFileSync(PROJECT_HOME + path.sep + '.template', 'utf-8');
			var _bt = fs.readFileSync(__dirname + path.sep + 'tpl' + path.sep + 'oa' + path.sep + 'bootstrap.tpl', 'utf-8');
			var _favicon=fs.readFileSync(__dirname + path.sep + 'tpl' + path.sep + 'oa' + path.sep + 'favicon.tpl', 'utf-8');
			var _style = fs.readFileSync(PROJECT_HOME + path.sep + '.style','utf-8');
			_style += '\t.omneedia-overlay{z-index: 9999999999;position:absolute;left:0px;top:0px;width:100%;height:100%;display:none;}\n';
			tpl = tpl.split('</head>')[0]+_favicon+'<style>'+_style+"</style></head>"+tpl.split('</head>')[1];
			tpl = tpl.split('</body>')[0]+_bt+'</body></html>';
			tpl = tpl.replace(/{COLOR}/g, manifest.splashscreen.background);
			tpl = tpl.replace(/{BKCOLOR}/g, manifest.splashscreen.color);
			tpl = tpl.replace(/{TITLE}/g, manifest.title);
			tpl = tpl.replace(/{DESCRIPTION}/g, manifest.description);
			tpl = tpl.replace(/{ICON}/g, "Contents/Resources/startup/logo.png");
			fs.writeFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'index.html',tpl);
		};
		
		
        
		if (!fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + "settings.json")) {
            if (!fs.existsSync(PROJECT_HOME + path.sep + 'etc')) fs.mkdirSync(PROJECT_HOME + path.sep + 'etc');
            var _settings = {
                auth: {}
                , db: [

					]
            };
            fs.writeFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json', JSON.stringify(_settings, null, 4));
        } else _settings = JSON.parse(fs.readFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json', 'utf-8'));

        if (Manifest.auth) {
            try {
                for (var i = 0; i < Manifest.auth.length; i++) {
                    if (fs.existsSync(__dirname + path.sep + "auth.template" + path.sep + Manifest.auth[i] + ".config")) {
                        var yauth = JSON.parse(fs.readFileSync(__dirname + path.sep + "auth.template" + path.sep + Manifest.auth[i] + ".config", 'utf-8'));
                        if (!_settings.auth[yauth.type]) _settings.auth[yauth.type] = yauth.config;
                    }
                }
            } catch (e) {

            }
        };

        if (Manifest.db) {
            try {
                var def_uri="mysql://root@127.0.0.1/";
			    if (process.args.sandbox) {
				    var jsoconf=JSON.parse(fs.readFileSync(__dirname+path.sep+'..'+path.sep+'config'+path.sep+'sandbox.json'));
				    def_uri="mysql://"+jsoconf.mysql+"/"+process.args.user+'_'+PACKAGE_NAME.replace(/\./g,'_')+'_';
			    };
                for (var i = 0; i < Manifest.db.length; i++) {
                    var _temoin = -1;
                    for (var j = 0; j < _settings.db.length; j++) {
                        if (_settings.db[j].name == Manifest.db[i]) _temoin = 1;
                    };
                    if (_temoin == -1) {
                        var str3=def_uri + Manifest.db[i].replace(/\./g,'_');
                        _settings.db.push({
                            name: Manifest.db[i]
                            , uri: str3
                        });
                    }
                }
            } catch (e) {

            }
        };

        fs.writeFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json', JSON.stringify(_settings, null, 4));

        // package.json
        var pkg = {
            name: manifest.namespace
            , description: manifest.description
            , dependencies: {}
            , license: manifest.license
        };
        for (var j = 0; j < manifest.packages.length; j++) {
            pkg.dependencies[manifest.packages[j]] = "*";
        };
        if (!fs.existsSync(PROJECT_HOME + path.sep + 'bin')) fs.mkdirSync(PROJECT_HOME + path.sep + 'bin');
        fs.writeFileSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'package.json', JSON.stringify(pkg, null, 4));

        //update readme.md
        var readme = fs.readFileSync(PROJECT_HOME + path.sep + 'README.md', 'utf-8');

        readme = readme.replace('{package.namespace}', manifest.namespace);
        readme = readme.replace('{package.title}', manifest.title);
        readme = readme.replace('{package.description}', manifest.description);
        readme = readme.replace('{package.copyright}', manifest.copyright);
        readme = readme.replace('(The MIT License)', manifest.license);

        fs.writeFileSync(PROJECT_HOME + path.sep + 'README.md', readme);

        update_npm();
        process.chdir(PROJECT_HOME);
        if (!process.args.sandbox) {
			if (!fs.existsSync(PROJECT_HOME + path.sep + '.git')) {
				console.log('  - Init local repository');
				shelljs.exec('git init', {
					silent: true
				});
				console.log('  - First commit');
				shelljs.exec('git config --global core.autocrlf false', {
					silent: true
				});
				//shelljs.exec('git config --global --unset credential.helper');
				shelljs.exec('git config --global credential.helper', {
					silent: true
				});
				shelljs.exec('git add --all', {
					silent: true
				});
				shelljs.exec('git commit -m "First commit"', {
					silent: true
				});

			} else {
				if (nn != '-') {
					console.log('  - Updating local repository');
					shelljs.exec('git config --global core.autocrlf false', {
						silent: true
					});
					shelljs.exec('git add --all', {
						silent: true
					});
					//shelljs.exec('git status');
					var x = shelljs.exec('git log', {
						silent: true
					}).output;

					shelljs.exec('git commit -m "Update# ' + x.split('commit ').length + '"', {
						silent: true
					});
				}
			};
		};
        console.log('    Done.');
        console.log('');
        if (cb) cb();
    });


};

var figlet = require('figlet');

figlet(' omneedia', {
    //font: 'ANSI Shadow',
    font: "Ogre"
}, function (err, art) {

    if (err) {
        var err = '\n  !!! GURU MEDITATION !!! \n' + err;
        console.log(err.red);
        return;
    };
    console.log('\n        Omneedia Builder v' + $_VERSION);
    console.log(art.cyan);
	
	if (process.args.welcome) return;
	
    if (argv.length <= 2) {
        console.log('    Usage: omneedia command [options]'.yellow);
        console.log('');
        console.log('');
        console.log('    Global commands: '.green);
        console.log('    create name --type [desktop|mobile]\t\tCreate a project'.white);
        console.log('    config\t\t\t\t\tDisplay config'.white);
        console.log('    config set [namespace] [value]\t\tSet setting=value'.white);
        console.log('    config unset [namespace]\t\t\tUnset setting'.white);
        console.log('    config load [name]\t\t\t\tLoad config [name]'.white);
        console.log('    config update\t\t\t\tUpdate current config'.white);
        console.log('    config save [name]\t\t\t\tSave current config to [name]'.white);
        console.log('');
        console.log('    Project commands: '.green);
        console.log('    update\t\t\t\t\tUpdate project'.white);
        console.log('    start\t\t\t\t\tStart drone app'.white);
        console.log('    build [platform]\t\t\t\tBuild project'.white);
        console.log('');
        console.log('    Samples: '.green);
        console.log('    omneedia config set proxy http://my.proxy.com:8080/'.white);
    };
		
	if (process.args.mysql) {
		
		var userdir=OS.homedir()+path.sep+"omneedia";
		if (!fs.existsSync(userdir)) fs.mkdirSync(userdir);
		var userdirdata=userdir+path.sep+"db";
		if (!fs.existsSync(userdirdata)) fs.mkdirSync(userdirdata);
		var pos=argv.indexOf('--mysql')+1;
		var def=argv[pos];
		var pro=argv[pos+1];
		if (!pro) pro="default";
		userdirdata=userdirdata+path.sep+pro;
		if (!fs.existsSync(userdirdata)) fs.mkdirSync(userdirdata);
		var data=userdirdata+path.sep+"data";
		if (!fs.existsSync(data)) fs.mkdirSync(data);
		var myini=[];
		
		myini.push('[mysqld]');
		myini.push('sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES');
		myini.push('max_allowed_packet=160M');
		myini.push('innodb_force_recovery=0');
		myini.push('port=3306');
		myini.push('federated');    
		fs.writeFileSync(userdirdata+path.sep+"my.ini",myini.join('\r\n'));
		
		if (!fs.existsSync(data+path.sep+"auto.cnf")) {
			shelljs.exec(__dirname+path.sep+'mysql'+path.sep+'bin'+path.sep+'mysqld --defaults-file="'+userdirdata+path.sep+'my.ini" -b "'+__dirname+path.sep+'mysql'+'" --datadir="'+data+'" --initialize-insecure');
		};
		
		var isWin = /^win/.test(process.platform);
		
		if (def=="backup") {
			var manifest = PROJECT_HOME + path.sep + 'app.manifest';
			if (fs.existsSync(manifest)) {
				var manifest=JSON.parse(fs.readFileSync(manifest));
				if (!fs.existsSync(PROJECT_HOME + path.sep +'src'+path.sep+'Contents'+path.sep+'db')) fs.mkdirSync(PROJECT_HOME + path.sep +'src'+path.sep+'Contents'+path.sep+'db');
				for (var i=0;i<manifest.db.length;i++) {
					console.log("	- Dump "+manifest.db[i]);
					shelljs.exec('mysqldump -h 127.0.0.1 --single-transaction -u root '+manifest.db[i]+' > "'+PROJECT_HOME + path.sep +'src'+path.sep+'Contents'+path.sep+'db'+path.sep+manifest.db[i]+'.dump"');
				};
				console.log('	Done.');
			} else {
			
			};
			return;
		}
		
		if (def=="start") {
			if (!isWin) {
				var pid=userdir+path.sep+"db"+path.sep+".pid";
				shelljs.exec('nohup "'+__dirname+path.sep+'mysql'+path.sep+'bin'+path.sep+'mysqld" --defaults-file="'+userdirdata+path.sep+'my.ini" -b "'+__dirname+path.sep+'mysql" --datadir="'+data+'" &>"'+userdirdata+path.sep+"my.log"+'" & echo $! > "'+pid+'"',{silent: true});
				var pido=fs.readFileSync(pid,'utf-8');
				fs.writeFileSync(pid,pido.trim());
				var msg='  - mySQL server running [PID '+pido.trim()+']\n';
			} else {
				var pid=userdir+path.sep+"db"+path.sep+".pid";
				var _cmd=__dirname+path.sep+'mysql'+path.sep+'bin'+path.sep+'mysqld --defaults-file='+userdirdata+path.sep+'my.ini -b '+__dirname+path.sep+'mysql --datadir='+data;
				var cmd='start /b '+_cmd;
				fs.writeFileSync(userdirdata+path.sep+'mysql.cmd',cmd);
				var spawn=require('child_process').exec;
				spawn(userdirdata+path.sep+'mysql.cmd',[],{detached: false});
				shelljs.exec("Wmic /output:\""+pid+"\" process where (CommandLine like '%mysqld%') get Name,CommandLine,ProcessId");
				var _pid=fs.readFileSync(pid,'ucs2').split('\r\n');
				var pido=-1;
				for (var i=0;i<_pid.length;i++) {
					if(_pid[i].indexOf("my.ini")>-1) var pido=i;
				};
				if (pido!=-1) {
					pido=_pid[pido].substr(_pid[pido].lastIndexOf('mysqld.exe')+11,255).trim();
					fs.writeFileSync(pid,pido);
					var msg='  - mySQL server running [PID '+pido+']\n';
				} else {
					var msg='  ! mySQL not running\n';
					console.log(msg.yellow);
					return;
				}
			};
			console.log(msg.green);	
		};
		
		if (def=="stop") {
			var pid=userdir+path.sep+"db"+path.sep+".pid";
			if (fs.existsSync(pid)) {
				var _pid=fs.readFileSync(pid,'utf-8');
				if (!isWin) {
					shelljs.exec('kill -9 '+_pid);
				} else {
					shelljs.exec('taskkill /F /PID '+_pid,{silent:true});
				};
				console.log('  - mySQL service stopped.\n'.green);
				fs.unlinkSync(pid);
			} else {
				console.log('  ! mySQL server seems not running\n'.yellow);	
			};
		};		

		return;
		
	};

    if (argv.indexOf('get') > -1) {
        do_get();
        return;
    };
	
	if (argv.indexOf('login')>-1) {
		if (fs.existsSync(__dirname+path.sep+'.login')) {console.log('  You are already logged in.\n'.yellow);return;}
		var sandbox="http://sandbox.omneedia.com/login";
		
		if (ocfg.current['deploy.host']) var sandbox="http://"+ocfg.current['deploy.host']+"/login";	
		var promptly=require('promptly');
		promptly.prompt('User ID: ', function (err, UserID) {
			promptly.password('Password: ', function (err, Pass) {
				Request({
					url: sandbox
					, form: {
						login: UserID,
						password: Pass
					}
					, method: "post"
					, encoding: null
				}, function (err, resp, body) {
					var response=JSON.parse(body.toString('utf-8'));
					if (response.success) {
						fs.writeFileSync(__dirname+path.sep+".login",response.pid);
						console.log('\n  You have been successfully logged in...\n'.green);
						console.log('');
					} else {
						console.log('\n  Login failed.\n'.yellow);	
					};
				});					
			});
		});
		return;
	};
	if (argv.indexOf('logout')>-1) {
		if (fs.existsSync(__dirname+path.sep+".login")) shelljs.rm(__dirname+path.sep+".login");
		console.log("Logged out.\n".green);
		return;
	};
    if (argv.indexOf('upgrade') > -1) {
        console.log('  - Upgrading omneedia');
        if (!fs.existsSync(__dirname + path.sep + 'repositories.config')) {
            var lst = [
				"Omneedia"
				, "oxpm"
			];
            fs.writeFileSync(__dirname + path.sep + 'repositories.config', lst.join('\n'));
        };
        var lst = fs.readFileSync(__dirname + path.sep + 'repositories.config', 'utf-8').split('\n');
        download_repos(lst, 0, [], function (r) {
            fs.writeFileSync(__dirname + path.sep + '.repositories', JSON.stringify(r, null, 4));
            process.chdir(__dirname);
			shelljs.exec('git fetch --all', {
				silent: true
			});
			shelljs.exec('git reset --hard origin/master', {
				silent: true
			});
			shelljs.exec('npm install', {
			    silent: true
			});
            console.log('  Done.');
        });
        return;

    };

    // Config interface
    if (argv.indexOf('config') > -1) {
        if (argv.indexOf('set') > -1) {
            cfg.set(argv[argv.indexOf('set') + 1], argv[argv.indexOf('set') + 2]);
        };
        if (argv.indexOf('unset') > -1) {
            cfg.unset(argv[argv.indexOf('unset') + 1]);
        };
        if (argv.indexOf('update') > -1) {
            cfg.update(argv[argv.indexOf('unset') + 1]);
        };
        if (argv.indexOf('load') > -1) {
            cfg.load(argv[argv.indexOf('load') + 1]);
        };
        if (argv.indexOf('save') > -1) {
            cfg.save(argv[argv.indexOf('save') + 1]);
        };
        if (!fs.existsSync(__dirname + path.sep + ".config")) var config = {
            current: ""
        };
        else var config = JSON.parse(fs.readFileSync(__dirname + path.sep + ".config", 'utf-8'));
        console.log('  Config'.yellow);
        console.log('  ------'.yellow);
        console.log('  ' + JSON.stringify(config.current, null, 4));
        console.log('');
        return;
    };

    // add interface
    if (argv.indexOf('add') > -1) {

        return;
    };

	if (argv.indexOf('updatedb')>-1)
	{
		App_Model_Db();
		return;
	};

	if (argv.indexOf('importdb')>-1)
	{
		App_Migration_Db();
		return;
	};

    // launcher
    if (process.args.code) {
        var exec = require('child_process').spawn;
        var os = require('os');
        if (os.platform().indexOf('darwin') > -1) exec(__dirname + path.sep + 'brackets' + path.sep + 'Brackets.app'+ path.sep +'Contents'+ path.sep +'Resources'+ path.sep +'brackets.sh', [PROJECT_HOME]).unref();
        else if (os.platform().indexOf('win') > -1) {
			var _cmd=__dirname + path.sep + 'brackets' + path.sep + 'BracketsPortable %1';
			var cmd='start /b '+_cmd;
			fs.writeFileSync(__dirname+path.sep+'brackets.cmd',cmd);
			var spawn=require('child_process').spawn;
			spawn(__dirname+path.sep+'brackets.cmd',[PROJECT_HOME],{detached: false});			
			//exec(__dirname + path.sep + 'brackets' + path.sep + 'BracketsPortable', [PROJECT_HOME]);
		}
    };

    // Create interface
    if (argv.indexOf('create') > -1) {
        // create a view
        if (argv.indexOf('view') > -1) {
            var p = argv.indexOf('view');
            var type = argv[p + 1];
            var name = argv[p + 2];
            if (!name) {
                name = type;
                type = "panel";
            };
            if (!type) {
                var str = '  ! Syntax error';
                str += '  ! Ex: oa create view panel VMyPanel';
                console.log(str.yellow);
                return;
            }
            if (!fs.existsSync(__dirname + require('path').sep + "tpl" + require('path').sep + 'view' + require('path').sep + type + ".js")) {
                var str = '  ! type ' + type + ' not found!';
                console.log(str.yellow);
                return;
            } else type = fs.readFileSync(__dirname + require('path').sep + "tpl" + require('path').sep + 'view' + require('path').sep + type + ".js", 'utf-8');
            var _path = PROJECT_HOME + require('path').sep + 'src' + require('path').sep + 'Contents' + require('path').sep + 'Application' + require('path').sep + 'app' + require('path').sep + 'view';
            _path += require('path').sep + name.replace('.', require('path').sep) + '.js';
            var dir = require('path').dirname(_path);
            mkdir(dir);
            type = type.replace('$namespace', name);
            var sname = "";
            for (var k = 0; k < name.split('.').length; k++) {
                sname += name.split('.')[k].capitalizeFirstLetter();
            };
            type = type.replace('$name', sname);
            fs.writeFileSync(_path, type);
            var str = '   - View ' + name + ' created.';
            console.log(str.cyan);
            return;
        };

        var p = argv.indexOf('create');
        if (!argv[p + 1]) {
            console.log('');
            console.log('  ! project namespace must be like com.example.demo'.yellow);
            console.log('');
            return;
        };

        console.log('  - Create package ' + argv[p + 1]);
        PROJECT_HOME = process.cwd();

        if (!fs.existsSync(PROJECT_HOME + path.sep + argv[p + 1] + path.sep + 'manifest.xml')) {
            var dots = argv[p + 1].split('.').length;
            if (dots < 3) {
                console.log('');
                console.log('  ! project namespace must be like com.example.demo'.yellow);
                console.log('');
                return;
            };

            if (process.argv.indexOf('--type') == -1) {
                console.log('');
                console.log('  ! project type is undefined (desktop or mobile)'.yellow);
                console.log('  ! Ex: omneedia create com.mycompany.myapp --type desktop'.yellow);
                console.log('');
                return;
            };

            if (process.argv.indexOf('desktop') > -1) {
		var vve="";
		if (process.args.v2) vve="v2";
                console.log('  - Downloading desktop template '+vve);
                Request('https://github.com/Omneedia/tpl.omneedia.webapp'+vve+'/archive/master.zip').on('end', function () {
                    console.log('  - Expanding desktop template');
                    var readStream = fs.createReadStream(PROJECT_HOME + path.sep + 'master.zip');
                    var writeStream = require('fstream').Writer(PROJECT_HOME);
                    readStream
                        .pipe(unzip.Parse())
                        .pipe(writeStream.on('close', function () {
                            glob.copyDirSyncRecursive(PROJECT_HOME + path.sep + 'tpl.omneedia.webapp'+vve+'-master', PROJECT_HOME + path.sep + argv[p + 1]);
                            shelljs.rm(PROJECT_HOME + path.sep + 'master.zip');
                            glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'tpl.omneedia.webapp'+vve+'-master');
                            console.log('  - Project ' + argv[p + 1] + ' created');
                            App_Update(argv[p + 1]);
                        }));

                }).pipe(fs.createWriteStream(PROJECT_HOME + path.sep + 'master.zip'));
            };

            if (process.argv.indexOf('mobile') > -1) {
		var vve="";
		if (process.args.v2) vve="v2";
                console.log('  - Downloading mobile template '+vve);
                Request('https://github.com/Omneedia/tpl.omneedia.mobile'+vve+'/archive/master.zip').on('end', function () {
                    console.log('  - Expanding mobile template');
                    var readStream = fs.createReadStream(PROJECT_HOME + path.sep + 'master.zip');
                    var writeStream = require('fstream').Writer(PROJECT_HOME);
                    readStream
                        .pipe(unzip.Parse())
                        .pipe(writeStream.on('close', function () {
                            glob.copyDirSyncRecursive(PROJECT_HOME + path.sep + 'tpl.omneedia.mobile'+vve+'-master', PROJECT_HOME + path.sep + argv[p + 1]);
                            shelljs.rm(PROJECT_HOME + path.sep + 'master.zip');
                            glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'tpl.omneedia.mobile'+vve+'-master');
                            console.log('  - Project ' + argv[p + 1] + ' created');
                            App_Update(argv[p + 1]);
                        }));

                }).pipe(fs.createWriteStream(PROJECT_HOME + path.sep + 'master.zip'));

            };

        } else console.log("  ! Package namespace already exists".yellow);
        return;
    };


    if (argv.length == 2) {
        // display help
        //program.help();
        return;
    } else {
        if (PROJECT_HOME == "-") {
            console.error('  ! omneedia must be run under the project directory.'.yellow);
            return;
        }
    };

    if (argv.indexOf('update') > -1) AppUpdate();
	
	if (argv.indexOf('deploy')>-1) {
		do_push();
		return;
	};
	
    if (argv.indexOf('clean') > -1) {
        if (require('fs').existsSync(PROJECT_HOME + path.sep + 'bin')) glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'bin');
        if (require('fs').existsSync(PROJECT_HOME + path.sep + 'dev')) glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'dev');
        if (require('fs').existsSync(PROJECT_HOME + path.sep + 'builds')) glob.rmdirSyncRecursive(PROJECT_HOME + path.sep + 'builds');
        console.log('    Clean.');
    }

    if (argv.indexOf('cleanres') > -1) {
        if (fs.existsSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources.css")) fs.unlinkSync(PROJECT_DEV + path.sep + "webapp" + path.sep + "Resources.css");
        console.log('    Cleaned Resources.');
    }

    // Builder interface
    if (argv.indexOf('build') > -1) {
        PROCESS_NATIVE = -1;
        PROCESS_ANDROID = -1;
        PROCESS_IOS = -1;
        PROCESS_WP8 = -1;
        PROCESS_WP7 = -1;
        PROCESS_PRODUCTION = -1;

        App_Update('', function () {

            if (process.argv.indexOf('android') > -1) {
                PROCESS_NATIVE = true;
                PROCESS_ANDROID = true;
            };
            if (process.argv.indexOf('ios') > -1) {
                PROCESS_NATIVE = true;
                PROCESS_IOS = true;
            };
            if (process.argv.indexOf('wp7') > -1) {
                PROCESS_NATIVE = true;
                PROCESS_WP7 = true;
            };
            if (process.argv.indexOf('wp8') > -1) {
                PROCESS_NATIVE = true;
                PROCESS_WP8 = true;
            };
            PROCESS_CUSTOM = -1;
            if (process.argv.indexOf('production') > -1) {
                PROCESS_NATIVE = false;
                PROCESS_PRODUCTION = true;
                var p = glob.readdirSyncRecursive(PROJECT_HOME + path.sep + 'etc');
                for (var z = 0; z < p.length; z++) {
                    try {
                        var cc = p[z].split('settings-')[1].split('.json')[0];
                        if (process.argv.indexOf(cc) > -1) PROCESS_CUSTOM = cc;
                    } catch (e) {

                    }
                }
            };

            if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev');
            if (!fs.existsSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'webapp')) fs.mkdirSync(PROJECT_HOME + path.sep + 'dev' + path.sep + 'webapp');
            var datetime = new Date();
            Settings.BUILD = Settings.BUILD * 1 + 1;
            Manifest.build = Settings.BUILD;
            Settings.BUILD_DATE = datetime;

            if (MSettings.remote) {
                if (MSettings.remote.auth) {
                    Settings.REMOTE_AUTH = MSettings.remote.auth;
                };
                if (MSettings.remote.api) {
                    Settings.REMOTE_API = MSettings.remote.api;
                };
            };
            fs.writeFileSync(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Settings.js', "Settings = " + JSON.stringify(Settings, null, 4));

            // ADD TO MANIFEST BUILD SETTINGS
            fs.writeFileSync(PROJECT_HOME + path.sep + 'app.manifest', JSON.stringify(Manifest, null, 4));

            if (PROCESS_PRODUCTION == -1) make_bootstrap();
            else {
                // si c'est une application mobile
                // build production crée le worker sans builder le client natif
                // si c'est une webapp
                // build production crée le worker et on build le client
                if (Settings.TYPE == "mobile") {
                    build_production();
                } else make_bootstrap();
            }

        });

    };

    if (argv.indexOf('publish') > -1) {
		// new school
		if (argv.indexOf('build')==-1) do_push_production();
		/*
        if (argv.indexOf('build') > -1) return;
        if (!ocfg.current["publish.host"]) {
            console.log('  ! Publishing failed. No publish.host defined'.yellow);
            return;
        }
        // get last drone
        var p = glob.readdirSyncRecursive(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production');
        if (p.length == 0) {
            console.log('  ! Publishing failed. No drone found'.yellow);
            return;
        };
        console.log('  - Publishing drone v' + p[p.length - 1].split(require('path').sep)[0]);
        if (ocfg.current["publish.port"]) var port = ocfg.current["publish.port"];
        else var port = 9191;
        var req = request.post("http://" + ocfg.current["publish.host"] + ":" + port + "/upload", function (err, resp, body) {
            if (err) {
                console.log('  ! Publishing failed. Check your config'.yellow);
                console.log(err);
            } else {
                console.log('  Done.');
            }
        });
        var form = req.form();
        form.append('file', fs.createReadStream(PROJECT_HOME + path.sep + 'builds' + path.sep + 'production' + path.sep + p[p.length - 1]));
		*/
        return;
    };

    function process_api(d, i, batch, res) {
        function uniq(a) {
            var prims = {
                    "boolean": {}
                    , "number": {}
                    , "string": {}
                }
                , objs = [];

            return a.filter(function (item) {
                var type = typeof item;
                if (type in prims)
                    return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
                else
                    return objs.indexOf(item) >= 0 ? false : objs.push(item);
            });
        };

        if (i >= d.length) {
            var str = JSON.stringify(batch, 'utf8');
            res.end(str);
        } else {
            var api = d[i];
            try {
                var name = require.resolve(api.action);
                delete require.cache[name];
            } catch (e) {};
            if (api.action == "__QUERY__")
                var x = require(__dirname + path.sep + "node_modules" + path.sep + "db" + path.sep + "__QUERY__.js");
            else {
                var x = require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + api.action + ".js");
                x.temp = function (ext) {
                    var uid = Math.uuid();
                    var dir = PROJECT_HOME + path.sep + "tmp" + path.sep;
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                    var filename = uid;
                    if (ext) filename += "." + ext;
                    return {
                        uid: uid
                        , filename: filename
                        , directory: PROJECT_HOME + path.sep + "tmp"
                        , path: PROJECT_HOME + path.sep + "tmp" + path.sep + filename
                        , url: "/tmp/" + filename
                    };
                };
				x.IO={
                    send: function(uri,data,users) {
                        var o={
                            uri: uri,
                            data: data,
                            users: users
                        };
                        var socket = require('socket.io-client')('http://' + getIPAddress() + ':' + Manifest.server.port);
                        if (uri.indexOf("#")>-1) socket.emit("#send",JSON.stringify(o));
                    }
				};
                x.getFile = function(filename,cb) {
                    if (fs.existsSync(filename)) cb(filename); else cb(false);
                };
                x.using = function (unit) {
                    if (fs.existsSync(__dirname + path.sep + 'node_modules' + path.sep + unit))
                        return require(__dirname + path.sep + 'node_modules' + path.sep + unit);
                    else {
                        if (fs.existsSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit))
                            return require(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit);
                        else {
                            return require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + unit.replace(/\//g, require('path').sep));
                        }
                    }
                };
            };

            var myfn = x[api.method].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
            var response = {};
            response.params = [];
            for (var j = 0; j < myfn.length; j++) {
                if (myfn[j].trim() != "") response.params[response.params.length] = myfn[j].trim();
            };

            var p = [];
            for (var e = 0; e < response.params.length - 1; e++) {
                p.push(api.data[e]);
            };

            p.push(function (err, response) {
                if (err) {
                    batch.push({
                        action: api.action
                        , method: api.method
                        , result: response
                        , message: err.message
                        , data: err
                        , tid: api.tid
                        , type: "rpc"
                    });
                } else {
                    err = null;
                    batch.push({
                        action: api.action
                        , method: api.method
                        , result: response
                        , tid: api.tid
                        , type: "rpc"
                    });
                };
                process_api(d, i + 1, batch, res);
            });
            try {
                x[api.method].apply({}, p);
            } catch (e) {
                batch.push({
                    type: 'exception'
                    , action: api.action
                    , method: api.method
                    , message: e.message
                    , data: e
                });
                process_api(d, i + 1, batch, res);
            }
        }
    };

    function processRoute(req, resp) {
        var data = req.body;
        var d = [];
        if (data instanceof Array) {
            d = data;
        } else {
            d.push(data);
        };
        process_api(d, 0, [], resp);
    };

    if (argv.indexOf('start') > -1) {
				
        if (setmeup) {
			if (setmeup.indexOf('--')>-1) {
				setmeup=false; 
			} else console.log("  + switch to settings [" + setmeup + "]\n");
		};

        var app = express();

        // initialize socket.io
        var http = require('http').createServer(app);
        app.IO = require('socket.io').listen(http);

        app.IO.on('connection', function (socket) {
            var response = {
                omneedia: {
                    engine: $_VERSION
                }
                , session: socket.id
                , pid: _SESSION_
            };
			OASocketonAuth=function(response) {
                var r=JSON.parse(response);
				if (!Clients.uid[r.uid]) Clients.uid[r.uid]=[];
				if (!Clients.mail[r.mail]) Clients.mail[r.mail]=[];
				if (Clients.uid[r.uid].indexOf(socket.id)==-1) Clients.uid[r.uid].push(socket.id);
				if (Clients.mail[r.mail].indexOf(socket.id)==-1) Clients.mail[r.mail].push(socket.id);
				app.IO.sockets.to(socket.id).emit("#auth",response);
			};
            socket.on('#create', function (room) {
				console.log("- "+room+" joined.");
                socket.join(room);
            });
            socket.on('#send', function (o) {
				o=JSON.parse(o);
                console.log(o);
				if (!o.users) {
					// on envoie qu'à la session en cours
					app.IO.sockets.to(socket.id).emit(o.uri,o.data);
				} else {
					if( Object.prototype.toString.call( o.users ) === '[object Array]' ) {
						// on envoie qu'aux sockets des élus
						for (var i=0;i<o.users.length;i++) {
							var _id=o.users[i];
							if (Clients.uid[_id]) {
								var tab=Clients.uid[_id];
								for (var j=0;j<tab.length;j++) {
									app.IO.sockets.to(tab[j]).emit(o.uri,o.data);
								}
							};
							if (Clients.mail[_id]) {
								var tab=Clients.mail[_id];
								for (var j=0;j<tab.length;j++) app.IO.sockets.to(tab[j]).emit(o.uri,o.data);
							};
						};
					} else {
						if (o.users=="*") {
							// on broadcast à tout le monde connecté à l'application
							app.IO.sockets.emit(o.uri,o.data);
						}
					}
				};
            });

            socket.emit('session', JSON.stringify(response));

        });

		if (setmeup) {
			if (fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings-'+setmeup+'.json')) {
				var _set = fs.readFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings-'+setmeup+'.json', 'utf-8');
				MSettings = JSON.parse(_set);
			} else {
				var str=' '+setmeup+" config not found.";
				console.log(str.yellow);
				return;
			}
		} else {
			if (fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json')) {
				var _set = fs.readFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json', 'utf-8');
				MSettings = JSON.parse(_set);
			} else {
				var str=" config not found.";
				console.log(str.yellow);
				return;
			}
		}

		if (process.args.sandbox) {
			console.log = (function () {
				var log = console.log;
				return function (log) {
					app.IO.sockets.emit('log', log);
				}
			})(console);

			console.info = function () {
				app.IO.sockets.emit('info', str);
			};
			console.warn = function () {
				app.IO.sockets.emit('warn', str);
			};
			console.error = function () {
				app.IO.sockets.emit('error', str);
			};
			console.debug = function () {
				app.IO.sockets.emit('debug', str);
			};
		};

        /*
        setup_settings
        */

        var bodyParser = require('body-parser');

        app.use(bodyParser.json({
            limit: '5000mb'
            , extended: true
        }));
        app.use(bodyParser.urlencoded({
            limit: '5000mb'
            , extended: true
        }));

		var multer = require('multer');

		var storage = multer.diskStorage({
			destination: function (req, file, cb) {
				if (!fs.existsSync(PROJECT_HOME+ path.sep +'bin')) fs.mkdirSync(PROJECT_HOME+ path.sep +'bin');
				if (!fs.existsSync(PROJECT_HOME+ path.sep +'bin'+ path.sep + 'uploads')) fs.mkdirSync(PROJECT_HOME+ path.sep +'bin'+ path.sep + 'uploads');
				cb(null, PROJECT_HOME+ path.sep +'bin'+ path.sep + 'uploads')
			},
			filename: function(req,file,cb) {
				cb(null,Math.uuid()+file.originalname.substr(file.originalname.lastIndexOf('.'),file.originalname.length));
			}
		});

		app.UPLOAD=multer({ storage: storage });
		app.upload=app.UPLOAD;

        app.use(require('cookie-parser')());

        if (process.argv.indexOf('--debug') > -1) app.use(require('morgan')('dev'));
        app.use(require('cors')());

        app.use(require('compression')());
        app.use(express.static(PROJECT_WEB));

        if (fs.existsSync(__dirname + path.sep + ".." + path.sep + "omneedia.github.io" + path.sep + "cdn"))
            app.use('/cdn', express.static(__dirname + path.sep + ".." + path.sep + "omneedia.github.io" + path.sep + "cdn"));

        var Session = require('express-session');

        var SessionStore = require('session-file-store')(Session);
		if (!fs.existsSync(__dirname+path.sep+'tmp')) fs.mkdirSync(__dirname+path.sep+'tmp');
		if (!fs.existsSync(__dirname+path.sep+'tmp'+path.sep+'sessions')) fs.mkdirSync(__dirname+path.sep+'tmp'+path.sep+'sessions');
		var session = Session({store: new SessionStore({path: __dirname+path.sep+'tmp'+path.sep+'sessions'}), secret: 'pass', resave: true, saveUninitialized: true});

		app.use(session);


        // init session

        app.use(require('errorhandler')({
                dumpExceptions: true
                , showStack: true
            }))

        app.use("/src", express.static(PROJECT_HOME + path.sep + 'src' + path.sep));

        // MOBILE STUFF

        if (Manifest.platform == "mobile") {

            app.get("/index", function (req, res) {
                res.set('Content-Type', 'text/html');

                // on fabrique une version cordova de index.html en incluant tous les plugins
                var index = fs.readFileSync(PROJECT_WEB + path.sep + "index.html", "utf-8");

                var script = '<script type=text/javascript src="cordova.js"></script>';
                index = index.replace('</body>', script + '</body>');
                index = index.replace('<head>', '<head><script type=text/javascript src="http://' + getIPAddress() + ':' + Manifest.debug.port + '/target/target-script-min.js#anonymous"></script>');
                res.send(index);
            });
            // MOBILE APPS
            app.use("/connect", express.static(__dirname + path.sep + "scanner"));
            app.use("/plugins", express.static(__dirname + path.sep + "scanner" + path.sep + "plugins"));
            app.get('/plugins/(*)', function (req, res) {
                var url = req.originalUrl.split('/plugins/')[1];
                var dir = __dirname + path.sep + "scanner" + path.sep + "plugins" + path.sep;
                var ua = req.headers['user-agent'];
                if (/Windows NT/.test(ua)) {
                    console.log('browser');
                    dir += "browser";
                };
                if (/(Intel|PPC) Mac OS X/.test(ua)) {
                    console.log('browser');
                    console.log('browser');
                    dir += "browser";
                };
                if (/like Mac OS X/.test(ua)) {
                    console.log('IOS');
                    dir += "ios";
                };
                if (/Android/.test(ua)) {
                    console.log('ANDROID');
                    console.log('IOS');
                    dir += "android";
                };
                res.end(fs.readFileSync(dir + path.sep + url, "utf-8"));
                return;
            });
            app.get('/cordova.js', function (req, res) {
                res.set('Content-Type', 'text/javascript');
                var ua = req.headers['user-agent'];
                if (/Windows NT/.test(ua)) {
                    console.log('browser');
                    res.end(fs.readFileSync(__dirname + path.sep + "scanner" + path.sep + "cordova" + path.sep + "cordova.browser.js", "utf-8"));
                    return;
                };
                if (/(Intel|PPC) Mac OS X/.test(ua)) {
                    console.log('browser');
                    res.end(fs.readFileSync(__dirname + path.sep + "scanner" + path.sep + "cordova" + path.sep + "cordova.browser.js", "utf-8"));
                    return;
                };
                if (/like Mac OS X/.test(ua)) {
                    console.log('IOS');
                    res.end(fs.readFileSync(__dirname + path.sep + "scanner" + path.sep + "cordova" + path.sep + "cordova.ios.js", "utf-8"));
                    return;
                };
                if (/Android/.test(ua)) {
                    console.log('ANDROID');
                    res.end(fs.readFileSync(__dirname + path.sep + "scanner" + path.sep + "cordova" + path.sep + "cordova.android.js", "utf-8"));
                    return;
                };

            });
            app.get('/cordova_plugins.js', function (req, res) {
                res.set('Content-Type', 'text/javascript');
                res.send(fs.readFileSync(__dirname + path.sep + "scanner" + path.sep + "cordova_plugins.js", "utf-8"));
            });
            app.get('/qrcode', function (req, res) {
                res.send(generateCode('http://' + getIPAddress() + ':' + Manifest.server.port + '/index'));
            });
        };


        /**
         *
         * AUTH STRATEGY
         *
         **/

        try {
            if (MSettings) {}
        } catch (ex) {
            if (!fs.existsSync(PROJECT_HOME + path.sep + 'etc')) {
                fs.mkdirSync(PROJECT_HOME + path.sep + 'etc');
            };
            if (!fs.existsSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json')) {
                var _settings = {
                    auth: {}
                    , db: [

					]
                };
                if (Manifest.db) {
                    for (var i = 0; i < Manifest.db.length; i++) _settings.db.push({
                        name: Manifest.db[i]
                        , uri: "mysql://root@127.0.0.1/" + Manifest.db[i]
                    });
                };
                fs.writeFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json', JSON.stringify(_settings, null, 4));
                var _set = fs.readFileSync(PROJECT_HOME + path.sep + 'etc' + path.sep + 'settings.json', 'utf-8');
                MSettings = JSON.parse(_set);
            };
        };

        if (MSettings.auth) {

            app.get('/login', function (req, res) {
                res.status(401).send('missing authorization header');
            });
            app.post('/remotelogin', function (req, res) {
                var response = JSON.parse(req.body.response);
                var profile = {};
                if (response.service == "google") {
                    profile = response.data;
                    profile.provider = "google";
                };

                Auth.user(profile, function (err, response) {
                    req.session.user = response;
                    res.end("{}");
                });

            });
            app.get('/logout', function (req, res) {
                var authType = req.session.authType;
                req.session.destroy();
				try {
					res.redirect(MSettings.auth[authType.toLowerCase()].logout);
				}catch(e) {
					res.end('ERROR: authType');
				}
            });
            app.post('/account', ensureAuthenticated, function (req, res) {
                if (req.body.udid) {
                    // on récupère le udid crée côté client
                    req.session.udid = new Buffer(req.body.udid, 'base64').toString('utf-8');
                    req.session.device = req.session.udid.split('|')[1];
                    req.session.uid = req.session.udid.split('|')[0];
                    // on ajoute l'utilisateur pour créer le pudid (personal udid)
                    req.session.user.pudid = new Buffer(req.session.uid + '|' + req.session.user.uid + '|' + req.session.device).toString('base64');
                    req.session.udid = req.body.udid;
                };
                if (!req.user) req.user = req.session.user;
                OASocketonAuth(JSON.stringify(req.user));
                res.end(JSON.stringify(req.user, null, 4));
            });
            app.get('/account', ensureAuthenticated, function (req, res) {
                if (!req.user) req.user = req.session.user;
                var response = [];
                if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + 'Profiler.json')) {
                    var profiler = JSON.parse(require('fs').readFileSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + 'Profiler.json', 'utf-8'));
                    for (var el in profiler.profile) {
                        var p = profiler.profile[el];
                        if (p.indexOf(user) > -1) response.push(el);
                    };
                };
                req.user.profiles = response;
                res.end(JSON.stringify(req.user, null, 4));
            });
            app.get('/udid', function (req, res) {
                res.end(req.session.udid);
            });

            function ensureAuthenticated(req, res, next) {

                if (MSettings.auth.cas) req.session.authType = "CAS";
                if (MSettings.auth.google) req.session.authType = "GOOGLE";
                if (MSettings.auth.twitter) req.session.authType = "TWITTER";
                if (MSettings.auth.facebook) req.session.authType = "FACEBOOK";
                if (!req.user) req.user = req.session.user;
                if (req.user) {
                    return next();
                };
                res.redirect('/login');
            };

            if (MSettings.auth.local) {
                // a développer !
            };

            if (MSettings.auth.cas) {

                authom.createServer({
                    service: "cas"
                });

            };

            if (MSettings.auth.google) {

                var google = MSettings.auth.google;

                authom.createServer({
                    service: "google"
                    , id: google.key
                    , secret: google.secret
                    , scope: MSettings.auth.google.scope
                })

            };
            if (MSettings.auth.twitter) {

                var twitter = MSettings.auth.twitter;

                authom.createServer({
                    service: "twitter"
                    , id: twitter.key
                    , secret: twitter.secret
                })
            };
            if (MSettings.auth.facebook) {

                var facebook = MSettings.auth.facebook;
                console.log(facebook);
                authom.createServer({
                    service: "facebook"
                    , id: facebook.key
                    , secret: facebook.secret
                })

            };

            authom.on("auth", function (req, res, data) {
                console.log(data);
                if (data.service == "google") {
                    var profile = {};
                    profile.username = data.data;
                    profile.provider = "google";
                    Auth.user(profile, function (err, response) {
                        req.session.user = response;
                        OASocketonAuth(JSON.stringify(response));
                        res.end("<html><body><script>setTimeout(window.close, 1000);</script></body></html>");
                    });
                };
                if (data.service == "cas") {
                    var profile = {};
                    profile.provider = "cas";
                    profile.username = data.username;
                    Auth.user(profile, function (err, response) {
                        req.session.user = response;
						OASocketonAuth(JSON.stringify(response));
                        res.end("<html><body><script>setTimeout(window.close, 1000);</script></body></html>");
                    });
                };

            });

            authom.on("error", function (req, res, data) {
                // called when an error occurs during authentication
                console.log('-- ERROR ------');
                console.log(data);
            });

        };

        if (MSettings.auth) app.get("/auth/:service", authom.app);

        app.get('/Contents/Services/:any', function (req, res) {
            res.set('Allow', 'GET');
            res.send(405, 'Method Not Allowed');
        });

        app.get('/tmp/:uid', function (req, res) {
            var file = PROJECT_HOME + path.sep + "tmp" + path.sep + req.params.uid;
            if (!fs.existsSync(file)) {
                res.sendStatus(404);
            } else {
                res.download(file);
                res.on('finish', function () {
                    fs.unlink(file);
                });
            }
        });

        app.post('/api', processRoute);


        app.get('/session', function (req, res) {
            res.header("Content-Type", "application/json; charset=utf-8");
            var response = {
                omneedia: {
                    engine: $_VERSION
                }
                , session: req.sessionID
                , pid: _SESSION_
            };
            res.end(JSON.stringify(response, null, 4));
        });

        app.get('/api', function (req, res) {
            res.header("Content-Type", "application/json; charset=utf-8");
            var response = {
                omneedia: {
                    engine: $_VERSION
                }
                , namespace: PROJECT_NS
                , classes: []
            };

            var classes = fs.readdirSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services");
            var myclass = [];
            for (var i = 0; i < classes.length; i++) {
                if ((classes[i] != "node_modules") && (classes[i] != "sql") && (classes[i].substr(0, 1) != ".")) myclass[myclass.length] = classes[i].split('.js')[0];
            };
            response.classes = myclass;
            res.end(JSON.stringify(response, null, 4));
        });
        app.get('/api/:ns', function (req, res) {
            var url = req.url.split('?');
            if (url.length > 1) {
                if (url[1] == "javascript") {
                    res.header("Content-Type", "application/json; charset=utf-8");
                    var REMOTE_API = {};
                    REMOTE_API.url = "http://" + req.headers.host + "/api";
                    REMOTE_API.type = "remoting";
                    REMOTE_API.namespace = "App";
                    REMOTE_API.descriptor = "App.REMOTING_API";
                    REMOTE_API.actions = {};
                    REMOTE_API.actions[req.params.ns] = [];

                    if (req.params.ns.indexOf("__QUERY__") == -1) {
                        if (!fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + req.params.ns + ".js")) {
                            res.end('');
                            return;
                        };
                    } else {
                        if (!fs.existsSync(__dirname + path.sep + "node_modules" + path.sep + "db" + path.sep + "__QUERY__.js")) {
                            res.end('');
                            return;
                        } else {
                            var _api = require(__dirname + path.sep + "node_modules" + path.sep + "db" + path.sep + "__QUERY__.js");
                            for (var e in _api) {
                                if (_api[e].toString().substr(0, 8) == "function") {
                                    var obj = {};
                                    obj.name = e;
                                    var myfn = _api[e].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
                                    obj.len = myfn.length - 1;
                                    REMOTE_API.actions[req.params.ns][REMOTE_API.actions[req.params.ns].length] = obj;
                                }
                            };
                            var str = "if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
                            str += "App.REMOTING_API=" + JSON.stringify(REMOTE_API, null) + ";";
                            str += "Ext.Direct.addProvider(App.REMOTING_API);";
                            res.end(str);
                            return;
                        }
                    };
                    var _api = require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + req.params.ns + ".js");
                    for (var e in _api) {
                        if (_api[e].toString().substr(0, 8) == "function") {
                            var obj = {};
                            obj.name = e;
                            var myfn = _api[e].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
                            obj.len = myfn.length - 1;
                            REMOTE_API.actions[req.params.ns][REMOTE_API.actions[req.params.ns].length] = obj;
                        }
                    };
                    var str = "if (Ext.syncRequire) Ext.syncRequire('Ext.direct.Manager');Ext.namespace('App');";
                    str += "App.REMOTING_API=" + JSON.stringify(REMOTE_API, null) + ";";
                    str += "Ext.Direct.addProvider(App.REMOTING_API);";
                    res.end(str);
                };
                return;
            };
            res.header("Content-Type", "application/json; charset=utf-8");
            if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + req.params.ns + ".js")) {
                var _api = require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + req.params.ns + ".js");
                var response = {
                    omneedia: {
                        engine: $_VERSION
                    }
                    , namespace: PROJECT_NS
                    , class: req.params.ns
                    , methods: []
                };
                for (var e in _api) {
                    if (_api[e].toString().substr(0, 8) == "function") response.methods[response.methods.length] = e;
                };
                res.end(JSON.stringify(response, null, 4));
            } else res.end('Service not found');
        });
        app.get('/favicon.ico', function (req, res) {
            res.end('');
        });

        app.get('/api/:ns/:fn', function (req, res) {
            res.header("Content-Type", "application/json; charset=utf-8");
            if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + req.params.ns + ".js")) {
                var _api = require(PROJECT_WEB + path.sep + "Contents" + path.sep + "Services" + path.sep + req.params.ns + ".js");
                _api.using = function (unit) {
                    if (fs.existsSync(__dirname + path.sep + 'node_modules' + path.sep + unit))
                        return require(__dirname + path.sep + 'node_modules' + path.sep + unit);
                    else
                        return require(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit);

                };
                var response = {
                    omneedia: {
                        engine: $_VERSION
                    }
                    , namespace: PROJECT_NS
                    , class: req.params.ns
                    , method: req.params.fn
                    , params: []
                };
                if (_api[req.params.fn]) {
                    var myfn = _api[req.params.fn].toString().split('function')[1].split('{')[0].trim().split('(')[1].split(')')[0].split(',');
                    for (var i = 0; i < myfn.length - 1; i++) {
                        if (myfn[i].trim() != "") response.params[response.params.length] = myfn[i].trim();
                    };

                    if (!response.param) response.param = {};
                    var url = req.url.split('?');

                    if (url.length >= 1) {
                        try {
                            url = url[1].split('&');
                            for (var i = 0; i < url.length; i++) {
                                var elem = url[i].split('=');
                                if (response.params.indexOf(elem[0]) == -1)
                                    res.end('param ' + elem[0] + ' not found');
                                else {
                                    if (elem[1].substr(0, 1) == "[")
                                        response.param[elem[0]] = eval(decodeURI(elem[1]));
                                    else
                                    if (elem[1].substr(0, 1) == "{")
                                        response.param[elem[0]] = JSON.parse(decodeURI(elem[1]));
                                    else
                                        response.param[elem[0]] = elem[1];
                                }
                            };
                        } catch (e) {
                            url = [];
                        }
                    };
                    var params = [];
                    for (var i = 0; i < response.params.length; i++) {
                        params.push(response.param[response.params[i]]);
                    };
                    //console.log(params);
                    if ((response.params.length > 0) && (url.length < 1)) res.end(JSON.stringify(response, null, 4));
                    else {
                        params.push(function (e, x) {
                            if (!x) {
                                x = {
                                    "error": e
                                };
                            } else {
                                if (x.type == "raw") {
                                    response = Object.extend(response, x);
                                } else response.result = x;
                            };
                            res.end(JSON.stringify(response, null, 4));
                        });
                        _api[req.params.fn].apply({}, params);
                    };
                } else res.end('Method not found');
            } else res.end('Service not found');
        });
        app.post('/auth/q', function (req, res) {
            var data = req.body;
            var $_INFO = data.key;
            if (data.ukey) {
                if (fs.existsSync(PROJECT_VAR + path.sep + "udid" + path.sep + data.ukey + path.sep + "default")) fs.unlinkSync(PROJECT_VAR + path.sep + "udid" + path.sep + data.ukey + path.sep + "default");
            };
            var $user = "x";
            if (fs.existsSync(PROJECT_VAR + path.sep + "udid" + path.sep + $_INFO + path.sep + "default"))
                $user = fs.readFileSync(PROJECT_VAR + path.sep + "udid" + path.sep + $_INFO + path.sep + "default", "utf-8");

            var $img = getUserInfo($user, "PICTURE");
            if ($img != "") var $imdata = $img;
            else {
                /*var $im = fs.readFileSync(__dirname+path.sep+"node_modules"+path.sep+"login.png");
                var image = $im.toString('base64');
				var $imdata = "data:image/png;base64,"+image;*/
            };
            var $arr = {
                img: $imdata
                , user: $user
            };
            res.header("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify($arr, null, 4));
        });
        app.get('/auth/login', function (req, res) {
            var $_RAW = req.headers.raw;
            var buf = new Buffer($_RAW, 'base64');
            $_RAW = buf.toString('utf-8').split('|');
            var $_LOGIN = $_RAW[0];
            var $_PASSWORD = $_RAW[1];
				var $_UDID = $_RAW[2];
            var $_NS = $_RAW[3];

            var $_RESPONSE = {
                authenticate: false
            };

            if ($_PASSWORD == "") {
                return;
            };

            // on check le login !
            Auth.login(req, Manifest.officer, $_LOGIN, $_PASSWORD, function (checked) {
                if (checked) {
                    $_RESPONSE.authenticate = true;
                };
                if (!$_RESPONSE.authenticate) res.send(401);
                else res.send(JSON.stringify($_RESPONSE, null, 4));
            });

        });

		app.IO.use(function(socket, next) {
			session(socket.request, socket.request.res, next);
		});

        /*

        NOTIFICATION CENTER PLUGIN
        WORK IN PROGRESS....

        */

        app.get('/notificationcenter.plugin', function (req, res) {
            var body = [];
            body.push('<html><head></head><script type="text/javascript">window.onload=function(){if (parent) {var oHead = document.getElementsByTagName("head")[0];var arrStyleSheets = parent.document.getElementsByTagName("link");for (var i = 0; i < arrStyleSheets.length; i++) oHead.appendChild(arrStyleSheets[i].cloneNode(true));}}</script><body class="NotificationBackground">');
            var str = fs.readFileSync(__dirname + path.sep + "notificationcenter" + path.sep + "template.html", 'utf-8');
            body.push(str);
            body.push("</body></html>");
            res.send(body.join(''));
        });

        /*

        END OF NOTIFICATION PLUGIN

        */

        /*

        Add Task runner

        */
        var Tasker = [];
        if (MSettings.jobs) {
            if (MSettings.jobs.length > 0) var schedule = require('node-schedule');

            for (var i = 0; i < MSettings.jobs.length; i++) {
                console.log('  - Scheduling job#' + i);
                var newjob = schedule.scheduleJob(MSettings.jobs[i].cron, function () {
                    var ndx = this.name.substr(this.name.lastIndexOf(' ') + 1, 255).split('>')[0];
                    ndx = ndx * 1 - 1;
                    var _Task = require(PROJECT_HOME + path.sep + 'src' + path.sep + 'Contents' + path.sep + 'Services' + path.sep + MSettings.jobs[ndx].api.split('.')[0] + ".js");
                    _Task.DB = require(__dirname + path.sep + 'node_modules' + path.sep + "db" + path.sep + "DB.js");
                    _Task.using = function (unit) {
                        if (fs.existsSync(__dirname + path.sep + 'node_modules' + path.sep + unit))
                            return require(__dirname + path.sep + 'node_modules' + path.sep + unit);
                        else {
                            if (fs.existsSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit))
                                return require(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit);
                            else {
                                return require(__dirname + path.sep + unit.replace(/\//g, require('path').sep));
                            }
                        }
                    };
                    _Task[MSettings.jobs[ndx].api.split('.')[1]]({}, function () {
                        console.log('--> Job done.');
                    });
                });
            }
        };


        // load plugins
        if (fs.existsSync(PROJECT_SYSTEM + path.sep + "var" + path.sep + "www")) {
            app.use('/app', express.static(PROJECT_SYSTEM + path.sep + "var" + path.sep + "www"));
        };
        if (fs.existsSync(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + "logmein")) {
            app.use('/logmein', express.static(PROJECT_WEB + path.sep + "Contents" + path.sep + "Auth" + path.sep + "logmein"));
        };


        // update !!!

        App_Update('', function () {

            if (fs.existsSync(PROJECT_SYSTEM + path.sep + "app.js")) {
                var _App = require(PROJECT_SYSTEM + path.sep + "app.js");
				_App.file={
					reader: function(ff,cb) {
						if (!ff.docId) {
							if (cb.end) cb.end("MISMATCHED_OBJECT"); else cb("MISMATCHED_OBJECT", null);
                        } else {
							if (ff._blob) {
								if (ff._blob.indexOf(';base64')>-1) {
									var buf = new Buffer(ff._blob.split(';base64,')[1], 'base64');
									if (isFunction(cb)) {
										cb(null,buf);
									} else {
										if (cb.end) {
											cb.set('Content-disposition', 'inline; filename="'+ff.filename+'"');
											cb.set("Content-Type", ff.type);
											cb.set("Content-Length", ff.size);
											cb.end(buf);
										}
									};
								} else {
									if (cb.end) cb.end("MISMATCHED_OBJECT"); else cb("MISMATCHED_OBJECT", null);
								};
							} else {
								if (cb.end) cb.end("MISMATCHED_OBJECT"); else cb("MISMATCHED_OBJECT", null);
							};
						}
					}
				};
                _App.upload = {
                    up: function (req,cb) {
                        for (var el=0;el<req.files.length;el++) {
                            var stat = require('fs').statSync(req.files[el].path);
                            var size = stat.size;
                            var o = {
                                message: req.files[el].path + "|" + req.files[el].fieldname + "|" + _EXT_.getContentType(req.files[el].path) + '|' + size
                                , test: "OK"
                                , success: true
                            };
                            if (cb) {
                                if (typeof(cb) == 'function') cb(o); else cb.end(JSON.stringify(o));
                            }
                        };
                        if (req.files.length==0) {
                            if (cb) {
                                var o={
                                    message: "NOT_FOUND"
                                    , test: "OK"
                                    , success: false
                                };
                                if (typeof(cb) == 'function') cb(o); else cb.end(JSON.stringify(o));
                            }
                        }
                    }
                    , reader: function (filename, cb) {
                        if (!filename) {
							if (cb.end) cb.end("NOT_FOUND"); else cb("NOT_FOUND", null);
                        } else {
                            var path = filename;
                            if (fs.existsSync(path)) {
								if (isFunction(cb)) fs.readFile(path, cb); else {
									if (!cb.end) {cb("MISMATCHED_OBJECT",null); return;}
									fs.stat(path, function(err, stats) {
										if (err) cb(err,null); else {
											cb.set('Content-disposition', 'inline; filename="'+require('path').basename(path)+'"');
											cb.set("Content-Type", _EXT_.getContentType(path));
											cb.set("Content-Length", stats.size);
											fs.readFile(path,function(err,buf) {
												if (err) cb.end(''); else cb.end(buf);
											});	
										};
									});									
								};
                            } else {
								if (cb.end) cb.end("NOT_FOUND"); else cb("NOT_FOUND", null);
							}
                        };
                    }
                    , toBase64: function (filename,cb) {
                        if (!filename) return "";
                        var path = filename;
                        if (fs.existsSync(path)) {
                            var bin = fs.readFileSync(path);
                            var base64Image = new Buffer(bin, 'binary').toString('base64');
                            cb(null,"data:" + _EXT_.getContentType(path) + ";base64," + base64Image);
                        } else {
                            cb("NOT_FOUND",null);
                        }
                    }
                    , dir: PROJECT_HOME+ path.sep +'bin'+ path.sep + 'uploads'
                };

                _App.IO = {
                    send: function(uri,data,users) {
                        var o={
                            uri: uri,
                            data: data,
                            users: users
                        };
                        var socket = require('socket.io-client')('http://' + getIPAddress() + ':' + Manifest.server.port);
                        if (uri.indexOf("#")>-1) socket.emit("#send",JSON.stringify(o));
                    }
                };
                _App.using = function (unit) {
                    if (fs.existsSync(__dirname + path.sep + 'node_modules' + path.sep + unit))
                        return require(__dirname + path.sep + 'node_modules' + path.sep + unit);
                    else {
                        if (fs.existsSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit))
                            return require(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit);
                        else {
                            console.log(__dirname + path.sep + unit.replace(/\//g, require('path').sep));
                            return require(__dirname + path.sep + unit.replace(/\//g, require('path').sep));
                        }
                    }
                };
                _App.api = require(__dirname + path.sep + 'node_modules' + path.sep + "api");
                for (var i = 0; i < Settings.API.length; i++) {
                    if (Settings.API[i] == "__QUERY__")
                        _App[Settings.API[i]] = require(__dirname + path.sep + 'node_modules' + path.sep + 'db' + path.sep + '__QUERY__.js');
                    else
                        _App[Settings.API[i]] = require(PROJECT_SYSTEM + path.sep + '..' + path.sep + 'Contents' + path.sep + 'Services' + path.sep + Settings.API[i] + '.js');
                    var self = _App[Settings.API[i]].model = {
                        _model: {
                            "type": "raw"
                            , "metaData": {
                                "idProperty": -1
                                , "totalProperty": "total"
                                , "successProperty": "success"
                                , "root": "data"
                                , "fields": []
                            }
                            , "total": 0
                            , "data": []
                            , "success": false
                            , "message": "failure"
                        }
                        , init: function () {
                            self._model.metaData.fields = [];
                            self._model.data = [];
                            self._model.success = false;
                            self._model.message = "failure";
                        }
                        , fields: {
                            add: function (o) {
                                if (o === Object(o))
                                    self._model.metaData.fields.push(o);
                                else {
                                    var t = o.split(',');
                                    if (t.length == 3) {
                                        var o = {
                                            name: t[0]
                                            , type: t[1]
                                            , length: t[2]
                                        };
                                        if (o.type == "date") o.dateFormat = 'c';
                                    } else {
                                        var o = {
                                            name: o
                                            , type: 'string'
                                            , length: 255
                                        };
                                    };
                                    self._model.metaData.fields.push(o);
                                }
                            }
                        }
                        , data: {
                            add: function (o) {
                                self._model.data.push(o);
                                self._model.total = self._model.data.length;
                            }
                        }
                        , get: function () {
                            self._model.success = true;
                            self._model.message = "success";
                            return self._model;
                        }

                    };
                    _App[Settings.API[i]].DB = require(__dirname + path.sep + 'node_modules' + path.sep + "db" + path.sep + "DB.js");
                    _App[Settings.API[i]].IO = app.IO;
                    _App[Settings.API[i]].using = function (unit) {
                        if (fs.existsSync(__dirname + path.sep + 'node_modules' + path.sep + unit))
                            return require(__dirname + path.sep + 'node_modules' + path.sep + unit);
                        else {
                            if (fs.existsSync(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit))
                                return require(PROJECT_HOME + path.sep + 'bin' + path.sep + 'node_modules' + path.sep + unit);
                            else {
                                console.log(__dirname + path.sep + unit.replace(/\//g, require('path').sep));
                                return require(__dirname + path.sep + unit.replace(/\//g, require('path').sep));
                            }
                        }

                    };

                };
                _App.init(app, express);
            };
            if (process.args.sandbox) {
				
				var jsoconf=JSON.parse(fs.readFileSync(__dirname+path.sep+'..'+path.sep+'config'+path.sep+'sandbox.json'));
				
				if (!fs.existsSync(__dirname+path.sep+'..'+path.sep+'pids')) fs.mkdirSync(__dirname+path.sep+'..'+path.sep+'pids');	
				
				var port=process.args.port;
				Manifest.server.port=port;
				var cluster_host=jsoconf.cluster_host.split(':')[0];
				var cluster_port="80";
				if (jsoconf.cluster_host.split(':').length>1) cluster_port=jsoconf.cluster_host.split(':')[1]*1;
				console.log("Connecting to cluster " + 'http://' + cluster_host + ':' + cluster_port);
				var socket = require('socket.io-client')('http://' + cluster_host + ':' + cluster_port);
				socket.on('disconnect', function () {
					console.log("Loosing cluster...");
				});
				socket.on('connect', function () {
					console.log('Cluster Connected');
					console.log('Listening to port ' + Manifest.server.port);
					console.log('registering drone...');
					// update cluster
					socket.emit('ONLINE', {
						drone: process.args.user+'.'+Manifest.namespace
						, host: getIPAddress()
						, port: Manifest.server.port
						, pid: process.pid
						, uri: process.args.user+'.'+Manifest.namespace+'.'+jsoconf.domain
					});
					socket.on('REGISTER', function () {
						console.log('registered.');
					});
				});

				http.listen(Manifest.server.port);
				console.log('  - Drone started in debug mode at http://' + getIPAddress() + ':' + Manifest.server.port + '');
				console.log('');
				fs.writeFileSync(__dirname+path.sep+'..'+path.sep+'pids'+path.sep+process.args.user+'.'+process.args.app+'.inf',Manifest.server.port+':'+process.pid+':'+process.args.user+'.'+Manifest.namespace+'.'+jsoconf.domain);
				
				return;

			} else http.listen(Manifest.server.port);

            if (Manifest.platform == "mobile") {
                //console.log('  - Debug service started at http://'+getIPAddress()+':'+Manifest.debug.port+'/client');
                //Exec(__dirname+path.sep+"node_modules"+path.sep+".bin"+path.sep+"weinre --httpPort "+Manifest.debug.port+" --boundHost -all-",function(){});
                if (_FIRST_TIME == 1) open('http://' + getIPAddress() + ':' + Manifest.server.port + '/connect/', 'chrome');
            } else {
                //open('http://'+getIPAddress()+':'+Manifest.server.port+'/','chrome');
                if (_FIRST_TIME == 1) open('http://127.0.0.1:' + Manifest.server.port + '/', 'chrome');
            };



            console.log('  - Drone started in debug mode at http://' + getIPAddress() + ':' + Manifest.server.port + '');
            console.log('');

            if ((process.argv.indexOf("auto#1") > -1) || (process.argv.indexOf("auto#0") > -1)) {
                var fsmonitor = require('fsmonitor');

                var prefs = {
                    // include files
                    matches: function (realpath) {
                        if (realpath.indexOf('.js') > -1) return true;
                        if (realpath.indexOf('.json') > -1) return true;
                        if (realpath.indexOf('.css') > -1) return true;
                        return false;
                    }
                    , // exclude directories
                    excludes: function (realpath) {
                        if (realpath.indexOf('.git') > -1) return true;
                        if (realpath.indexOf('bin') > -1) return true;
                        if (realpath.indexOf('dev') > -1) return true;
                        if (realpath.indexOf('builds') > -1) return true;
                        if (realpath.indexOf('Tasks') > -1) return true;
                        if (realpath.indexOf('tmp') > -1) return true;
                    }
                };
                fsmonitor.watch(PROJECT_HOME, prefs, function (change) {
                    console.log("");
                    console.log("	!!!! Change detected... reload".yellow);
                    console.log("");
                    console.log(change);
                    console.log("");
                    process.kill(process.pid);
                });
            };

        });

    }


});
