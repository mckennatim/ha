<?php
//echo header("Content-type: text/plain");
include '/usr/local/lib/tm/ChromePhp.php';
ChromePhp::log("in ztest.php");
$testdir = 'datastreams';
$type=$_GET['type'];
$feed=$_GET['feed'];
$some=$_GET['some'];
$data= array();
$data['setpt']=162;
$datj=json_encode($data);

$urlStr = $testdir.'/'.$type.'/'.$feed.'/'.$some;
ChromePhp::log($urlStr);
//198.23.156.78/hsc/prog/80302/
//198.23.156.78/hsc/zone/80302/
//198.23.156.78/hsc/state/80302/
//198.23.156.78/hsc/boho/80302/5                                                        
$ch = curl_init('162.220.241.140/hsc/'.$urlStr);                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");                                                         
curl_setopt($ch, CURLOPT_HTTPGET, TRUE); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));
curl_setopt($ch, CURLOPT_POSTFIELDS,$datj);		                                                               
$result = curl_exec($ch);
echo($result);
?>
