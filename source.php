<?php  $data = file_get_contents("index.php");
$html_encoded = htmlentities($data);
echo $html_encoded;
?>