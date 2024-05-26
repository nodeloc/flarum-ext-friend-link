import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Modal from 'flarum/common/components/Modal';
import Alert from 'flarum/common/components/Alert';
import Stream from 'flarum/utils/Stream';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';
import {merchantTypeOptions} from "../common/constants";
export default class AddMerchantModal extends Modal {
  // 保存状态的变量
  savedState = {};

  oninit(vnode) {
    super.oninit(vnode);
    const {merchant} = this.attrs;
    this.settingType = "add";
    this.user = vnode.attrs.user || app.session.user;
    this.state = this.attrs.state.modal.attrs.state;
    // Stream to store selected merchants
    if(merchant){
      this.settingType = "edit";
      this.merchant_name = Stream(merchant.merchant_name);
      this.merchant_intro = Stream(merchant.merchant_intro);
      this.merchant_url = Stream(merchant.merchant_url);
      this.merchant_link = Stream(merchant.merchant_link);
      this.merchant_type = Stream(merchant.merchant_type);
      this.merchant_homepage = Stream(merchant.merchant_homepage);

    }else{
      this.merchant_name = Stream("");
      this.merchant_intro =Stream("");
      this.merchant_url = Stream("");
      this.merchant_link = Stream("");
      this.merchant_type = Stream(0);
      this.merchant_homepage = Stream("");
    }
  }

  title() {
    return app.translator.trans(`nodeloc-vps.forum.merchant.title`);
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
          <div style="margin-top:15px;font-weight:bold;margin-bottom: 20px;">
            <label style="width:25%;display: inline-block; " >{app.translator.trans('nodeloc-vps.forum.merchant.merchant_name')}</label>
            <input style="width:25%;display: inline-block;" required className="FormControl" type="text" bidi={this.merchant_name} />
            <label style="width:25%;display: inline-block;padding-left: 10px;" >{app.translator.trans('nodeloc-vps.forum.merchant.merchant_type')}</label>
            <Select
              value={this.merchant_type()}
              style="display: inline-block;"
              options={merchantTypeOptions}
              buttonClassName="Button"
              onchange={this.merchant_type}
            />
          </div>
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="pruduct_name"
                   placeholder={app.translator.trans('nodeloc-vps.forum.merchant.merchant_intro')} bidi={this.merchant_intro}/>
          </div>
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="pruduct_name"
                   placeholder={app.translator.trans('nodeloc-vps.forum.merchant.merchant_url')} bidi={this.merchant_url}/>
          </div>
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="pruduct_name"
                   placeholder={app.translator.trans('nodeloc-vps.forum.merchant.merchant_link')} bidi={this.merchant_link}/>
          </div>
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="pruduct_name"
                   placeholder={app.translator.trans('nodeloc-vps.forum.merchant.merchant_homepage')} bidi={this.merchant_homepage}/>
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
      const merchant = {
        merchant_name: this.merchant_name(),
        merchant_type: this.merchant_type(),
        merchant_intro: this.merchant_intro(),
        merchant_url: this.merchant_url(),
        merchant_link: this.merchant_link(),
        merchant_homepage: this.merchant_homepage()
      };


    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/nodeloc/merchant/add`,
        body: merchant,
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
