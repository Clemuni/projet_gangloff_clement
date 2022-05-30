<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('Europe/Paris');

require_once "vendor/autoload.php";

$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);

$conn = array(
    'host' => 'ec2-63-32-248-14.eu-west-1.compute.amazonaws.com',
    'driver' => 'pdo_pgsql',
    'user' => 'yefrmfxqeneslg',
    'password' => '9a39fd544009647a9387a90274e14bbc107e1ba5dcb3d6d15166eea8bea68c0e',
    'dbname' => 'd3bekr2hsl0254',
    'port' => '5432'
);

$entityManager = EntityManager::create($conn, $config);