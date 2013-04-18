<?php 
require_once('../config.php');

// change .php
// RewriteCond %{REQUEST_FILENAME} !-d
// RewriteCond %{REQUEST_FILENAME}\.php -f
// RewriteRule ^(.+)$ $1.php [L,QSA]

try {
	$conn = new PDO("mysql:host=$host;dbname=$database",$user,$pass);

	$sth = $conn->query('select * from posts');

	$sth->setFetchMode(PDO::FETCH_ASSOC);

	while ($row = $sth->fetch() ) {
		print_r($row);
	}

} catch (PDOException $e) {
	echo $e->getMessage();
}


// $pdo = new PDO('sqlite:users.db');
// $stmt = $pdo->prepare('SELECT name FROM users WHERE id = :id');
// $stmt->bindParam(':id', $_GET['id'], PDO::PARAM_INT); //<-- Automatically sanitized by PDO
// $stmt->execute();


?>