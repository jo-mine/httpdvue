<?php
require 'vendor/autoload.php';

use httpdvue\Dal;

try {
    $dal = new Dal();
    var_dump($dal->fetch('SELECT * FROM t_todo'));
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