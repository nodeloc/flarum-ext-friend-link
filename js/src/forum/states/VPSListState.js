import PaginatedListState from 'flarum/common/states/PaginatedListState';
import PaginatedListRequestParams from 'flarum/common/states/PaginatedListState';

export default class VPSListState extends PaginatedListState {
  constructor(params, page = 1) {
    super(params, page, 12);
    this.vpsList = [];
  }

  get type() {
    return 'vps_list';
  }

}
