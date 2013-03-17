var b64img;
var feed = "80302";
var rooms;
var numrooms;
var b64 = new Object();
var green ="rgba(38,162,43,.75)";
var orange= "rgba(153,0,10,.75)";
var blue= "rgba(50, 99,187,.75)";
var black= "rgba(0,0,0,.75)";
var hid = 0; //aroom header data roomid
var therooms = new Object();
/*intialize app -- if not already in local storage*/


day = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
sday = ["Su", "M", "T", "W", "Th", "F", "S" ];

$('#main-page').live('pageinit', function(event) {
	console.log('in live pageinit for main-page');
	//console.log(b64.livingroom);
	getRoomList();
 	getRoomImages();
	initMainPage();
	getData();
	
	$('.temp-refresh').click(function() {
		console.log('just clicked temp-refresh button');
		getData();
		$('#popupMenu').popup("close");
	});	
	$('.reload').click(function() {
		console.log('just clicked temp-refresh button');
		$('#rooms').html('');
		initMainPage();
		getData();
		$('#popupMenu').popup("close");
	});	
	$('.reset-app').click(function() {
		console.log('just clicked temp-refresh button');
		localStorage.clear();
		getRoomList();
		getRoomImages();
		$('#rooms').html('');
		initMainPage();
		getData();
		$('#popupMenu').popup("close");
	});		
	$('.room-li').click(function() {
		rsid= jQuery(this).attr("id");
		rid = rsid.substring(2);
		initAroom(rid);
		console.log(rid);
	});
});//end of pageinit????

$('#aroom').live('pageinit', function(event) {
	getRoomList();
	getRoomImages();	
	getData();
	console.log('in live pageinit for aroom');
	$(".arm-goup").click(function() {
		console.log("clicked top-rm");
	  $("html, body").animate({ scrollTop: 0 }, "slow");
	  return false;
	});
	$(".arm-prev").click(function() {
		hid=$('.head-rm-name').data("rmid");
		refreshRoom(prev(hid));
	  	return false;
	});
	$(".arm-next").click(function() {
		hid=$('.head-rm-name').data("rmid");		
		refreshRoom(next(hid));
	  	return false;
	});	
	$("#slider-setpt").change(function(e){ //on moving slider	
		var s = $(this).val();
		console.log(s)
		$(".button-setpt span").html(s+"&deg;");
	});	
	$("#time-boost").hide();
	$("#clock").click(function() {
		$("#time-boost").show();		
	  	return false;
	});
	$("#datetime-set-til").hide();
	$("#datetime34").click(function() {
		$("#datetime-set-til").show();		
	  	return false;
	});	
	$(".button-setpt").click(function() {
		console.log("clicked button-setpt");
		
		$.mobile.changePage($("#dialog-setpt"), "pop", true, true);	
	  	return false;
	});	
});//end of pageinit????

function initMainPage(){
	$.each(rooms, function(index, room) {
		ima = b64[room.room];
		$('#rooms').append('<li id="rm'+index+'" class="room-li"><a href="#"><img src="data:image/jpeg;charset=utf-8;base64, '+ima+'"><span class="temp"> <h2><span class="temp-disp"></span> &deg F </h2></span><p class="rname">'+room.rname+'<span class="timest"></span></p><p class="ui-li-aside setpt"><span class="setpt-refresh"></span>&deg F</p></a></li>');
	});
	$('#rooms').listview('refresh');		
}

function getData(){
	nqrep = 'path='+feed+'&room=all';
	console.log(nqrep);
	$.getJSON('http://homecontrol.sitebuilt.net/services/getData.php', nqrep, function(data) {
		//foods = data.items;
		console.log("in getJSON data function");
		console.log(data['items'][0]);
		console.log(data.items);
		therooms = data.items;
		putData(therooms);
		fillRoom(0);
	});
}
function putData(therooms){
	//console.log(therooms);
	$.each(therooms, function(index, room) {
		ftemp = a2f(room.temp);			
		//console.log(ftemp);
		stemp = a2f(room.setpt*2)	
		if (room.relay==null){
			rell="not set";
			bkg="black";
		}else {
			if (room.relay == 0){
				rell="off"; bkg=green;
			}else{
				rell="on"; 
				bkg=orange; 
			}
		}	
		na = new Date(room.time*1000);
		now= sday[na.getDay()]+' '+na.getDate()+' '+na.getHours()+':'+na.getMinutes();
		selTemp ="ul li:eq("+index+") span.temp-disp";
		selSet ="ul li:eq("+index+") span.setpt-refresh";
		selBorSet ="ul li:eq("+index+") p.setpt";
		selNow ="ul li:eq("+index+") span.timest";
		//console.log(ftemp);
		$(selTemp).html (ftemp);
		$(selSet).html (stemp);
		$(selSet).css("background", bkg);
		$(selBorSet).css("background", bkg);
		$(selNow).html(now);
	});
	//$('#rooms').listview('refresh');
}

