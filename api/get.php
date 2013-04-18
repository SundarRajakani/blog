<?php 

require_once('../app/config/config.php');

try {
	$conn = new PDO("mysql:host=$host;dbname=$dbname",$user,$pass);

	$sth = $conn->query('select * from posts');

	$sth->setFetchMode(PDO::FETCH_ASSOC);

	$out = array();

	while ($row = $sth->fetch() ) {
		$out[] = $row;
	}

	return json_encode($out);

} catch (PDOException $e) {
	echo $e->getMessage();
}


?>