<?php 

require_once('../app/config/config.php');

try {

	if( ! isset($_GET['callback'])) 
	{
	// if(isset($_POST['get']) and !empty($_POST['get'])) {

		$conn = new PDO("mysql:host=$host;dbname=$database",$user,$pass);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	    $sth = $conn->prepare('select * from posts');
	    $sth->setFetchMode(PDO::FETCH_ASSOC);
	    $sth->execute();

	    $result = $sth->fetchAll();
	    header('content-type: application/json; charset=utf-8');
		echo $_GET['callback'] . '('.json_encode($result).')';
	}
} catch (PDOException $e) {
	echo $e->getMessage();
}


?>