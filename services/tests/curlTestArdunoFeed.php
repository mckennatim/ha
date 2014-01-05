<?php
echo header("Content-type: text/plain");
$data_string = '{"data": {"temp": [350, 370], "relay": [0, 1 ], "setpt": [200, 300]}}';    
                                                             
$ch = curl_init('http://162.220.241.140/hsc/feed/80999');                                                                      
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