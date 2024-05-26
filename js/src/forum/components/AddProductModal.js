import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Modal from 'flarum/common/components/Modal';
import Alert from 'flarum/common/components/Alert';
import icon from 'flarum/common/helpers/icon';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Stream from 'flarum/utils/Stream';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';
import MerchantSelectionModal from "./MerchantSelectionModal";
import LocationSelectionModal from "./LocationSelectionModal";
import VpsTagsSelectionModal from "./VpsTagsSelectionModal";
import {currencyOptions, diskTypeOptions, paymentCycleOptions, scoreOptions} from "../common/constants";
export default class AddProductModal extends Modal {
  // 保存状态的变量
  savedState = {};

  oninit(vnode) {
    super.oninit(vnode);
    const {vps} = this.attrs;
    this.settingType = "add";
    this.user = vnode.attrs.user || app.session.user;
    this.state = this.attrs.state.modal.attrs.state;
    // Stream to store selected merchants
    this.selectedMerchants = Stream(this.state.selectedMerchants || []);
    this.selectedLocations = Stream(this.state.selectedLocations || []);
    this.selectedVpsTags = Stream(this.state.selectedVpsTags || []);
    if(vps){
      this.settingType = "edit";
      this.product_name = Stream(vps.product_name);
      this.product_type = vps.product_type===1?true:false;
      this.merchant_id = Stream(vps.merchant_id);
      this.merchant_name = Stream(vps.merchant_name);
      this.cpu = Stream(vps.cpu);
      this.memory = Stream(vps.memory);
      this.storage = Stream(vps.storage);
      this.disk_type = Stream(vps.disk_type);
      this.location_id = Stream(vps.location_id);
      this.bandwidth = Stream(vps.bandwidth);
      this.GIG = Stream(vps.GIG);
      this.cost= Stream(vps.cost);
      this.currency = Stream(vps.currency);
      this.payment_cycle = Stream(vps.payment_cycle);
      this.score = Stream(vps.score);
      this.monitor_url = Stream(vps.monitor_url);
      this.monitor_rule = Stream(vps.monitor_rule);
      this.available = Stream(vps.available);
      this.review_url = Stream(vps.review_url);
      this.buy_url = Stream(vps.buy_url);
    }else{
      this.product_name = Stream("");
      this.product_type = false;
      this.merchant_id = Stream(0);
      this.location_id = Stream(0);
      this.merchant_name = Stream("");
      this.cpu = Stream(0);
      this.memory = Stream(0);
      this.storage = Stream(0);
      this.disk_type = Stream(0);
      this.location = Stream(0);
      this.bandwidth = Stream(0);
      this.GIG = Stream(0);
      this.cost= Stream(0);
      this.currency = Stream(0);
      this.payment_cycle = Stream(0);
      this.score = Stream(0);
      this.monitor_url = Stream("");
      this.monitor_rule = Stream("");
      this.available = Stream(0);
      this.review_url = Stream("");
      this.buy_url =Stream("");
    }
  }

