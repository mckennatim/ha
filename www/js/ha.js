console.log("line1 of ha.js");
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
var params =new Object();
var MAXCKTS = 12;
params['MAXCKTS']=MAXCKTS;
params['boostSetpt']=74;
params['holdForDays']=30;

//var bohoA = new Array();
var bohoA = new Object();
var bohoS ="doogypoo";
var bohoM="nothing to say";
var releaseCkt;
var anc =""; 
var progToggle=0;

var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
var sday = ["Su", "M", "T", "W", "Th", "F", "S" ];
var daysi = [0,0,0,0,0,0,0];
var tempA =new Array();

$('#main-page').live('pageinit', function(event) {
	console.log('in live pageinit for main-page');
	//console.log(b64.livingroom);
	//getParams();
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
		//getData();
		hid=$('.head-rm-name').data("rmid");
		refreshRoom(prev(hid));
	  	return false;
	});
	$(".arm-next").click(function() {
		//getData();
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
		console.log("clicked button-boost");	
		hoSetpt=$("#slider-setpt").val();	
		bft=$("#datetime-set-til").val();
		bst=new Date();
		bs_time=Date.parse(bst)/1000;
		if (bft.length==0){
			bft=new Date();
			bft.setDate(bft.getDate() + params['holdForDays']);
		}
		bs_time=Date.parse(bst)/1000;
		bf_time=Date.parse(bft)/1000;
		console.log(bst);
		console.log(bft);
		//console.log(bs_time);
		//console.log(bf_time);
		console.log(hoSetpt);
		ckt=$('.head-rm-name').data("rmid");	
		//boho[ckt]=hoSetpt;
		bohoA.feed=feed;
		bohoA.ckt=ckt;
		bohoA.start= bs_time;
		bohoA.finish=bf_time;
		bohoA.setpt=f2a(hoSetpt);
		console.log(bohoA);
		//console.log(boho);
		bohoS= JSON.stringify(bohoA);
		//bohoS='{"feed":"'+feed+'","ckt":'+ckt+',"start":'+bs_time+',"finish":'+bf_time+',"setpt":'+f2a(hoSetpt)+'}';
		bohoM ="Hold "+rooms[ckt].rname+" at "+hoSetpt+"&deg;  until "+bft;
		console.log(bohoS);
		console.log(bohoM)
		$('.bohoM').html(bohoM);
		$('.hold-all-yes').show();
		$.mobile.changePage($("#dialog-boho"), "pop", true, true);
	});	
	$(".release").click(function() {
		/*delete records from holds for this room or all rooms, send current room id */
		releaseM = "Release boosts and holds  for this room or all rooms";
		$('.releaseM').html(releaseM);
		releaseCkt=$('.head-rm-name').data("rmid");	
		$.mobile.changePage($("#dialog-release"), "pop", true, true);
	});
	$(".button-boost").click(function() {
		console.log("clicked button-boost");		
		bst=$("#time-boost").val();
		d=new Date();
		when='now';
		if (bst.length>0){
			hr =bst.split(':')[0];
			min = bst.split(':')[1];
			d.setHours(hr);
			d.setMinutes(min);
			when='at '+bst;
		}
		forhrs=$("#slider-boost-hrs").val();
		bs_time=Date.parse(d)/1000;
		bf_time=bs_time+forhrs*60*60;
		console.log(params['boostSetpt']);
		ckt=$('.head-rm-name').data("rmid");	
		//boho[ckt]=params['boostSetpt'];
		bohoA.feed=feed;
		bohoA.ckt=ckt;
		bohoA.start= bs_time;
		bohoA.finish=bf_time;		
		bohoA.setpt=f2a(params['boostSetpt']);
		console.log(bohoA);
		bohoS= JSON.stringify(bohoA);
		//bohoS='{"feed":"'+feed+'","ckt":'+ckt+',"start":'+bs_time+',"finish":'+bf_time+',"setpt":'+f2a(hoSetpt)+'}';
		bohoM ="Boost "+rooms[ckt].rname+" to "+params['boostSetpt']+"&deg; "+when+" for "+forhrs+" hour(s)";
		console.log(bohoS);
		console.log(bohoM);
		$('.bohoM').html(bohoM);
		$('.hold-all-yes').hide();
		$.mobile.changePage($("#dialog-boho"), "pop", true, true);	
	  	return false;
	});	
	//-------------prog section------------------
	$(".button-prog").click(function() {
		/*delete records from holds for this room or all rooms, send current room id */
		progM = "Release boosts and holds  for this room or all rooms";
		$('.progM').html(progM);
		progCkt=$('.head-rm-name').data("rmid");	
		//$('html, body').animate({
         	//scrollTop: $(".prog-div").offset().top
     	//}, 200);
		$.mobile.changePage($("#dialog-prog"), "pop", true, true);
	});	
	$(".prog-day a.d").click(function() {
		console.log("clicked a day button");
		var ddd;
		var dow;
	    var daySelected = $(this).data("daySelected");
	    if ( daySelected == "1"  ) {
	        $(this).data("daySelected","0");
	        $(this).removeClass('sel');
	        ddd=$(this)[0];//same as getElementById
	        console.log($(this).data("daySelected"));
	        dow = ddd.dataset.dow;
	        console.log(dow);
	        daysi[dow]=0;
	     }else {
	        $(this).data("daySelected","1");
	        $(this).addClass('sel');
	        ddd=$(this)[0];//same as getElementById
	        console.log($(this).data("daySelected"));
	        dow = ddd.dataset.dow;
	        console.log(dow);
	        daysi[dow]=1;
	    }
	    console.log(daysi);			
	});
	$(".prog-day a.d-button").click(function() {
		console.log("clicked a everyday button");
		var ddd;
	    var daySelected = $(this).data("daySelected");
		if ( daySelected === "1"  ) {	    
	        $(this).data("daySelected","0");
	        $(".prog-day a.d").data("daySelected","0");
	        $(".prog-day a.d").removeClass('sel');
	        console.log($(this).data("daySelected"));
	        daysi = [0,0,0,0,0,0,0];
	    }else {
	    	$(this).data("daySelected","1");
	    	$(".prog-day a.d").data("daySelected","1");
	        $(".prog-day a.d").addClass('sel');
	        console.log($(this).data("daySelected"));
	        daysi = [1,1,1,1,1,1,1];
        }
        console.log(daysi);
	});	
	$(".prog-day a.wd-button").click(function() {
		console.log("clicked a weekday button");
		var ddd;
	    var daySelected = $(this).data("daySelected");
		if ( daySelected === "1"  ) {	    
	        $(this).data("daySelected","0");
	        $(".prog-day a.wd").data("daySelected","0");
	        $(".prog-day a.wd").removeClass('sel');
	        console.log($(this).data("daySelected"));
	        for (i=1;i<6;i++){daysi[i]=0;}
	    }else {
	    	$(this).data("daySelected","1");
	    	$(".prog-day a.wd").data("daySelected","1");
	        $(".prog-day a.wd").addClass('sel');
	        console.log($(this).data("daySelected"));
	        for (i=1;i<6;i++){daysi[i]=1;}
        }
        console.log(daysi);		
	});
	$(".prog-day a.we-button").click(function() {
		console.log("clicked a weekend button");
		var ddd;
	    var daySelected = $(this).data("daySelected");
		if ( daySelected === "1"  ) {	    
	        $(this).data("daySelected","0");
	        $(".prog-day a.we").data("daySelected","0");
	        $(".prog-day a.we").removeClass('sel');
	        console.log($(this).data("daySelected"));
	        daysi[0]=0; daysi[6]=0;
	    }else {
	    	$(this).data("daySelected","1");
	    	$(".prog-day a.we").data("daySelected","1");
	        $(".prog-day a.we").addClass('sel');
	        console.log($(this).data("daySelected"));
	        daysi[0]=1; daysi[6]=1;
        }
        console.log(daysi);		
	});	
	$(".prog-tes li").click(function() {
		time=$(':nth-child(2)', $(this)).html();
		temp=($(':nth-child(3)', $(this)).html()).substring(0,2);
		alert(temp+"clicked it "+time);
	});	
	$("#tite-add").click(function() {
		too=new Object();
		too['time']=$('#prog-t').val(); //"7:30";
		too['temp']=$('#prog-te').val(); 
		tempA.push(too);
		len=tempA.length-1;
		newTite ='	<li><a href="#" data-ti="'+len+'" ><img src="img/icons/pencil.png" title="edit" height="20px" width="20px"/></a><span>'+too['time']+' </span><span>'+too['temp']+' &deg;</span></li>';
		$('.prog-tes ul').append(newTite);
		console.log(newTite);
	});
	$("#tite-clear").click(function() {
		tempA.length =0;
		$('.prog-tes ul').empty();
		console.log(tempA);
	});					

});//end of aroom pageinit	

