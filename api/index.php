<?php

use Firebase\JWT\JWT;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\JwtAuthentication;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__.'/../vendor/autoload.php';
require __DIR__.'/../bootstrap.php';
const JWT_SECRET = "makey1234567";
 
$app = AppFactory::create();

$app->get('/api/hello/{name}', function(Request $request, Response $response, $args): Response
{
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode($array));
    return $response;
});

function createJWT(Response $response): Response
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'id' => 1,
        'username' => "admin",
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");

    return $response;
}

$app->get('/api/whoami', function(Request $request, Response $response, $args): Response
{
    $data = ["username" => "admin", "lastName" => "Gangloff", "firstName" => "Clément"];
    $response->getBody()->write(json_encode($data));
    return $response;
});

$app->post('/api/login', function(Request $request, Response $response, $args): Response
{
    $body = $request->getParsedBody();
    $username = $body["username"] ?? "";
    $password = $body["password"] ?? "";

    $error = false;
    if (!preg_match("/[a-zA-Z0-9]{1,20}/", $username)) {
        $error = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/", $password)) {
        $error = true;
    }

    if (!$error) {
        // Récupérer l'utilisateur en bd et vérifier le mdp
        if ($username === "admin" && $password === "mdp") {
            $response = createJWT($response);
            $data = ["status" => "success"];
            $response->getBody()->write(json_encode($data));
        } else $response = $response->withStatus(401);
    } else $response = $response->withStatus(401);

    return $response;
});

$app->get('/api/catalogue/{filtre}', function(Request $request, Response $response, $args) {
    $filtre = $args['filtre'];
    $flux = '[{"titre": "linux", "ref": "001", "prix": "20"}, {"titre":"java", "ref:"002", "prix": "21"}]';

    if($filtre){
        $data = json_decode($flux, true);

        $res = array_filter($data, function($obj) use ($filtre){
            return strpos($obj["titre"], $filtre) !== false;
        });
        $response->getBody()->write(json_encode(array_values($res)));
    }
    else{
        $response->getBody()->write($flux);
    }
    return $response;
});

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET, 
    "path" => ["/api"], 
    "ignore" => ["/api/hello", "/api/login", "/api/register"],
    "error" => function($response, $args){
        $data = ["ERROR" => 'Connection', 'ERROR' => 'Invalid JWT'];
        $response = $response->withStatus(401);
        return $response->withHeader('Content-Type', "application/json")->getBody()->write(json_encode($data));
    }
];
$app->add(new JwtAuthentication($options));

$app->run();