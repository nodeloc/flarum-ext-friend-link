import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Modal from 'flarum/common/components/Modal';
import Alert from 'flarum/common/components/Alert';
import Stream from 'flarum/utils/Stream';

export default class AddTagModal extends Modal {
  // 保存状态的变量
  savedState = {};

  oninit(vnode) {
    super.oninit(vnode);
    const {tag} = this.attrs;
    this.settingType = "add";
    this.user = vnode.attrs.user || app.session.user;
    this.state = this.attrs.state.modal.attrs.state;
    // Stream to store selected tags
    if(tag){
      this.settingType = "edit";
      this.tag_name = Stream(tag.tag_name);
      this.tag_intro = Stream(tag.tag_intro);

    }else{
      this.tag_name = Stream("");
      this.tag_intro =Stream("");
    }
  }

  title() {
    return app.translator.trans(`nodeloc-vps.forum.tag.title`);
  }

  className() {
    return 'Modal--large';
  }
  content() {
    if (!this.user) {
      return;
    }
    return (
      <div>
        <div className="Modal-body">
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="tag_name"
                   placeholder={app.translator.trans('nodeloc-vps.forum.tag.tag_name')} bidi={this.tag_name}/>
          </div>
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="tag_intro"
                   placeholder={app.translator.trans('nodeloc-vps.forum.tag.tag_intro')} bidi={this.tag_intro}/>
          </div>
          <div className="Modal-footer">
            <Button
              onclick={this.onConfirmSubmit.bind(this)}
              className="Button Button--primary"
            >
              确认
            </Button>
            <Button onclick={this.hide.bind(this)} className="Button">
              取消
            </Button>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Remove the user's avatar.
   */
  remove() {
    const user = this.user;

    this.loading = true;
    m.redraw();
  }

  /**
   * Add or remove file from selected files
   *
   * @param {File} file
   */
  onConfirmSubmit() {
    const tag = {
      tag_name: this.tag_name(),
      tag_intro: this.tag_intro()
    };


    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/nodeloc/tag/add`,
        body: tag,
      })
      .then(() => {
        app.alerts.show(Alert, {type: 'success'}, "添加成功");
        this.hide();
        this.state.refresh();
      })
      .catch(() => {
        app.alerts.show(Alert, {type: 'error'}, "添加失败");
      });
  }
}
