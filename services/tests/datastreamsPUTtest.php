<?php
include '/usr/local/lib/tm/ChromePhp.php';
$rog ='{"feed":"80302","ckt":4,"start":1363707975,"finish":1363688100,"setpt":167}';

ChromePhp::log($rog);
$data= array();
$data['setpt']=162;
$datj=json_encode($data);
$ch = curl_init('162.20.241.140/hsc/datastreams/boho/80403/4');     
                      
//curl_setopt($ch,CURLOPT_POST,1000);  
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));   
curl_setopt($ch, CURLOPT_POSTFIELDS,$datj);	                                                                                              
$result = curl_exec($ch);
ChromePhp::log($result);
echo($result);
return false;

?>