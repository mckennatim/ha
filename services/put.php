<?php
include '/usr/local/lib/tim/ChromePhp.php';
//$rog ='{"feed":"80302","ckt":4,"start":1363707975,"finish":1363688100,"setpt":167}';
ChromePhp::log($frog);

$ch = curl_init('162.220.241.140/hsc/boho/'.$feed.'/'.$ckt);                                                                      
//curl_setopt($ch,CURLOPT_POST,1000);  
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");                                                           
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));   
curl_setopt($ch, CURLOPT_POSTFIELDS,$dataPUTj);	                                                                                              
$result = curl_exec($ch);
ChromePhp::log($result);
echo($result);
return false;

?>