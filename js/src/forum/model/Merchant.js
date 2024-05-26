import Model from 'flarum/common/Model';

export default class Merchant extends Model {
  merchant_name() {
    return Model.attribute<string>('merchant_name').call(this);
  }
  merchant_intro() {
    return Model.attribute<string>('merchant_intro').call(this);
  }

  id = Model.attribute('id');
  merchant_name = Model.attribute('merchant_name');
  merchant_intro = Model.attribute('merchant_intro');
  merchant_url = Model.attribute('merchant_url');
  merchant_type = Model.attribute('merchant_type');
  merchant_link = Model.attribute('merchant_link');
  apiEndpoint() {
    return `/nodeloc/merchant${this.exists ? `/${this.data.id}` : ''}`;
  }
}
