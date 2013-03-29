console.log("line1 of ha.js");
var green ="rgba(38,162,43,.75)";
var orange= "rgba(153,0,10,.75)";
var blue= "rgba(50, 99,187,.75)";
var black= "rgba(0,0,0,.75)";
/*intialize app -- if not already in local storage*/
var params =new Object();
params['MAXCKTS']=12;
params['boostSetpt']=74;
params['holdForDays']=30;
var bohoA = new Object();
var bohoS ="doogypoo";
var bohoM="nothing to say";
var anc =""; 
var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
var sday = ["Su", "M", "T", "W", "Th", "F", "S" ];
var daysi = [0,0,0,0,0,0,0];

$('#main-page').live('pageinit', function(event) {
	console.log('in live pageinit for main-page');
	sys.load();
	sys.initMain();
	$('.temp-refresh').click(function() {
		console.log('just clicked temp-refresh button');
		sys.refreshState();
		$('#popupMenu').popup("close");
	});	
	$('.reload').click(function() {
		console.log('just clicked temp-reload button');
		$('#rooms').html('');
		sys.initMain();
		sys.refreshState();	
		$('#popupMenu').popup("close");
	});	
	$('.reset-app').click(function() {
		console.log('just clicked temp-reset button');
		localStorage.clear();
		sys.load();	
		$('#rooms').html('');
		sys.initMain();
		ssys.refreshState();	
		$('#popupMenu').popup("close");
	});		
	$('.room-li').click(function() {
		zone.load(jQuery(this).attr("id").substring(2));
		zone.goto();		
	});
});//end of pageinit????

$('#aroom').live('pageinit', function(event) {
	sys.load();
	console.log('in live pageinit for aroom');
	$(".arm-goup").click(function() {
		console.log("clicked top-rm");
	  $("html, body").animate({ scrollTop: 0 }, "slow");
	  return false;
	});
	$(".arm-prev").click(function() {
		slidethis($('#aroom'), 200,"left");
		zone.load(prev($('.head-rm-name').data("rmid")));
		zone.refresh();
	  	return false;
	});
	$(".arm-next").click(function() {
		slidethis($('#aroom'), 200,"right");
		zone.load(next($('.head-rm-name').data("rmid")));
		zone.refresh();
	  	return false;
	});	
	$('#aroom').on('swipeleft',function(event){
		slidethis($('#aroom'), 200,"left");
		zone.load(prev($('.head-rm-name').data("rmid")));
		zone.refresh();
	  	return false;		
	});
	$('#aroom').on('swiperight',function(event){
		slidethis($('#aroom'), 200,"right");
		zone.load(next($('.head-rm-name').data("rmid")));
		zone.refresh();
	  	return false;		
	});
	$("#slider-setpt").change(function(e){ //on moving slider	
		var s = $(this).val();
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
		bohoA.feed=sys.feed;
		bohoA.ckt=zone.idx;
		bohoA.start= bs_time;
		bohoA.finish=bf_time;
		bohoA.setpt=f2a(hoSetpt);
		bohoS= JSON.stringify(bohoA);
		bohoM ="Hold "+zone.state.rname+" at "+hoSetpt+"&deg;  until "+bft;
		$('.bohoM').html(bohoM);
		$('.hold-all-yes').show();
		$.mobile.changePage($("#dialog-boho"), "pop", true, true);
	});	
	$(".release").click(function() {
		/*delete records from holds for this room or all rooms, send current room id */
		releaseM = "Release boosts and holds  for this room or all rooms";
		$('.releaseM').html(releaseM);
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
		bohoA.feed=sys.feed;
		bohoA.ckt=zone.idx;
		bohoA.start= bs_time;
		bohoA.finish=bf_time;		
		bohoA.setpt=f2a(params['boostSetpt']);
		console.log(bohoA);
		bohoS= JSON.stringify(bohoA);
		bohoM ="Boost "+zone.state.rname+" to "+params['boostSetpt']+"&deg; "+when+" for "+forhrs+" hour(s)";
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
	        daysi = [0,0,0,0,0,0,0];
	    }else {
	    	$(this).data("daySelected","1");
	    	$(".prog-day a.d").data("daySelected","1");
	        $(".prog-day a.d").addClass('sel');
	        daysi = [1,1,1,1,1,1,1];
        }
	});	
	$(".prog-day a.wd-button").click(function() {
		var ddd;
	    var daySelected = $(this).data("daySelected");
		if ( daySelected === "1"  ) {	    
	        $(this).data("daySelected","0");
	        $(".prog-day a.wd").data("daySelected","0");
	        $(".prog-day a.wd").removeClass('sel');
	        for (i=1;i<6;i++){daysi[i]=0;}
	    }else {
	    	$(this).data("daySelected","1");
	    	$(".prog-day a.wd").data("daySelected","1");
	        $(".prog-day a.wd").addClass('sel');
	        for (i=1;i<6;i++){daysi[i]=1;}
        }
	});
	$(".prog-day a.we-button").click(function() {
		var ddd;
	    var daySelected = $(this).data("daySelected");
		if ( daySelected === "1"  ) {	    
	        $(this).data("daySelected","0");
	        $(".prog-day a.we").data("daySelected","0");
	        $(".prog-day a.we").removeClass('sel');
	        daysi[0]=0; daysi[6]=0;
	    }else {
	    	$(this).data("daySelected","1");
	    	$(".prog-day a.we").data("daySelected","1");
	        $(".prog-day a.we").addClass('sel');
	        daysi[0]=1; daysi[6]=1;
        }
        console.log(daysi);		
	});

	$("#tite-add").click(function() {
		titeObj.add();
		titeObj.bindEdit();
	});
	
	$("#tite-clear").click(function() {
		titeObj.clrArr();
		titeObj.clrDisp();
	});	
	
	$("#tite-sort").click(function() {
		titeObj.clrDisp();
		titeObj.sort();
		titeObj.dispAll();
	});		
});//end of aroom pageinit AAAAAAAAAAAAROOOOOMs	

