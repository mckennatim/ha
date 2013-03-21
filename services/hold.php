<?php
include('/usr/local/lib/tm/ChromePhp.php');
$dataStr=$_POST['data'];
ChromePhp::log($dataStr);
$dataJSON=stripslashes($dataStr);
$dataAll = json_decode($dataJSON);
$ckt =$dataAll->ckt;
$feed=$dataAll->feed;
ChromePhp::log($ckt);
ChromePhp::log($feed);
ChromePhp::log($dataAll);
$dataPUT=array();
$dataPUT['start'] =$dataAll->start;
$dataPUT['finish'] =$dataAll->finish;
$dataPUT['setpt'] =$dataAll->setpt;
$dataPUTj=json_encode($dataPUT);
ChromePhp::log($dataPUT);
ChromePhp::log($dataPUTj);
//$rog ='{"feed":"80302","ckt":4,"start":1363707975,"finish":1363688100,"setpt":167}';
//echo$frog;

$ch = curl_init('198.23.156.78/hsc/prog/'.$feed.'/'.$ckt);                                                                      
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