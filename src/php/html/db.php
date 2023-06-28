<?php

try {
    $dsn = 'mysql:dbname=practicedb;host=db;charset=utf8mb4';
    $username = 'root';
    $password = 'root';
    $driver_options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, $username, $password, $driver_options);
    $stmt = $pdo->query('SELECT * FROM sample');
    $stmt->execute();
    $result = $stmt->fetch();
    var_dump($result);
} catch (PDOException $e) {
    header('Content-Type: text/plain; charset=UTF-8', true, 500);
    exit($e->getMessage()); 
}

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Example</title>
    </head>
    <body>
    </body>
</html>