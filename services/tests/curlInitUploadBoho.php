<?php
include('/usr/local/lib/tm/ChromePhp.php');
$boho='{"0":{"start":1387383414,"finish":1387386114,"setpt":68,"feed":80302,"ckt":"0"},"1":{"start":1387379784,"finish":1389971784,"setpt":"58","feed":80302,"ckt":"4"},"2":{"start":1387380454,"finish":1389972454,"setpt":"60","feed":80302,"ckt":"2"},"3":{"start":1387391334,"finish":1389983334,"setpt":"64","feed":80302,"ckt":"3"},"4":{"start":1387481544,"finish":1387485144,"setpt":68,"feed":80302,"ckt":"4"},"5":{"start":1387379404,"finish":1389971404,"setpt":"63"},"6":{"start":1387390667,"finish":1389982667,"setpt":"61","feed":80302,"ckt":"6"},"7":{"start":1387379404,"finish":1389971404,"setpt":"63"},"8":{"start":1387379404,"finish":1389971404,"setpt":"63"},"9":{"start":1387379404,"finish":1389971404,"setpt":"63"},"10":{"start":1387379404,"finish":1389971404,"setpt":"63"},"11":{"start":1387379404,"finish":1389971404,"setpt":"63"}}';
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
$ch = curl_init('162.220.241.140/hsc/prog/'.$feed.'/'.$ver);                                                                        
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