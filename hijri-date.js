/**
 *
 * @description  Hijri Date Function
 * @version 1.1
 * 
 * @author (c) mo7amed5hairy, Egypt, January 2025
 * 
 * @namespace HijriDate
 */

function HijriDate(year, month, date, hour, minute, second, millisecond) {
	var gregDate = new Date(),
		time,
		day,
		timezoneOffset = gregDate.getTimezoneOffset() * 6e4;
	
	if (year === undefined) {
		time = gregDate.getTime() - timezoneOffset;
		updateDate();
	}
	else if (month === undefined) {
		time = HijriDate.parseInt(year, 0) - timezoneOffset;
		updateDate();
	}
	else {
		year = HijriDate.parseInt(year, 1);
		month = HijriDate.parseInt(month, 0);
		date = HijriDate.parseInt(date, 1);
		hour = HijriDate.parseInt(hour, 0);
		minute = HijriDate.parseInt(minute, 0);
		second = HijriDate.parseInt(second, 0);
		millisecond = HijriDate.parseInt(millisecond, 0);
		updateTime();
	}
	
    this.toString = function() {
		return this.getFullDateString();
	};
	
	this.valueOf = function() {
		return time;
	};
	
	this.getDateString = function() {
		return	this.getDayName() + ', ' +
				date + ' ' +
				this.getMonthName() + ' ' +
				this.getFullYearString();
	};
	
	this.getTimeString = function() {
		return	HijriDate.toDigit(hour, 2) + ':' +
				HijriDate.toDigit(minute, 2) + ':' +
				HijriDate.toDigit(second, 2) + '.' +
				HijriDate.toDigit(millisecond, 3);
	};
	
	this.getFullDateString = function() {
		return this.getDateString() + ' ' + this.getTimeString();
	};
	
	this.getTime = function() {
		return time + timezoneOffset;
	};
	
	this.getFullYear = function() {
		return year;
	};
	
	this.getFullYearString = function() {
		return (year > 0) ? HijriDate.toDigit(year, 4) + " H" : HijriDate.toDigit(Math.abs(year - 1), 4) + " BH";
	};
	
	this.getMonth = function() {
		return month;
	};
	
	this.getMonthName = function(mon) {
		return HijriDate.monthNames[(mon === undefined) ? month : parseInt(mon)];
	};
	
	this.getMonthShortName = function(mon) {
		return HijriDate.monthShortNames[(mon === undefined) ? month : parseInt(mon)];
	};
	
	this.getDate = function() {
		return date;
	};
	
	this.getHours = function() {
		return hour;
	};
	
	this.getMinutes = function() {
		return minute;
	};
	
	this.getSeconds = function() {
		return second;
	};
	
	this.getMilliseconds = function() {
		return millisecond;
	};
	
	this.getDay = function() {
		return day;
	};
	
	this.getDayName = function(dy) {
		return HijriDate.weekdayNames[(dy === undefined) ? day : parseInt(dy)];
	};
	
	this.getDayShortName = function(dy) {
		return HijriDate.weekdayShortNames[(dy === undefined) ? day : parseInt(dy)];
	};
	
	this.getDaysInMonth = function() {
		return HijriDate.daysInMonth((year - 1) * 12 + month);
	};
	
	this.getJavaWeekday = function() {
		return this.getGregorianDate().getJavaWeekday();
	};
	
	this.getJavaWeekdayName = function(dy) {
		return this.getGregorianDate().getJavaWeekdayName(dy);
	};
	
	this.getGregorianDate = function() {
		gregDate.setTime(time + timezoneOffset);
		return gregDate;
	};
	
	this.setTime = function(tm) {
		time = parseInt(tm) - timezoneOffset;
		updateDate();
	};
	
	this.setFullYear = function(yr) {
		year = parseInt(yr);
		updateTime();
	};
	
	this.setMonth = function(mon) {
		month = parseInt(mon);
		updateTime();
	};
	
	this.setDate = function(dt) {
		date = parseInt(dt);
		updateTime();
	};
	
	this.setHours = function(hr) {
		hour = parseInt(hr);
		updateTime();
	};
	
	this.setMinutes = function(min) {
		minute = parseInt(min);
		updateTime();
	};
	
	this.setSeconds = function(sec) {
		second = parseInt(sec);
		updateTime();
	};
	
	this.setMilliseconds = function(ms) {
		millisecond = parseInt(ms);
		updateTime();
	};
	
	function updateDate() {
		var tm = time - HijriDate.constInterval,
			range;
		month = parseInt(parseInt((tm / 864e5)) / HijriDate.moonCycle);
		month = (tm >= 0) ? month : --month;
		date = HijriDate.daysCount(month) * 864e5;
		tm = (tm >= 0) ? tm - date : date + tm;
		millisecond = tm % 1e3;
		tm = parseInt(tm / 1e3);
		second = tm % 60;
		tm = parseInt(tm / 60);
		minute  = tm % 60;
		tm = parseInt(tm / 60);
		hour = tm % 24;
		tm = parseInt(tm / 24);
		date = tm;
		range = HijriDate.daysInMonth(month);
		if (date >= range) {
			month++;
			date -= range;
		}
		date++;
		year = Math.floor(month / 12) + 1;
		month = (month >= 0) ? month % 12 : (month % 12 === 0) ? 0 : 12 + month % 12;
		day = Math.floor(time / 864e5);
		day = (day + 4) % 7;
		day = (day < 0) ? day + 7 : day;
	}
	
	function updateTime() {
		var months = (year - 1) * 12 + month;
		time = (months >= 0) ? HijriDate.daysCount(months) : -HijriDate.daysCount(months);
		time += date;
		time *= 864e5;
		time += hour * 36e5 + minute * 6e4 + second * 1e3 + millisecond - 864e5;
		time += HijriDate.constInterval;
		updateDate();
	}
}

HijriDate.moonCycle = 29.5305882;

HijriDate.constInterval = -42521608800000;

HijriDate.monthNames = ["المحرّم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة",
					   "رجب", "شعبان", "رمضان", "شوّال", "ذو القعدة", "ذو الحجة"];

HijriDate.monthShortNames = ['مح', 'صفر', 'ربيع 1', 'ربيع 2', 'جمادى 1', 'جمادى 2', 'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'];

HijriDate.weekdayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

HijriDate.weekdayShortNames = ['أح', 'إث', 'ثل', 'أر', 'خ', 'جم', 'سب'];

HijriDate.toDigit = function(num, digit) {
	var ns = num.toString();
	if (ns.length > digit) return ns;
	return ('00000000' + ns).slice(-digit);
}

HijriDate.daysInMonth = function(month) {
	return (month >= 0) ? HijriDate.daysCount(month + 1) - HijriDate.daysCount(month) : HijriDate.daysCount(month) - HijriDate.daysCount(month + 1);
}

HijriDate.daysCount = function(month) {
	if (month >= 0) return parseInt(month * HijriDate.moonCycle);
	var times = (parseInt(-month / 30601) + 1) * 30601;
	return parseInt(times * HijriDate.moonCycle) - parseInt((times + month) * HijriDate.moonCycle);
}

HijriDate.parseInt = function(num, def) {
	var res = parseInt(num);
	return isNaN(res) ? def : res;
}
