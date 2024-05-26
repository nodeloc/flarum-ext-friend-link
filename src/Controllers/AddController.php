<?php

namespace Nodeloc\VPS\Controllers;

use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Foundation\ValidationException;
use Nodeloc\VPS\Logic\AddLogic;
use Nodeloc\VPS\Policy\UserPolicy; // 引入用户权限控制类

class AddController implements RequestHandlerInterface
{
    protected $userPolicy;

    public function __construct(UserPolicy $userPolicy)
    {
        $this->userPolicy = $userPolicy;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();

        // 检查是否有权限执行添加操作
        if (!$this->userPolicy->allowAdd($actor)) {
            throw new ValidationException(['user' => 'You do not have permission to add.']);
        }

        // 执行添加逻辑
        return new JsonResponse(resolve(AddLogic::class)->save($actor, $request->getParsedBody()));
    }
}
