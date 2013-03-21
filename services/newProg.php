<?php
include('/usr/local/lib/tm/ChromePhp.php');
$dataStr=$_POST['data'];
ChromePhp::log($dataStr);s

$frog=stripslashes($dataStr);
$dog = json_decode($frog);
ChromePhp::log($frog . "\n");
ChromePhp::log($dog);
s
$ch = curl_init('198.23.156.78/hsc/prog/'.$feed);                                                                      
//curl_setopt($ch,CURLOPT_POST,1000);  
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");                                                           
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));   
curl_setopt($ch, CURLOPT_POSTFIELDS,$frog);	                                                                                              
$result = curl_exec($ch);
ChromePhp::log($result);
echo($result);
return false;

?>