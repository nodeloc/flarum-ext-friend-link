<?php
namespace Nodeloc\FriendLink\Controllers;

use Flarum\Http\RequestUtil;
use Nodeloc\FriendLink\Logic\ApproveLogic;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
class ApproveController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        return new JsonResponse( resolve(ApproveLogic::class)->save($actor, $request->getParsedBody()) );
    }
}
