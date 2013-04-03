<?php
include('/usr/local/lib/tm/ChromePhp.php');
$dataStr=$_POST['data'];
ChromePhp::log($dataStr);
$progAll=stripslashes($dataStr);
$progAlls = json_decode($progAll);
foreach($progAlls as $feed=>$dataF){
	;
}
foreach($dataF as $ver=>$dataA){
	;
}
ChromePhp::log($feed);
ChromePhp::log($ver);
$data=json_encode($dataA);
$ch = curl_init('198.23.156.78/hsc/prog/'.$feed.'/'.$ver);                                                                        
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");                                                           
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)" ));   
curl_setopt($ch, CURLOPT_POSTFIELDS,$data);	                                                                                              
$result = curl_exec($ch);
ChromePhp::log($result);
echo($result);
return false;

?>