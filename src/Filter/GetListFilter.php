<?php

namespace Nodeloc\VPS\Filter;

use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Nodeloc\VPS\Model\VPS;
use Illuminate\Database\Eloquent\Builder;
use Flarum\Query\QueryCriteria;
use Flarum\Query\QueryResults;

class GetListFilter extends AbstractFilterer
{
    protected function getQuery(User $actor): Builder
    {
        return VPS::query();
    }

    public function filter(QueryCriteria $criteria, int $limit = null, int $offset = 0): QueryResults
    {
        $query = $this->getQuery($criteria->actor);

        // 获取过滤条件
        $filters = $criteria->query;

        // 检查并处理过滤条件
        if (!empty($filters)) {
            foreach ($filters as $filter => $value) {
                if (!empty($value)) { // 添加此行检查
                    switch ($filter) {
                        case 'merchants':
                            $query->whereIn('merchant_id', $value);
                            break;
                        case 'locations':
                            $query->whereIn('location_id', $value);
                            break;
                        case 'tags':
                            $query->whereHas('tags', function ($q) use ($value) {
                                $q->whereIn('vps_tag.id', $value);
                            });
                            break;
                    }
                }
            }
        }

        // 处理排序
        if (isset($criteria->sort) && is_array($criteria->sort)) {
            foreach ($criteria->sort as $field => $direction) {
                $query->orderBy($field, $direction);
            }
        }

        $total = $query->count();
        $results = $query->skip($offset)->take($limit)->get();

        return new QueryResults($results, $total);
    }


}
