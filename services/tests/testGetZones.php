<?php
include('/usr/local/lib/tm/ChromePhp.php');
echo header("Content-type: text/plain");
ChromePhp::log("in get.php");
//http://hvac.sitebuilt.net/services/get.php?type=zone&feed=80302
$data = $_GET;
$type=$_GET['type'];
$feed=$_GET['feed'];
$urlStr=$type.'/'.$feed;
ChromePhp::log($urlStr);
//198.23.156.78/hsc/prog/80302/current
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
?>