function getRoomList(){
	/* roomlist SECTION  - load if ! in localstorage*/
	if ( localStorage.getItem('rooms')) {
		console.log("rooms is in local storage");
		rooms = JSON.parse(localStorage.getItem('rooms'));
	}
	else {
		console.log("need to goto server for rooms data");
		nqrep= 'path='+feed; //+'room=all';
		$.getJSON('http://homecontrol.sitebuilt.net/services/getData.php', nqrep, function(data) {
			//foods = data.items;
			console.log("in getJSON data function");
			rooms =(data['items']);
			localStorage.setItem('rooms',JSON.stringify(rooms));
		});	
	}
}

function getRoomImages(){
	/* room images SECTION  - store each room image in its own localstorage if its not there */
	numrooms=(rooms.length); 	
	console.log(numrooms);
	for (i=0;i<numrooms;i++){
		//console.log(rooms[i]);
		rfile ="b64_"+rooms[i].room;
		//console.log(rfile);
		rnam = (rfile.substring(4));
		if ( localStorage.getItem(rfile)) {
			//console.log(rfile +" exists");
			b64[rnam]=  localStorage.getItem(rfile);
		}else{
			//console.log("no "+rfile);
			b64[rnam] = $.ajax({url: "img/base64/"+rnam+".txt", async: false}).responseText;
			localStorage.setItem(rfile, b64[rnam]);
		}
	}	
}
function a2f(temp) {
	//console.log(temp);
	if (temp==null || temp==0){
		tftemp="--";
	}else {tftemp = Math.round(temp/16*9/5+32);}	
	//console.log(tftemp);	
	return tftemp;
}
function f2a(ftemp) {
	atemp= Math.round((ftemp-32)*8*5/9);	
	return atemp;
}
function initAroom(rid){
	fillRoom(rid);
	$.mobile.changePage($("#aroom"), "slide", true, true);
	console.log(rooms[rid].rname);
	console.log(tom);	
}
function fillRoom(rid){
    console.log("in fillRoom");
	rom=rooms[rid];
	tom=therooms[rid];
	console.log(rom);
	$('.head-rm-name').html(rom.rname);
	$('.head-rm-name').data("rmid",rid);
	$('.head-temp').html(a2f(tom.temp)+"&deg");
	ima = b64[rom.room];
	imag='<img src="data:image/jpeg;charset=utf-8;base64, '+ima+'">';
	$('.head-img').html(imag);
	$(".button-setpt span").html(a2f(tom.setpt*2)+"&deg;");
	console.log(rooms[rid].rname);
	console.log(tom);	
}

function refreshRoom(rid){
	fillRoom(rid);
	//$('#aroom').listview('refresh');
}
function prev(hid){
	if (hid==0){hid= numrooms-1;}else{hid--;}
	console.log(hid);
	return hid;
}
 function next(hid){
	if (hid==numrooms-1){hid=0;}else{hid++;} 
	console.log(hid);	
	return hid;
	
}

/*
http://homecontrol.sitebuilt.net/services/getData.php?path=80302&room=all

Object {circuit: "ckt0", id: "259720", feed: "80302", room: "livingroom", rname: "Livingroom"…}
afeed: "80302"
circuit: "ckt0"
defsetpt: "152"
feed: "80302"
id: "259720"
oldroom: "livingroom"
relay: "0"
rname: "Livingroom"
room: "livingroom"
setpt: "151"
temp: "355"
time: "1363038504"

*/