$('#dialog-release').live('pageinit', function(event) {
	$(".release-this").click(function() {
		ckt=releaseCkt;
		dhStr='feed='+feed+'&ckt='+ckt;
		console.log(dhStr);
		$.get("../services/deleteHold.php",  dhStr).done(function(data){
  			alert("Data Loaded: " + data);
		});
		$.mobile.changePage($("#aroom"));
	  	return false;
	});
	$(".release-all").click(function() {
		ckt=99;
		dhStr='feed='+feed+'&ckt='+ckt;
		console.log(dhStr);
		$.get("../services/deleteHold.php",  dhStr).done(function(data){
  			alert("Data Loaded: " + data);
		});		
		$.mobile.changePage($("#aroom"));		
	  	return false;
	});	
});//end of pageinit????

$('#dialog-prog').live('pageinit', function(event) {
	$(".prog-this").click(function() {
		progtest();
		$.mobile.changePage($("#aroom"));
	  	return false;
	});
	$(".prog-all").click(function() {	
		anc = $('a#prog-all').attr('anchor');
		console.log(anc);
		$.mobile.changePage($("#aroom"));	
	  	return false;
	});	

});//end of dialog-prog pageinit????
	
$('.test-buttons').live('pageinit', function(event) {	
	$(".hold-yes").click(function() {	
		console.log("clicked hold-yes");		
		holdStr=bohoS;
		console.log(holdStr);
		$.post("../services/hold.php", {data: holdStr}).done(function(data){
  			//alert("Data Loaded: " + data);
		});
		$.mobile.changePage($("#aroom"));
	  	return false;
	});
	$(".hold-all-yes").click(function() {	
		console.log("clicked hold-all-yes");		
		bohoA.ckt=99;
		console.log(bohoA);
		bohoS= JSON.stringify(bohoA);
		holdStr=bohoS;
		console.log(holdStr);
		$.post("../services/hold.php", {data: holdStr}).done(function(data){
  			//alert("Data Loaded: " + data);
		});
		$.mobile.changePage($("#aroom"));
	  	return false;
	});				
});//end of pageinit????

