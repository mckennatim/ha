<?php
echo header("Content-type: text/plain");
//echo $_SERVER['REQUEST_TIME'];
$data = array("name" => "Hagrid Frodfk", "age" => 61);         
//$data_string = '{"data": {"temp": {"sensor2":844, "sensor3":622}, "relay": { "re4":437, "re5":439} , "setpt": {"set1": 302, "set2": 283}}}';    
$data_string = '{"data": {"temp": [350, 370], "relay": [0, 1 ], "setpt": [200, 300]}}';    
                                                             
$ch = curl_init('http://198.23.156.78/hsc/feed/80230');                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");                                                         
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
	"Accept: json",
	 "HTTP/1.1 Host: api.cosm.com",
    "X-ApiKey:  xxxxxxjxjndjjxn",
	"User-Agent: sitebuilt Arduino Example (83080)",
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);                                                                                                                   
$result = curl_exec($ch);
echo($result);
?>