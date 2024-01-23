<?php

namespace Nodeloc\FriendLink\Filter;

use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Nodeloc\FriendLink\Model\FriendLink;
use Illuminate\Database\Eloquent\Builder;

class GetListFilter extends AbstractFilterer
{
    /**
     * @param array $filters
     * @param array $filterMutators
     */
    public function __construct(array $filters, array $filterMutators)
    {
        parent::__construct($filters, $filterMutators);
    }

    protected function getQuery(User $actor): Builder
    {
        return FriendLink::query()->whereIn('status', [1, 2]);
    }
}
