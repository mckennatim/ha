console.log("line1 of ha.js");
var green ="rgba(38,162,43,.75)";
var orange= "rgba(153,0,10,.75)";
var blue= "rgba(50, 99,187,.75)";
var black= "rgba(0,0,0,.75)";
/*intialize app -- if not already in local storage*/
var params =new Object();
params['MAXCKTS']=12;
params['boostSetpt']=68;
params['holdForDays']=30;
var bohoA = new Object();
var bohoS ="doogypoo";
var bohoM="nothing to say";
var anc =""; 
var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat" ];
var sday = ["Su", "M", "T", "W", "Th", "F", "S" ];

$('#main-page').live('pageinit', function(event) {
    console.log('in live pageinit for main-page');
    sys.load();
    $.mobile.loadPage("#aroom");
    //setTimeout(console.log('back in live pageinit for main-page'),2000);
    console.log('back in live pageinit for main-page');
    sys.initMain();
    $('.temp-refresh').click(function() {
        console.log('just clicked temp-refresh button');
        sys.refreshState();
        $('#popupMenu').popup("close");
    }); 
    $('.reload').click(function() {
        console.log('just clicked temp-reload button');
        window.location.reload(true);
        $('#popupMenu').popup("close");
    }); 
    $('.reset-app').click(function() {
        console.log('just clicked temp-reset button');
        localStorage.clear();

        $('#popupMenu').popup("close");
    });     
    $('.room-li').click(function() {
        console.log('in rm li');
        console.log(jQuery(this).attr("id").substring(2));
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
    $(".arm-refresh").click(function(){
        rmid=$('.head-rm-name').data("rmid");
        //sys.refreshProgs();
        //sys.refreshState();
        zone.load(rmid);
        zone.refresh();
        console.log("after window load.refresh");
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
        //slidethis($('#aroom'), 200,"left");
        //zone.load(prev($('.head-rm-name').data("rmid")));
        zone.refresh();
        return false;       
    });
    $('#aroom').on('swiperight',function(event){
        //slidethis($('#aroom'), 200,"right");
        //zone.load(next($('.head-rm-name').data("rmid")));
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
        zone.boho.start= bs_time;
        zone.boho.finish=bf_time;       
        zone.boho.setpt=hoSetpt;        
        bohoM ="Hold "+zone.state.rname+" at "+hoSetpt+"&deg;  until "+bft;
        $('.bohoM').html(bohoM);
        $.mobile.changePage($("#dialog-setpt"), "pop", true, true);
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
        zone.boho.start= bs_time;
        zone.boho.finish=bf_time;       
        zone.boho.setpt=params['boostSetpt'];
        bohoM ="Boost "+zone.state.rname+" to "+params['boostSetpt']+"&deg; "+when+" for "+forhrs+" hour(s)";
        $('.boost-message').html(bohoM);
        $.mobile.changePage($("#dialog-boost"), "pop", true, true);  
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
        var daySelected = $(this).data("daySelected");
        var dow;
        console.log("clicked a day " + daySelected);
        if (zone.mod){
            var ddd;
            if ( daySelected == "1"  ) {
                $(this).data("daySelected","0");
                $(this).removeClass('sel');
                ddd=$(this)[0];//same as getElementById
                console.log($(this).data("daySelected"));
                dow = ddd.dataset.dow;
                console.log(dow);
                zone.daysi[dow]=0;
             }else {
                $(this).data("daySelected","1");
                $(this).addClass('sel');
                ddd=$(this)[0];//same as getElementById
                console.log($(this).data("daySelected"));
                dow = ddd.dataset.dow;
                console.log(dow);
                zone.daysi[dow]=1;
            }
            console.log(zone.daysi);   
        } else{
            $(this).data("daySelected","1");
            dow =$(this)[0].dataset.dow;
            console.log("trying to show just one " + dow);
            zone.show(dow);
        }      
    });
    $(".prog-day a.d-button").click(function() {
        console.log("clicked a everyday button " +zone.mod);
        if (zone.mod){
            var ddd;
            var daySelected = $(this).data("daySelected");
            if ( daySelected === "1"  ) {       
                $(this).data("daySelected","0");
                $(".prog-day a.d").data("daySelected","0");
                $(".prog-day a.d").removeClass('sel');
                zone.daysi = [0,0,0,0,0,0,0];
            }else {
                $(this).data("daySelected","1");
                $(".prog-day a.d").data("daySelected","1");
                $(".prog-day a.d").addClass('sel');
                zone.daysi = [1,1,1,1,1,1,1];
            }
        } else {
            console.log("button is disabled");
        }

    }); 
    $(".prog-day a.wd-button").click(function() {
        console.log("clicked a weekday button " +zone.mod);
        if (zone.mod){        
            var ddd;
            var daySelected = $(this).data("daySelected");
            if ( daySelected === "1"  ) {       
                $(this).data("daySelected","0");
                $(".prog-day a.wd").data("daySelected","0");
                $(".prog-day a.wd").removeClass('sel');
                for (i=1;i<6;i++){zone.daysi[i]=0;}
            }else {
                $(this).data("daySelected","1");
                $(".prog-day a.wd").data("daySelected","1");
                $(".prog-day a.wd").addClass('sel');
                for (i=1;i<6;i++){zone.daysi[i]=1;}
            }
        } else {
            console.log("button is disabled");
        }
    });
    $(".prog-day a.we-button").click(function() {
        console.log("clicked a weekend button " +zone.mod);
        if (zone.mod){
            var ddd;
            var daySelected = $(this).data("daySelected");
            if ( daySelected === "1"  ) {       
                $(this).data("daySelected","0");
                $(".prog-day a.we").data("daySelected","0");
                $(".prog-day a.we").removeClass('sel');
                zone.daysi[0]=0; zone.daysi[6]=0;
            }else {
                $(this).data("daySelected","1");
                $(".prog-day a.we").data("daySelected","1");
                $(".prog-day a.we").addClass('sel');
                zone.daysi[0]=1; zone.daysi[6]=1;
            }
            console.log(zone.daysi);     
        } else {
            console.log("button is disabled");
        }
    });

    $("#tite-add").click(function() {
        if (zone.mod){ 
            titeObj.add();
            titeObj.bindEdit();
        } else {
            console.log("button is disabled");
        }            
    });
    
    $("#tite-clear").click(function() {
        if (zone.mod){ 
            titeObj.clrArr();
            titeObj.clrDisp();
        } else {
            console.log("button is disabled");
        }
    }); 
    
    $("#tite-sort").click(function() {
        if (zone.mod){ 
            titeObj.clrDisp();
            titeObj.sort();
            titeObj.dispAll();
        } else {
            console.log("button is disabled");
        }    
    });   
    $("#tite-save").click(function() {
        if (zone.mod){ 
            zone.save();
            thisid='#zcl'+zone.idx;
            thisimg= thisid + ' img';
            ckimg='img/icons/ckbx-cked.gif';
            $(thisimg).attr('src',ckimg);
            sys.zonecked[thisid]=1;
            $(thisid).addClass('zsel');

        } else {
            console.log("button is disabled");
        }
    }); 
    $("#tite-modify").click(function() {
        if(zone.mod){
            console.log("change to view");
            zone.view();
        }else {
            console.log("change to modify");
            zone.modify();
        }
    }); 
    $(".zone-list li").click(function() {
        zid = $(this)[0].dataset.zid;
        iscked = sys.zonecked[zid];
        thisid= '#'+($(this).attr('id'));
        thisimg= thisid + ' img';
        ckimg='img/icons/ckbx-cked.gif';
        uckimg='img/icons/ckbx-empty.gif';
        if (iscked==0){ 
            $(thisimg).attr('src',ckimg);
            sys.zonecked[zid]=1;
            $(thisid).addClass('zsel');
        } else {
            $(thisimg).attr('src',uckimg);
            sys.zonecked[zid]=0;
            $(thisid).removeClass('zsel');
        }
    }); 
    $("#prog-server-button").click(function() {
        console.log('save to server button'); 
        sys.prog2server();
        $(".zone-list li").removeClass('zsel');
        $(".zone-list li img").attr('src','img/icons/ckbx-empty.gif');
    });
                   
});//end of aroom pageinit AAAAAAAAAAAAROOOOOMs 

$('#dialog-release').live('pageinit', function(event) {
    $(".release-this").click(function() {
        var ckt = zone.idx;
        dhStr='feed='+sys.feed+'&ckt='+zone.idx;
        console.log(dhStr);
        delete sys.bohos[ckt];
        localStorage.setItem('bohos',JSON.stringify(sys.bohos));           
        $.get("../services/deleteHold.php",  dhStr).done(function(data){
        });
        $.mobile.changePage($("#aroom"));
        return false;
    });
    $(".release-all").click(function() {
        ckt=99;
        dhStr='feed='+sys.feed+'&ckt='+ckt;
        console.log(dhStr);
        delete sys.bohos;
        sys.bohos = sys.blank12;
        localStorage.setItem('bohos',JSON.stringify(sys.bohos));         
        $.get("../services/deleteHold.php",  dhStr).done(function(data){
        });     
        $.mobile.changePage($("#aroom"));       
        return false;
    }); 
});//end of pageinit????

$('#dialog-boost').live('pageinit', function(event) {   
    $(".boost-yes").click(function() {   
        console.log("clicked hold-yes");
        holdObj=zone.boho;
        holdObj.feed=sys.feed;
        holdObj.ckt=zone.idx;        
        holdStr=JSON.stringify(holdObj);
        sys.bohos[zone.idx]=zone.boho;
        localStorage.setItem('bohos',JSON.stringify(sys.bohos));
        console.log(holdStr);
        $.post("../services/hold.php", {data: holdStr}).done(function(data){
        });
        $.mobile.changePage($("#aroom"));
        return false;
    });            
});//end of pageinit????

$('#dialog-setpt').live('pageinit', function(event) {
    $(".hold-yes").click(function() {
        holdObj=zone.boho;
        holdObj.feed=sys.feed;
        holdObj.ckt=zone.idx;        
        holdStr=JSON.stringify(holdObj);        
        sys.bohos[zone.idx]=zone.boho;
        localStorage.setItem('bohos',JSON.stringify(sys.bohos));           
        console.log("clicked hold-yes");        
        console.log(holdStr);
        $.post("../services/hold.php", {data: holdStr}).done(function(data){
        });
        $.mobile.changePage($("#aroom"));
        return false;
    });
    $(".hold-all-yes").click(function() {
        for (i=0;i<sys.maxckts;i++){
            sys.bohos[i]=zone.boho;
        }
        localStorage.setItem('bohos',JSON.stringify(sys.bohos));           
        console.log("clicked hold-all-yes");        
        holdObj=zone.boho;
        holdObj.feed=sys.feed;
        holdObj.ckt=99;        
        holdStr=JSON.stringify(holdObj);
        console.log(holdStr);
        $.post("../services/hold.php", {data: holdStr}).done(function(data){
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
    


$(document).on('pageshow', '#aroom', function (e) {
    console.log("in pageshow");
    target=$('#prog-server-button').get(0).offsetTop;
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

    add : function(){
        if (!this.arr){this.arr=new Array();}
        var idx = this.arr.length; 
        var too=new Object();
        var timel=$(this.tisel).val(); //"7:30";        
        var time = time2PM(timel);
        var templ = $(this.tesel).val();
        too['clock']=timel;
        too['setpt']=templ; 
        too['idx']=idx;
        this.arr.push(too); 
        console.log(this.arr[idx]['clock']); 
        this.disp(idx);
    },
    del : function(i){

    },
    bindEdit : function(){
        var sel = $(this.lisel);
        sel.unbind('click');
        sel.bind('click', function(){
            ddd=$(this)[0];
            console.log('indec of this.li is '+ $(this).index())
            var ti = ddd.dataset.ti;
            console.log(ti);
            var timl=ddd.dataset.timl;
            var templ=ddd.dataset.temp;
            titeObj.arr.splice(ti,1);
            $(titeObj.tisel).val(timl);
            $(titeObj.tesel).val(templ);
            $(this).remove();
        });     
    },
    disp : function(idx){
        var temp = this.arr[idx]['setpt'];
        var timel = this.arr[idx]['clock'];
        var timep = time2PM(timel);
        var idx = this.arr[idx]['idx'];
        newTite ='  <li  data-ti="'+idx+'" data-timl="'+timel+'" data-temp="'+temp+'"><a href="#" ><img src="img/icons/pencil.png" title="edit" height="20px" width="20px"/></a><span>'+timep+' </span><span>'+temp+' &deg;</span></li>';
        $(this.ulsel).append(newTite);
        this.bindEdit($(this.lisel));       
    },
    dispAll : function(){
        if (this.arr){
            for (i=0;i<this.arr.length;i++){this.disp(i);}
        }
    },
    clrArr : function(){this.arr.length =0;},
    clrDisp : function(){$(this.ulsel).empty();},
    sort : function(){
        this.arr.sort(function(a, b){
            var timeA=parseInt(a.clock.substring(0,2)), timeB=parseInt(b.clock.substring(0,2))
            return timeA-timeB //sort by date ascending
        }); 
        this.reindex();
    },
    reindex : function(){
        for (i=0;i<this.arr.length;i++){
            this.arr[i]['idx']=i;
        }        
    }
};

var zone = {
    dayx : [0,0,0,0,0,0,0],
    daysi : [0,0,0,0,0,0,0],
    idx : 99,
    boho : new Object(),
    state : new Object(),
    prog : new Array(),
    mod : false,
    load : function(i){
        this.idx = i;
        this.state = sys.states[i];
        this.prog = sys.progs[sys.feed].current[i];
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
        this.mod = false;
        this.view();
        this.show(1);
    },
    ckMod :function(){
        if (this.mod){
            consloe.log("zone.mod is true");
            this.modify();
        }else{
            console.log("zone.mod is false");
            this.view();
        }
    },
    modify :  function(){
        console.log("seeting buttons for editing");
        this.mod = true;
        $(".view").css("opacity", "1.0");
        $('#tite-modify').html("By Day");
        $('#tite-modify').css("opacity", "1.0");
    },
    view : function(){
        console.log("seeting buttons for viewing");
        this.mod =false;
        $(".view").css("opacity", "0.5");
        $('#tite-modify').html("Modify");
        var i = 0;
        this.prog.forEach(function(entry){
            if(entry){
                zone.dayx[i]=1;
                //console.log("outline day");
                $('#but-day'+i).css("border-color", "orange");
            }
            i++;
        });      
    },
    show : function(i){
        //data("daySelected","1");
        $(".prog-day a.d").removeClass('sel');
        $('#but-day'+i).addClass('sel');
        this.daysi=[0,0,0,0,0,0,0]
        this.daysi[i]=1;
        titeObj.arr=this.prog[i];
        titeObj.sort();
        titeObj.clrDisp();
        titeObj.dispAll();
    },
    save : function(){
        for (i=0;i<7;i++){
            if (this.daysi[i]==1){
                this.prog[i]=titeObj.arr;
            }
        }
        sys.progs[sys.feed].current[this.idx]=this.prog;
        localStorage.setItem('progs',JSON.stringify(sys.progs));
        console.log('saved to local storage');
    },
    putDay :function(i){
        zone.prog[i]=this.arr[i];
    },
    getDay : function(i){
        this.prog[i] = titeObj.arr;
    },
    putDay :function(i){
        titeObj.arr.push(this.prog[i]);
        titeObj.dispAll();
        return true;
    },
};

var sys = {
    feed : 0,
    page : 0,
    states : new Object(),
    zones : new Object(),
    progs : new Object(),
    bohos : new Array(),
    current : new Object(),
    numzones : 0,
    zonecked : [0,0,0,0,0,0,0,0,0,0,0,0],
    blank12 : [null,null,null,null,null,null,null,null,null,null,null,null],
    maxckts : params['MAXCKTS'],
    params : params,
    holds : new Array(),
    b64 :new Object(),
    loadFeed : function(){
        /* roomlist SECTION  - load if ! in localstorage*/
        if ( localStorage.getItem('feed')) {
            console.log("feed is in local storage");
            this.feed = JSON.parse(localStorage.feed);
            //this.loadZones();
        }
        else {
            localStorage.setItem('feed',"80302");
            this.feed="80302";
            //this.loadZones();
        }
        return true;
    },
    loadZones : function(){
        /* roomlist SECTION  - load if ! in localstorage*/
        if ( localStorage.getItem('zones')){//&& !localStorage.getItem('zones')==undefined) {
            console.log("zones is in local storage");
            this.zones = JSON.parse(localStorage.getItem('zones'));
            this.numzones=(this.zones.length); 
            //this.loadProgs();
        }
        else {
            console.log("need to goto server for zones info");
            //nqrep= 'path='+this.feed; //+'room=all';
            nqrep = 'type=zone&feed='+this.feed;
            console.log(nqrep);
            $.getJSON('http://hvac.sitebuilt.net/services/get.php', nqrep, function(data) {
                console.log("in getJSON looking for zones");
                sys.zones =(data['items']);
                sys.numzones=(sys.zones.length); 
                localStorage.setItem('zones',JSON.stringify(sys.zones));
                window.location.reload(true);
                //sys.loadProgs();
            }); 
        }
        this.makeZlist();
        return true;
    },
    loadProgs : function(){
        if ( localStorage.getItem('progs')) {
            console.log("progs is in local storage");
            this.progs = JSON.parse(localStorage.getItem('progs'));
            this.current = this.progs['current'];
            //this.loadB64();
        }
        else {
            console.log("need to goto server for prog data");
            this.refreshProgs();
            //this.loadB64();
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
                sys.b64[rnam] = $.ajax({url: "img/base64/"+rnam+".txt", async: false}).responseText;
                localStorage.setItem(rfile, sys.b64[rnam]);
            }
        }
        this.refreshState();
        return true;    
    },  
    load: function(){
        this.loadFeed();
        this.loadZones();
        this.loadProgs();
        console.log(sys.numzones);
        this.loadB64();
        this.loadBohos();
    },
    initMain : function(){
        $.each(this.zones, function(index, zone) {
            ima = sys.b64[zone.room];
            $('#rooms').append('<li id="rm'+index+'" class="room-li"><a href="#"><img src="data:image/jpeg;charset=utf-8;base64, '+ima+'"><span class="temp"> <h2><span class="temp-disp"></span> &deg F </h2></span><p class="rname">'+zone.rname+'<span class="timest"></span></p><p class="ui-li-aside setpt"><span class="setpt-refresh"></span>&deg F</p></a></li>');
        });
        $('#rooms').listview('refresh');    
        console.log('in init main');
        return true;    
    },  
    refreshState : function(){
        //nqrep = 'path='+this.feed+'&room=all';
        nqrep = 'type=state'+'&feed='+this.feed;
        console.log("in sys.refreshState()" + nqrep);
        $.getJSON('http://hvac.sitebuilt.net/services/get.php', nqrep, function(data) {
            sys.states = data.items;
            sys.updMain();
            zone.load(0);
            zone.refresh();
            //window.location.reload(true);
        }); 
        return true;            
    },
    refreshProgs : function(){
        //nqrep = 'path='+this.feed+'&progs=all';
        nqrep = 'type=prog&ver=current'+'&feed='+this.feed;
        console.log("in sys.refreshProgs()" + nqrep);
        $.getJSON('http://hvac.sitebuilt.net/services/get.php', nqrep, function(data) {
            sys.progs = data.items;
            localStorage.setItem('progs',JSON.stringify(sys.progs));
            sys.current = sys.progs[sys.feed]['current'];
            zone.load(zone.idx);
            zone.refresh();
        }); 
        return true;            
    },  
    loadBohos : function(){
        if ( localStorage.getItem('bohos')) {
            console.log("bohos is in local storage");
            this.bohos = JSON.parse(localStorage.getItem('bohos'));
        } else{
            nqrep = 'type=boho&feed='+this.feed;
            console.log("in getBoho()" + nqrep);
            $.getJSON('http://hvac.sitebuilt.net/services/get.php', nqrep, function(data) {
                sys.bohos = data.items;
                console.log(sys.bohos);
                localStorage.setItem('bohos',JSON.stringify(sys.bohos));    
            });
        }
        return true;            
    },      
    updMain : function(){
        $.each(this.states, function(index, state) {
            var ftemp = a2f(state.temp);            
            var stemp = a2f(state.setpt*2);
            if (state.relay==null){
                rell="not set";
                bkg="black";
            }else {
                if (state.relay == 1){
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
    },
    makeZlist : function(){
        $('.zone-list').empty();
        for(i=0;i<sys.numzones;i++){
            zid=sys.zones[i].circuit.substring(3);           
            listr='<li id=zcl'+zid+' data-cked="0" data-zid="'+zid+'"><a href="#" ><img src="img/icons/ckbx-empty.gif" title="copy this zones program to here"/></a><span>'+sys.zones[i].rname+'</span></li>';
            $('.zone-list').append(listr);
        }
        //$('.zone-list').listview('refresh');
    },
    prog2server : function(){
         for(i=0;i<sys.maxckts;i++){
            if(sys.zonecked[i]==1){
                sys.progs[sys.feed].current[i]=zone.prog
            }
        }
        progsJ=JSON.stringify(sys.progs);
        localStorage.setItem('progs', progsJ); 
        $.post("../services/newProg.php", {data: progsJ}).done(function(data){    
    });       
    }

};

/*
http://hvac.sitebuilt.net/services/getData.php?path=80302&room=all

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
    tsa= new Array();
    tsa.push(ts);
    tsa.push(ts);
    day = new Array();
    day[0]=tsa;
    day[6] =tsa;
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
function progtest2(){
    schedJ=localStorage.progs;  
    console.log(schedJ);
    $.post("../services/newProg.php", {data: schedJ}).done(function(data){    
    });
}
//progtest2();