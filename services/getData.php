<?php
echo header("Content-type: text/plain");
//http://homecontrol.sitebuilt.net/services/getData.php?path=80302&room=all
$data = $_SERVER['QUERY_STRING'];
$feed=$_GET['path'];
//echo($data);
$room="all";
$str= "?room=".$room;
//198.23.156.78/hsc/feed/80302?room=all
                                                             
$ch = curl_init('162.220.241.140/hsc/feed/'.$feed.'?'.$data);                                                                      
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