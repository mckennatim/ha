feed = "80302";
day = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
sday = ["Su", "M", "T", "W", "Th", "F", "S" ];
$('#main-page').live('pageinit', function(event) {
	console.log('in live pageinit for main-page');
	getRoomList();
	//placeLinks();	
	$('#rooms').listview('refresh');
});//end of pageinit????

function getRoomList(qqrep) {
	nqrep = 'path='+feed+'&room=all';
	console.log(nqrep);
	$.getJSON('http://homecontrol.sitebuilt.net/services/getData.php', nqrep, function(data) {
		//foods = data.items;
		console.log("in getJSON data function");
		console.log(data['items'][0]);
		therooms = data.items;
		console.log(therooms[3]);
		/*
	   	 <ul id="rooms" class="current" data-role="listview" data-inset="true" data-filter="false">>
	   	 	[circuit] => ckt0
            [id] => 194012
            [feed] => 80302
            [room] => livingroom
            [defsetpt] => 152
            [afeed] => 80302
            [temp] => 320
            [relay] => 0
            [setpt] => 151
            [time] => 1361911019
            [oldroom] => livingroom
            <li><a href="#">
                <img src="../../_asset s/img/apple.png">
                <h2>iOS 6.1</h2>
                <p>Apple released iOS 6.1</p>
                <p class="ui-li-aside">iOS</p>
            </a></li> -->
            */
		$.each(therooms, function(index, room) {
			
			if (room.temp==null){
				ftemp="no reading";
			}else {
				ftemp = Math.round(room.temp/16*9/5+32)+"&deg F";
			}
			if (room.setpt==null){
				stemp="no setpt";
			}else {
				stemp=Math.round(room.setpt/8*9/5+32)+"&deg F";
			}			
			if (room.relay==null){
				rell="not set";
			}else {
				if (room.relay = 0){
					rell="off";
				}else{
					rell="on";
				}	
			}	
			na = new Date(room.time*1000);
			now= sday[na.getDay()]+na.getDate()+' '+na.getHours()+':'+na.getMinutes();
			$('#rooms').append('<li><a href="#"><img src="img/small/'+room.room+'.JPG"><span class="temp"> <h2>' + ftemp + ' </h2></span><p><big>'+room.rname+'</big> <small> ' +now+  '</small></p><p class="ui-li-aside">'+stemp+'</p></a></li>');
		});
		/*
		$.each(therooms, function(index, room) {
			$('#rooms').append('<li><a href="#"><img src="../../_asset s/img/apple.png"><h2>iOS 6.1</h2><p>Apple released iOS 6.1</p><p class="ui-li-aside">iOS</p></a></li>');
		});
		*/
		$('#rooms').listview('refresh');
	});	
}

function placeLinks() {
	$('#sales').empty();   
	for(var i=0, len=localStorage.length; i<len; i++) {
		console.log(i);
	    var key = localStorage.key(i);	    
	    if (key.substr(0,4)=='LINK') {
	    	var value = localStorage[key];
	    	var lobj =JSON.parse(value);
	    	console.log('retrievedObject: ', JSON.parse(value));
	    	console.log(key + " => " + value);
	    	$('#sales').append('<li data-theme="d" alt="' +lobj.lat + ',' + lobj.lon + '" id="' +key + '"><a href="' + lobj.url + '"><p><span style="font-size: 1.7em;" class="rn">'  +  lobj.place + '</span><br/><span class="rv"> ' + lobj.address + '</span></p></a><a class="lob" data-role="button" data-icon="info" href="tel:' + lobj.phone + '">' + lobj.phone + '</a></li>');
	    }
	    $('#sales').listview('refresh');   
	}
}