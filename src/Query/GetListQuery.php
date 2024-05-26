<?php

namespace Nodeloc\VPS\Query;

use Flarum\Filter\FilterInterface;
use Flarum\Filter\FilterState;
use Flarum\User\User;

class GetListQuery implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'id';
    }

    public function filter(FilterState $filterState, string $filterValue, bool $negate)
    {
        $query = $filterState->getQuery();

        // 获取当前用户
        $actor = $filterState->getActor();

        // 如果用户是管理员或者自己，可以看到状态为1和2的
       // if ($actor->isAdmin() || $actor->id == $filterValue) {
        //    $query->whereIn('status', [1, 2]);
        //} else {
            // 其他用户只能看到状态为1的
            $query->where('status', '=', 1);
        //}
    }
}
