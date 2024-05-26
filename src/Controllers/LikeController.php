<?php
namespace Nodeloc\VPS\Controllers;

use Flarum\Http\RequestUtil;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Foundation\ValidationException;
use Nodeloc\VPS\Logic\LikeLogic;

class LikeController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();

        return new JsonResponse( resolve(LikeLogic::class)->save($actor, $request->getParsedBody()) );
    }
}
