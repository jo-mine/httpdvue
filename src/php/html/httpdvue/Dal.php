<?php

namespace httpdvue;

class Dal
{
    /** @var \PDO $pdo */
    private $pdo;
    public function __construct()
    {
        $dsn = 'mysql:dbname=practicedb;host=db;charset=utf8mb4';
        $username = 'root';
        $password = 'root';
        $driver_options = [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_EMULATE_PREPARES => false,
        ];
        $this->pdo = new \PDO($dsn, $username, $password, $driver_options);
    }

    public function fetch(string $sql): array
    {
        $stmt = $this->pdo->query($sql);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function execute(string $sql): void
    {
        $stmt = $this->pdo->query($sql);
        $stmt->execute();
    }
}