$('#dialog-release').live('pageinit', function(event) {
	$(".release-this").click(function() {
		var ckt = zone.idx;
		dhStr='feed='+feed+'&ckt='+zone.idx;
		console.log(dhStr);
		$.get("../services/deleteHold.php",  dhStr).done(function(data){
		});
		$.mobile.changePage($("#aroom"));
	  	return false;
	});
	$(".release-all").click(function() {
		ckt=99;
		dhStr='feed='+feed+'&ckt='+ckt;
		console.log(dhStr);
		$.get("../services/deleteHold.php",  dhStr).done(function(data){
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
		});
		$.mobile.changePage($("#aroom"));
	  	return false;
	});				
});//end of pageinit????

$(document).on('pageshow', '#aroom', function (e) {
	console.log("in pageshow");
	target=$('#button-prog').get(0).offsetTop;
    if(anc.length>0){
	 	$('html, body').animate({
	     	scrollTop: $(anc).offset().top-95
	 	}, 1000);  
	 	anc=""; 	
    }
});

function a2f(temp) {
	if (temp==null || temp==0){
		tftemp="--";
	}else {tftemp = Math.round(temp/16*9/5+32);}	
	return tftemp;
}
function s2f(temp) {
	if (temp==null || temp==0){
		tftemp="--";
	}else {tftemp = Math.round(temp/8*9/5+32);}	
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
	$('.head-rm-name').html(rom.rname);
	$('.head-rm-name').data("rmid",rid);
	$('.head-temp').html(a2f(tom.temp)+"&deg");
	ima = b64[rom.room];
	imag='<img src="data:image/jpeg;charset=utf-8;base64, '+ima+'">';
	$('.head-img').html(imag);
	$(".button-setpt span").html(s2f(tom.setpt)+"&deg;");
	$(".button-boost span").html(params['boostSetpt']+"&deg;");
}


function prev(hid){
	if (hid==0){
		hid= sys.numzones-1;
	}else{hid--;}
	return hid;
}
 function next(hid){
	if (hid==sys.numzones-1){
		hid=0;
	}else{hid++;} 
	return hid;	
}
function slidethis(target, speed, direction){
	if (direction=="left"){
		gofirst="-=40px";
		thengo="+=40px";
	}else{
		gofirst="+=40px";
		thengo="-=40px";
	}
	$(target).animate({marginLeft: gofirst},
	{			
		duration : speed,
		complete: function()
		{
			target.animate({marginLeft: thengo},
			{
				duration : speed
			});
		}
	});
}
function time2PM(str){
	var hr =parseInt(str.substring(0,2));
	var min =str.substring(2,5);
	var hre= " AM";
	if (hr>12){
		hr = hr-12;
		hre = " PM";
	} else if(hr==12){
		hre = " PM";
	}
	if (hr==0) hr=12;
	if (hr<10) {hr="&nbsp;&nbsp;"+hr+"";}
	var ampm = hr+min+hre;
	return ampm;
}

