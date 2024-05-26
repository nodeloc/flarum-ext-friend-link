import Model from 'flarum/common/Model';

export default class VpsTag extends Model {
  tag_name() {
    return Model.attribute<string>('tag_name').call(this);
  }

  id = Model.attribute('id');
  tag_name = Model.attribute('tag_name');
}
