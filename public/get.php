<?php 

require_once('../config/config.php');

try {
	$conn = new PDO("mysql:host=$host;dbname=$dbname",$user,$pass);

	$sth = $conn->query('select * from posts');

	$sth->setFetchMode(PDO::FETCH_ASSOC);

	while ($row = $sth->fetch() ) {
		print_r($row);
	}

} catch (PDOException $e) {
	echo $e->getMessage();
}


?>