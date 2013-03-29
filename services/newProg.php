<?php
include('/usr/local/lib/tm/ChromePhp.php');
$dataStr=$_POST['data'];
ChromePhp::log($dataStr);
$progAll=stripslashes($dataStr);
$progDec = json_decode($progAll);
ChromePhp::log($progAll . "\n");
ChromePhp::log($progDec->name);
ChromePhp::log($progDec->feed);
$ch = curl_init('198.23.156.78/hsc/prog/'.$progDec->feed.'/'.$progDec->name);                                                                        
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");                                                           
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));   
curl_setopt($ch, CURLOPT_POSTFIELDS,$progAll);	                                                                                              
$result = curl_exec($ch);
ChromePhp::log($result);
echo($result);
return false;

?>