var titeObj ={
	tisel : '#prog-t',
	tesel : '#prog-te',
	ulsel : '.prog-tes ul',
	lisel : '.prog-tes ul li',
	idx : 0,
	arr : new Array(),
	push : function(){
		var too=new Object();
		var timel=$(this.tisel).val(); //"7:30";		
		var time = time2PM(timel);
		var templ = $(this.tesel).val();
		too['time']=timel;
		too['temp']=templ; 
		this.arr.push(too);		
	},
	add : function(){
		this.push();
		this.idx = this.arr.length-1;
		this.disp(this.idx);		
	},
	bindEdit : function(){
		var sel = $(this.lisel);
		sel.unbind('click');
		sel.bind('click', function(){
			ddd=$(this)[0];
			var ti = ddd.dataset.ti;
			var timl=ddd.dataset.timl;
			var templ=ddd.dataset.temp;
			titeObj.arr.splice(ti,1);
			$(titeObj.tisel).val(timl);
			$(titeObj.tesel).val(templ);
			$(this).empty();
		});		
	},
	disp : function(idx){
		var temp = this.arr[idx]['temp'];
		var timel = this.arr[idx]['time'];
		var timep = time2PM(timel);
		newTite ='	<li  data-ti="'+this.idx+'" data-timl="'+timel+'" data-temp="'+temp+'"><a href="#" ><img src="img/icons/pencil.png" title="edit" height="20px" width="20px"/></a><span>'+timep+' </span><span>'+temp+' &deg;</span></li>';
		$(this.ulsel).append(newTite);
		this.bindEdit($(this.lisel));		
	},
	dispAll : function(){
		for (i=0;i<this.arr.length;i++){this.disp(i);}
	},
	clrArr : function(){this.arr.length =0;},
	clrDisp : function(){$(this.ulsel).empty();},
	sort : function(){
		this.arr.sort(function(a, b){
			var timeA=parseInt(a.time.substring(0,2)), timeB=parseInt(b.time.substring(0,2))
			return timeA-timeB //sort by date ascending
		});	
	}
};