  title() {
    return app.translator.trans(`nodeloc-vps.forum.modal.add_product.title`);
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
            <input className="FormControl" type="text" id="pruduct_name"
                   placeholder={app.translator.trans('nodeloc-vps.forum.product.product_name')} bidi={this.product_name}/>
          </div>
          <Button className="add-select unselect" icon="fas fa-tag" onclick={() => this.openMerchantSelectionModal()}>
            {this.selectedMerchants().length>0 ? this.selectedMerchants()[0].merchant_name  : '选择商家'}
          </Button>
          <Button style="display: inline-block;margin-left: 10px;" className="add-select unselect" icon="fas fa-tag" onclick={() => this.openLocationSelectionModal()}>
            {this.selectedLocations().length>0 ? this.selectedLocations()[0].location_name  : '选择地区'}
          </Button>

          <div style="display: inline-block;margin-left: 10px;">
            {Switch.component({
              state: this.product_type,
              onchange: value => {
                this.product_type = value;
              }
            }, app.translator.trans("nodeloc-vps.forum.product.product_type"))}
          </div>

          <div style="margin-top: 20px;">
            {this.selectedVpsTags().length > 0 ? (
              this.selectedVpsTags().map((tag, index) => (
                <Button style="display: inline-block;" className="add-select unselect" icon="fas fa-tag" onclick={() => this.openTagsSelectionModal()}>
                  {tag.tag_name}
                </Button>
              ))
            ) : (
              <Button style="display: inline-block;" className="add-select unselect" icon="fas fa-tag" onclick={() => this.openTagsSelectionModal()}>
                选择标签
              </Button>
            )}

          </div>
          <div className="product_config">
            <div style="margin-top:15px;font-weight:bold;">
              <label style="width:25%;display: inline-block;" >{app.translator.trans('nodeloc-vps.forum.product.cpu')}</label>
              <input style="width:25%;display: inline-block;" required className="FormControl" type="number" step="1" min="1" bidi={this.cpu} />
              <label style="width:25%;display: inline-block; padding-left: 10px;" >{app.translator.trans('nodeloc-vps.forum.product.memory')}</label>
              <input style="width:25%;display: inline-block;" required className="FormControl" type="number" step="1" min="0" bidi={this.memory} />
            </div>

            <div style="display:flex;align-items: center;margin-top:15px;font-weight:bold;">
              <label style="width:25%;display: inline-block;" >{app.translator.trans('nodeloc-vps.forum.product.storage')}</label>
              <input style="width:25%;display: inline-block;" required className="FormControl" type="number" step="1" min="1" bidi={this.storage} />
              <label style="width:25%;display: inline-block; padding-left: 10px;" >{app.translator.trans('nodeloc-vps.forum.product.disk_type')}</label>
              <Select
                value={this.disk_type()}
                style="display: inline-block;"
                options={diskTypeOptions}
                buttonClassName="Button"
                onchange={this.disk_type}
              />
            </div>
            <div style="margin-top:15px;font-weight:bold;">
              <label style="width:25%;display: inline-block;" >{app.translator.trans('nodeloc-vps.forum.product.bandwidth')}</label>
              <input style="width:25%;display: inline-block;" required className="FormControl" type="number" step="1" min="1" bidi={this.bandwidth} />
              <label style="width:25%;display: inline-block; padding-left: 10px;" >{app.translator.trans('nodeloc-vps.forum.product.GIG')}</label>
              <input style="width:25%;display: inline-block;" required className="FormControl" type="number" step="1" min="0" bidi={this.GIG} />
            </div>
            <div style="margin-top:15px;font-weight:bold;margin-bottom: 20px;">
              <label style="width:25%;display: inline-block;" >{app.translator.trans('nodeloc-vps.forum.product.cost')}</label>
              <input style="width:25%;display: inline-block;" required className="FormControl" type="number" step="1" min="1" bidi={this.cost} />
              <label style="width:25%;display: inline-block;padding-left: 10px;" >{app.translator.trans('nodeloc-vps.forum.product.currency')}</label>
              <Select
                value={this.currency()}
                style="display: inline-block;"
                options={currencyOptions}
                buttonClassName="Button"
                onchange={this.currency}
              />
            </div>
            <div style="margin-top:15px;font-weight:bold;margin-bottom: 20px;">
              <label style="width:25%;display: inline-block; " >{app.translator.trans('nodeloc-vps.forum.product.payment_cycle')}</label>
              <Select
                value={this.payment_cycle()}
                style="display: inline-block;"
                options={paymentCycleOptions}
                buttonClassName="Button"
                onchange={this.payment_cycle}
              />
              <label style="width:25%;display: inline-block;padding-left: 10px;" >{app.translator.trans('nodeloc-vps.forum.product.score')}</label>
              <Select
                value={this.score()}
                style="display: inline-block;"
                options={scoreOptions}
                buttonClassName="Button"
                onchange={this.score}
              />
            </div>
            <div style="margin-bottom: 20px;">
              <input className="FormControl" type="text" id="monitor_url"
                     placeholder={app.translator.trans('nodeloc-vps.forum.product.monitor_url')} bidi={this.monitor_url}/>
            </div>
            <div style="margin-bottom: 20px;">
              <input className="FormControl" type="text" id="monitor_rule"
                     placeholder={app.translator.trans('nodeloc-vps.forum.product.monitor_rule')} bidi={this.monitor_rule}/>
            </div>
            <div style="margin-bottom: 20px;">
              <input className="FormControl" type="text" id="buy_url"
                     placeholder={app.translator.trans('nodeloc-vps.forum.product.buy_url')} bidi={this.buy_url}/>
            </div>
            <div style="margin-bottom: 20px;">
              <input className="FormControl" type="text" id="review_url"
                     placeholder={app.translator.trans('nodeloc-vps.forum.product.review_url')} bidi={this.review_url}/>
            </div>
          </div>
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
    )
  }

  openMerchantSelectionModal() {
    // 保存当前状态
    this.savedState = {
      product_name: this.product_name(),
      product_type: this.product_type,
      cpu: this.cpu(),
      memory: this.memory(),
      storage: this.storage(),
      disk_type: this.disk_type(),
      bandwidth: this.bandwidth(),
      GIG: this.GIG(),
      cost: this.cost(),
      score: this.score(),
      payment_cycle: this.payment_cycle(),
      monitor_url: this.monitor_url(),
      monitor_rule: this.monitor_rule(),
      available: this.available(),
      currency: this.currency(),
      review_url: this.review_url(),
      buy_url: this.buy_url(),
      merchant_id: this.selectedMerchants()[0]?.id || null,
      location_id: this.selectedLocations()[0]?.id || null,
      tags: this.selectedVpsTags().map(tag => tag.id)
    };

    // 打开商家选择弹窗
    app.modal.show(MerchantSelectionModal, {
      state: this.state,
      savedState: this.savedState,
      onsubmit: (selectedMerchants) => {
        this.handleMerchantSelect(selectedMerchants);
        // 重新打开FirstModal并恢复状态
        app.modal.show(AddProductModal, {
          state: this.state,
          vps: this.savedState
        });
        m.redraw();
      }
    });
  }

  openLocationSelectionModal() {
    // 保存当前状态
    this.savedState = {
      product_name: this.product_name(),
      product_type: this.product_type,
      cpu: this.cpu(),
      memory: this.memory(),
      storage: this.storage(),
      disk_type: this.disk_type(),
      bandwidth: this.bandwidth(),
      GIG: this.GIG(),
      cost: this.cost(),
      score: this.score(),
      payment_cycle: this.payment_cycle(),
      monitor_url: this.monitor_url(),
      monitor_rule: this.monitor_rule(),
      available: this.available(),
      currency: this.currency(),
      review_url: this.review_url(),
      buy_url: this.buy_url(),
      merchant_id: this.selectedMerchants()[0]?.id || null,
      location_id: this.selectedLocations()[0]?.id || null,
      tags: this.selectedVpsTags().map(tag => tag.id)
    };

    // 打开商家选择弹窗
    app.modal.show(LocationSelectionModal, {
      state: this.state,
      savedState: this.savedState,
      onsubmit: (selectedLocations) => {
        this.handleLocationSelect(selectedLocations);
        // 重新打开FirstModal并恢复状态
        app.modal.show(AddProductModal, {
          state: this.state,
          vps: this.savedState
        });
        m.redraw();
      }
    });
  }

  openTagsSelectionModal() {
    // 保存当前状态
    this.savedState = {
      product_name: this.product_name(),
      product_type: this.product_type,
      cpu: this.cpu(),
      memory: this.memory(),
      storage: this.storage(),
      disk_type: this.disk_type(),
      bandwidth: this.bandwidth(),
      GIG: this.GIG(),
      cost: this.cost(),
      score: this.score(),
      payment_cycle: this.payment_cycle(),
      monitor_url: this.monitor_url(),
      monitor_rule: this.monitor_rule(),
      available: this.available(),
      currency: this.currency(),
      review_url: this.review_url(),
      buy_url: this.buy_url(),
      merchant_id: this.selectedMerchants()[0]?.id || null,
      location_id: this.selectedLocations()[0]?.id || null,
      tags: this.selectedVpsTags().map(tag => tag.id)
    };

    // 打开商家选择弹窗
    app.modal.show(VpsTagsSelectionModal, {
      state: this.state,
      savedState: this.savedState,
      onsubmit: (selectedVpsTags) => {
        this.handleVpsTagsSelect(selectedVpsTags);
        // 重新打开FirstModal并恢复状态
        app.modal.show(AddProductModal, {
          state: this.state,
          vps: this.savedState
        });
        m.redraw();
      }
    });
  }
  handleMerchantSelect(selectedMerchants) {
    this.state.selectedMerchants = selectedMerchants;
    m.redraw();
  }

  handleLocationSelect(selectedLocations) {
    this.state.selectedLocations = selectedLocations;
    m.redraw();
  }

  handleVpsTagsSelect(selectedVpsTags) {
    this.state.selectedVpsTags = selectedVpsTags;
    m.redraw();
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
    const vps = {
      product_name: this.product_name(),
      product_type: this.product_type,
      cpu: this.cpu(),
      memory: this.memory(),
      storage: this.storage(),
      disk_type: this.disk_type(),
      bandwidth: this.bandwidth(),
      GIG: this.GIG(),
      cost: this.cost(),
      score: this.score(),
      payment_cycle: this.payment_cycle(),
      monitor_url: this.monitor_url(),
      monitor_rule: this.monitor_rule(),
      available: this.available(),
      currency: this.currency(),
      review_url: this.review_url(),
      buy_url: this.buy_url(),
      merchant_id: this.selectedMerchants()[0]?.id || null,
      location_id: this.selectedLocations()[0]?.id || null,
      tags: this.selectedVpsTags().map(tag => tag.id)
    };
    if (!vps.product_name || !vps.merchant_id || !vps.location_id) {
      app.alerts.show(Alert, { type: 'success' }, "名称和商家、地区不能为空！");
      return;
    }

    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/nodeloc/vps/add`,
        body: vps,
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
