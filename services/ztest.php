<?php
$fruits = array("d" => "lemon", "a" => "orange", "b" => "banana", "c" => "apple");

function array2where($arr){
	$str="\n\nWHERE ";
	foreach($arr as $key=>$val){
	    $str= $str."`$key`=\"$val\" AND ";
	}
	$str=substr($str,0,-4);
	return $str;
}
echo(array2where($fruits));
?>
