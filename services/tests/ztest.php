<?php
include('/usr/local/lib/tm/ChromePhp.php');
echo header("Content-type: text/plain");
ChromePhp::log("in ztest.php");
$fruits = array("d" => "lemon", "a" => "orange", "b" => "banana", "c" => "apple");

function array2where($arr){
	$str="\n\nWHERE ";
	foreach($arr as $key=>$val){
	    $str= $str."`$key`=\"$val\" AND ";
	}
	$str=substr($str,0,-4);
	return $str;
}

echo(array2where($fruits));

//http://homecontrol.sitebuilt.net/services/ztest.php?type=progs&feed=80302&some=all
$data = $_GET;
$some=$_GET['some'];
echo('dog'.is_null($some));
print_r($data);


//http://homecontrol.sitebuilt.net/services/get.php?type=prog&feed=80302&some=5
//http://homecontrol.sitebuilt.net/services/get.php?type=prog&feed=80302
$data = $_GET;
$type=$_GET['type'];
$feed=$_GET['feed'];
$some=$_GET['some'];
if(is_null($some)){
	$urlStr = $type.'/'.$feed;
} else{
	$urlStr = $type.'/'.$feed.'/'.$some;
}
ChromePhp::log($urlStr);
//198.23.156.78/hsc/prog/80302/
//198.23.156.78/hsc/zone/80302/
//198.23.156.78/hsc/state/80302/
//198.23.156.78/hsc/boho/80302/5                                                        
$ch = curl_init('162.220.241.140/hsc/'.$urlStr);                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                         
curl_setopt($ch, CURLOPT_HTTPGET, TRUE); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));                                                               
$result = curl_exec($ch);
echo($result);
$bigarr=json_decode($result);
$bigarr=$bigarr->items;
print_r($bigarr);
$i=0;
$prck=0;
$prda=0;
$ckts= array();
$ck;
foreach($bigarr as $key=>$value){
	$tite['time']=$value->clock;
	$tite['temp']=$value->setpt;
	array_push($ckts[$key][$value->day][], $tite);
}


print_r($ckts);
?>
