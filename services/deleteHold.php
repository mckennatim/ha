<?php

include('/usr/local/lib/tm/ChromePhp.php');
echo header("Content-type: text/plain");
//http://homecontrol.sitebuilt.net/services/deleteHold.php?feed=80302&ckt=3
$data = $_SERVER['QUERY_STRING'];
$feed=$_GET['feed'];
$ckt=$_GET['ckt'];
ChromePhp::log($ckt);
ChromePhp::log($feed);
//198.23.156.78/hsc/boho/80302/3
                                                             
$ch = curl_init('198.23.156.78/hsc/boho/'.$feed.'/'.$ckt);                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");                                                         
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