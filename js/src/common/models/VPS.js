import Model from 'flarum/Model';

export default class VPS extends Model {
  id = Model.attribute('id');
  product_name = Model.attribute('product_name');
  product_type = Model.attribute('product_type');
  merchant_id = Model.attribute('merchant_id');
  location_id = Model.attribute('location_id');
  score = Model.attribute('score');
  cpu = Model.attribute('cpu');
  memory = Model.attribute('memory');
  storage = Model.attribute('storage');
  disk_type = Model.attribute('disk_type');
  bandwidth = Model.attribute('bandwidth');
  GIG = Model.attribute('gig');
  cost = Model.attribute('cost');
  currency = Model.attribute('currency');
  payment_cycle = Model.attribute('payment_cycle');
  price = Model.attribute('price');
  status = Model.attribute('status');
  available = Model.attribute('available');
  monitor_url = Model.attribute('monitor_url');
  monitor_rule = Model.attribute('monitor_rule');
  buy_url = Model.attribute('buy_url');
  review_url = Model.attribute('review_url');
  // 定义关联关系
  merchant = Model.hasOne('vps_merchants');
  location = Model.hasOne('vps_locations');
  vps_tags = Model.hasMany('vps_tags');
  apiEndpoint() {
    return '/vps_list' + (this.exists ? '/' + this.data.id : '');
  }
}