$(document).on('pageshow', '#aroom', function (e) {
	console.log("in pageshow");
	target=$('#button-prog').get(0).offsetTop;
	console.log(target);
    //var target = $(localStorage.anchor).get(0);
    if(anc.length>0){
	 	$('html, body').animate({
	     	scrollTop: $(anc).offset().top-95
	 	}, 1000);  
	 	anc=""; 	
    }
});
	
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
function s2f(temp) {
	//console.log(temp);
	if (temp==null || temp==0){
		tftemp="--";
	}else {tftemp = Math.round(temp/8*9/5+32);}	
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
	$(".button-setpt span").html(s2f(tom.setpt)+"&deg;");
	$(".button-boost span").html(params['boostSetpt']+"&deg;");
	console.log(rooms[rid].rname);
	console.log(tom);	
}

function refreshRoom(rid){
	fillRoom(rid);
	//$('#aroom').listview('refresh');
}
function prev(hid){
	if (hid==0){
		hid= numrooms-1;
		//getData();
	}else{hid--;}
	console.log(hid);
	return hid;
}
 function next(hid){
	if (hid==numrooms-1){
		hid=0;
		getData();
	}else{hid++;} 
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

function progtest(){
	console.log("in progtest");		
	sched= new Object();
	ts=new Object();
	ts.time = "10:30";
	ts.setpt = "157";
	day = new Array();
	day[0]=ts;
	day[6] =ts;
	ckt= new Array();
	ckt[0] =day; 
	ckt[11] =day; 
	sched.feed= "80302";
	sched.name = "current";
	sched.ckts= ckt;
	console.log(day);
	console.log(ckt);
	console.log(sched);
	console.log(sched.ckts[11]);
	console.log(sched.ckts[11][0].time);
//{"feed":"80302","ckts":[[{"time":"9:30","setpt":"147"},null,null,null,null,null,{"time":"9:30","setpt":"147"}],null,null,null,null,null,null,null,null,null,null,[{"time":"9:30","setpt":"147"},null,null,null,null,null,{"time":"9:30","setpt":"147"}]]}
	schedJ =JSON.stringify(sched);
	console.log(schedJ);
	console.log(ckt.length);
	console.log(sched.ckts[11]==null);
	console.log(sched.ckts[11][7]==null);
	$.post("../services/newProg.php", {data: schedJ}).done(function(data){
			alert("Data Loaded: " + data);		
	});
}	