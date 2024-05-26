import Model from 'flarum/common/Model';

export default class Location extends Model {
  location_name() {
    return Model.attribute<string>('location_name').call(this);
  }

  id = Model.attribute('id');
  location_name = Model.attribute('location_name');
}
