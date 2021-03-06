var b64img;
var feed = "80302";
var rooms;
var numrooms;
var b64 = new Object();
var green ="rgba(38,162,43,.75)";
var orange= "rgba(153,0,10,.75)";
var blue= "rgba(50, 99,187,.75)";
var black= "rgba(0,0,0,.75)";
/*intialize app -- if not already in local storage*/
getRoomList();
getRoomImages();

day = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
sday = ["Su", "M", "T", "W", "Th", "F", "S" ];

$('#main-page').live('pageinit', function(event) {
	console.log('in live pageinit for main-page');
	console.log(b64.livingroom);
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

});//end of pageinit????



function initMainPage(){
	$.each(rooms, function(index, room) {
		ima = b64[room.room];
		$('#rooms').append('<li id="rm'+index+'"><a href="#"><img src="data:image/jpeg;charset=utf-8;base64, '+ima+'"><span class="temp"> <h2><span class="temp-disp"></span> &deg F </h2></span><p class="rname">'+room.rname+'<span class="timest"></span></p><p class="ui-li-aside setpt"><span class="setpt-refresh"></span>&deg F</p></a></li>');
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
		therooms = data.items;
		console.log(therooms[3]);
		$.each(therooms, function(index, room) {			
			if (room.temp==null){
				ftemp="-- ";
			}else {ftemp = Math.round(room.temp/16*9/5+32);}
			if (room.setpt==null){
				stemp="-- ";
			}else {stemp=Math.round(room.setpt/8*9/5+32);}			
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
			$(selTemp).html (ftemp);
			$(selSet).html (stemp);
			$(selSet).css("background", bkg);
			$(selBorSet).css("background", bkg);
			$(selNow).html(now);
		});
		$('#rooms').listview('refresh');
	});		
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
		console.log(rooms[i]);
		rfile ="b64_"+rooms[i].room;
		console.log(rfile);
		rnam = (rfile.substring(4));
		if ( localStorage.getItem(rfile)) {
			console.log(rfile +" exists");
			b64[rnam]=  localStorage.getItem(rfile);
		}else{
			console.log("no "+rfile);
			b64[rnam] = $.ajax({url: "img/base64/"+rnam+".txt", async: false}).responseText;
			localStorage.setItem(rfile, b64[rnam]);
		}
	}	
}var b64img;
var feed = "80302";
var numrooms;
var b64 = new Object();
/* test -- rmf='library'; rmImgs[rmf]='ducks'; console.log(rmImgs);*/

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
/* room images SECTION  - store each room image in its own localstorage if its not there */
numrooms=(rooms.length); 	
console.log(numrooms);
for (i=0;i<numrooms;i++){
	console.log(rooms[i]);
	rfile ="b64_"+rooms[i].room;
	console.log(rfile);
	rnam = (rfile.substring(4));
	if ( localStorage.getItem(rfile)) {
		console.log(rfile +" exists");
		b64[rnam]=  localStorage.getItem(rfile);
	}else{
		console.log("no "+rfile);
		b64[rnam] = $.ajax({url: "img/base64/"+rnam+".txt", async: false}).responseText;
		localStorage.setItem(rfile, b64[rnam]);
	}
}

b64img = $.ajax({
    url: "img/base64/floor2.txt",
        async: false
}).responseText;


$('#main-page').live('pageinit', function(event) {
	console.log('in live pageinit for main-page');


});//end of pageinit????
  	//console.log('<img src="data:image/jpeg;charset=utf-8;base64, '+b64img+'">');
