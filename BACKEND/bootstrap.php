<?php

require_once "vendor/autoload.php";
require_once "./utils.php";

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('Europe/Paris');

class Config {
    private static ?Config $instance = null;
    public ?EntityManager $entityManager = null;
    public $options = null;

    private function __construct()
    {
        $isDevMode = true;
        $config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
        $conn = array(
            'host' => 'ec2-52-48-159-67.eu-west-1.compute.amazonaws.com',
            'driver' => 'pdo_pgsql',
            'user' => 'wraentxhrfsxfx',
            'password' => '48d3002affd7c664cf1eb6fc8f3d3ce8a5028429d09507f4bd04429dcef3070b',
            'dbname' => 'ddh468oq4vk5vs',
            'port' => '5432'
        );
        $this->entityManager = EntityManager::create($conn, $config);

        $this->options = [
            "attribute" => "token",
            "header" => "Authorization",
            "regexp" => "/Bearer\s+(.*)$/i",
            "secure" => false,
            "algorithm" => ["HS256"],
            "secret" => JWT_SECRET,
            "path" => ["/api"],
            "ignore" => ["/api/login", "/api/register"],
            "error" => function ($response, $arguments) {
                $data["status"] = "error";
                $data["message"] = $arguments["message"];
                return $response
                    ->withHeader("Content-Type", "application/json")
                    ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
            }
        ];
    }

    public static function getInstance() : Config {
        if (self::$instance == null) {
            self::$instance = new Config();
        }
        return self::$instance;
    }

}


