<?php
$HOST = 'localhost';
$DB = 'checks';
$USER = 'root';
$PASS = '(oln(e';
$CHARSET = "utf-8";


$DSN = "mysql:host=$HOST;dbname=$DB;charset=$CHARSET";
$OPT = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
);
$pdo = new PDO($DSN, $USER, $PASS, $OPT);

