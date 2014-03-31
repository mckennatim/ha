<?php
echo header("Content-type: text/plain");
//http://homecontrol.sitebuilt.net/services/putSetpt.php?feed=80302&type=prog&sensor=4&setpt=167
$dataStr = $_SERVER['QUERY_STRING'];
parse_str($dataStr);
echo($dataStr);
echo "\n";
echo($feed);
echo "\n";
echo($sensor);
echo "\n\n";
$data= array();
$data['setpt']=$setpt;
//print_r($data);
$bdata=json_encode($data);
//echo $bdata ."\n";

//http://198.23.156.78/hsc/prog/80302/4
                                                             
$ch = curl_init('162.220.241.140/hsc/prog/'.$feed.'/'.$sensor.'/');                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");                                                         
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));   
curl_setopt($ch, CURLOPT_POSTFIELDS,$bdata);	                                                                                              
$result = curl_exec($ch);
echo($result);
return false;
/*
HTTP/1.1 200 OK
Date: Sat, 16 Mar 2013 15:44:40 GMT
Server: Apache/2.2.14 (Ubuntu)
X-Powered-By: PHP/5.3.2-1ubuntu4.18
Vary: Accept-Encoding
Content-Length: 1346
Connection: close
Content-Type: text/plain
	*/
?>