var zone = {
	idx : 99,
	state : new Object(),
	load : function(i){
		this.idx = i;
		this.state = sys.states[i];
		return true;
	},
	head : function(){
		$('.head-rm-name').html(this.state.rname);
		$('.head-rm-name').data("rmid",this.idx);
		$('.head-temp').html(a2f(this.state.temp)+"&deg");
		ima = sys.b64[zone.state.room];
		imag='<img src="data:image/jpeg;charset=utf-8;base64, '+ima+'">';
		$('.head-img').html(imag);	
		$(".button-setpt span").html(s2f(zone.state.setpt)+"&deg;");
		$(".button-boost span").html(params['boostSetpt']+"&deg;");		
		return true;	
	},
	goto : function(){
		this.refresh();
		$.mobile.changePage($("#aroom"), "slide", true, true);
	},
	refresh : function(){
		this.head();
	}
	
}
var sys = {
	feed : 0,
	states : new Object(),
	zones : new Object(),
	progs : new Object(),
	numzones : 0,
	maxckts : params['MAXCKTS'],
	params : params,
	holds : new Array(),
	b64 :new Object(),
	loadFeed : function(){
		/* roomlist SECTION  - load if ! in localstorage*/
		if ( localStorage.getItem('feed')) {
			console.log("feed is in local storage");
			this.feed = JSON.parse(localStorage.feed);
			this.loadZones();
		}
		else {
			localStorage.setItem('feed',"80302");
			this.feed="80302";
			this.loadZones();
		}
		return true;
	},
	loadZones : function(){
		/* roomlist SECTION  - load if ! in localstorage*/
		if ( localStorage.getItem('zones')) {
			console.log("zones is in local storage");
			this.zones = JSON.parse(localStorage.getItem('zones'));
			this.numzones=(this.zones.length); 
			this.loadProgs();
		}
		else {
			console.log("need to goto server for zones data");
			nqrep= 'path='+this.feed; //+'room=all';
			console.log(nqrep);
			$.getJSON('http://homecontrol.sitebuilt.net/services/getData.php', nqrep, function(data) {
				console.log("in getJSON data function");
				this.zones =(data['items']);
				this.numzones=(this.zones.length); 
				localStorage.setItem('zones',JSON.stringify(this.zones));
				this.loadProgs();
			});	
		}
		return true;
	},
	loadProgs : function(){
		/* roomlist SECTION  - load if ! in localstorage*/
		if ( localStorage.getItem('progs')) {
			console.log("progs is in local storage");
			this.progs = JSON.parse(localStorage.getItem('progs'));
			this.loadB64();
		}
		else {
			console.log("need to goto server for zones data");
			this.loadB64();
		}
		this.numzones=(this.zones.length); 
		return true;
	},	
	loadB64 : function(){
		/* room images SECTION  - store each room image in its own localstorage if its not there */
		for (i=0;i<this.numzones;i++){
			rfile ="b64_"+this.zones[i].room;
			rnam = (rfile.substring(4));
			if ( localStorage.getItem(rfile)) {
				this.b64[rnam]=  localStorage.getItem(rfile);
			}else{
				//console.log("no "+rfile);
				this.b64[rnam] = $.ajax({url: "img/base64/"+rnam+".txt", async: false}).responseText;
				localStorage.setItem(rfile, this.b64[rnam]);
			}
		}
		this.refreshState();
		return true;	
	},	
	load: function(){
		this.loadFeed();//cascades through Zones, Progs,B64, and refreshState()
	},
	initMain : function(){
		$.each(this.zones, function(index, zone) {
			ima = sys.b64[zone.room];
			$('#rooms').append('<li id="rm'+index+'" class="room-li"><a href="#"><img src="data:image/jpeg;charset=utf-8;base64, '+ima+'"><span class="temp"> <h2><span class="temp-disp"></span> &deg F </h2></span><p class="rname">'+zone.rname+'<span class="timest"></span></p><p class="ui-li-aside setpt"><span class="setpt-refresh"></span>&deg F</p></a></li>');
		});
		$('#rooms').listview('refresh');	
		return true;	
	},	
	refreshState : function(){
		nqrep = 'path='+this.feed+'&room=all';
		console.log("in sys.refreshState()" + nqrep);
		$.getJSON('http://homecontrol.sitebuilt.net/services/getData.php', nqrep, function(data) {
			sys.states = data.items;
			sys.updMain();	
			zone.load(0);
			zone.refresh();
		});	
		return true;			
	},
	updMain : function(){
		$.each(this.states, function(index, state) {
			var ftemp = a2f(state.temp);			
			var stemp = a2f(state.setpt*2)	
			if (state.relay==null){
				rell="not set";
				bkg="black";
			}else {
				if (state.relay == 0){
					rell="off"; bkg=green;
				}else{
					rell="on"; 
					bkg=orange; 
				}
			}	
			na = new Date(state.time*1000);
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
		return true;
	}
};

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
	progs = new Object();	
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
	progs[sched.name] = sched;
	console.log(day);
	console.log(ckt);
	console.log(sched);
	console.log(sched.ckts[11]);
	console.log(sched.ckts[11][0].time);
//{"feed":"80302","ckts":[[{"time":"9:30","setpt":"147"},null,null,null,null,null,{"time":"9:30","setpt":"147"}],null,null,null,null,null,null,null,null,null,null,[{"time":"9:30","setpt":"147"},null,null,null,null,null,{"time":"9:30","setpt":"147"}]]}
	schedJ = JSON.stringify(sched);
	progsJ =JSON.stringify(progs);
	localStorage.progs=progsJ;	
	console.log(progsJ);
	console.log(ckt.length);
	console.log(sched.ckts[11]==null);
	console.log(sched.ckts[11][7]==null);
	$.post("../services/newProg.php", {data: schedJ}).done(function(data){
			alert("Data Loaded: " + data);		
	});
}
//progtest();
