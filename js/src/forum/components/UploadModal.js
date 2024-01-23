import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Modal from 'flarum/common/components/Modal';
import Alert from 'flarum/common/components/Alert';
import icon from 'flarum/common/helpers/icon';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ImageCropModal from "./ImageCropModal";

export default class UploadModal extends Modal {
  // 保存状态的变量
  savedState = {};

  oninit(vnode) {
    super.oninit(vnode);
    this.user = vnode.attrs.user || app.session.user;
    this.state = this.attrs.state.modal.attrs.state;
  }

  title() {
    return app.translator.trans(`nodeloc-friend-link.forum.title.share_my_site`);
  }

  className() {
    return 'Modal--large';
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    if (this.attrs.data) {
      const sitename = this.attrs.data.get('sitename');
      const siteurl = this.attrs.data.get('siteurl');
      document.getElementById('sitename').value = sitename;
      document.getElementById('siteurl').value = siteurl;
      const sitelogo = this.attrs.data.get('sitelogo');
      if (sitelogo instanceof File) {
        this.logoUrl = URL.createObjectURL(sitelogo);
      }
      m.redraw();
    }
  }


  onremove() {
    if (this.logoUrl) {
      URL.revokeObjectURL(this.logoUrl);
    }
  }


  content() {
    if (!this.user) {
      return;
    }
    return (
      <div>
        <div className="Modal-body">
          <p
            style="margin-bottom: 20px;font-size:15px">{app.translator.trans(`nodeloc-friend-link.forum.tips.upload_tips`)}</p>
          {/* Input fields for Site Name and Site URL */}
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="sitename"
                   placeholder={app.translator.trans('Site Name')}/>
          </div>
          <div style="margin-bottom: 20px;">
            <input className="FormControl" type="text" id="siteurl"
                   placeholder={app.translator.trans('Site URL')}/>
          </div>


          <h3>上传您的图片：</h3>
          {/* Upload Image button */}
          <div>
            <div
              className={classList(['SitelogoEditor', 'Dropdown', this.attrs.className, this.loading && 'loading', this.isDraggedOver && 'dragover'])}>
              {this.logoUrl && (
                <img className='Sitelogo' src={this.logoUrl} alt="Uploaded Image"
                     style="max-width: 100%; max-height: 200px;"/>
              )}
              <a
                className={this.logoUrl ? 'Dropdown-toggle' : 'Dropdown-toggle AvatarEditor--noAvatar'}
                title='选择网站图片'
                data-toggle="dropdown"
                onclick={this.quickUpload.bind(this)}
                ondragover={this.enableDragover.bind(this)}
                ondragenter={this.enableDragover.bind(this)}
                ondragleave={this.disableDragover.bind(this)}
                ondragend={this.disableDragover.bind(this)}
                ondrop={this.dropUpload.bind(this)}
              >
                {this.loading ? (
                  <LoadingIndicator display="unset" size="large"/>
                ) : (
                  icon('fas fa-plus-circle')
                )}
              </a>
              <ul className="Dropdown-menu Menu">{listItems(this.controlItems().toArray())}</ul>
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

  /**
   * Get the items in the edit avatar dropdown menu.
   *
   * @return {ItemList<import('mithril').Children>}
   */
  controlItems() {
    const items = new ItemList();

    items.add(
      'upload',
      <Button icon="fas fa-upload" onclick={this.openPicker.bind(this)}>
        {app.translator.trans('core.forum.user.avatar_upload_button')}
      </Button>
    );

    items.add(
      'remove',
      <Button icon="fas fa-times" onclick={this.remove.bind(this)}>
        {app.translator.trans('core.forum.user.avatar_remove_button')}
      </Button>
    );

    return items;
  }

  /**
   * Enable dragover style
   *
   * @param {DragEvent} e
   */
  enableDragover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDraggedOver = true;
  }

  /**
   * Disable dragover style
   *
   * @param {DragEvent} e
   */
  disableDragover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDraggedOver = false;
  }

  /**
   * Upload avatar when file is dropped into dropzone.
   *
   * @param {DragEvent} e
   */
  dropUpload(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDraggedOver = false;
    this.upload(e.dataTransfer.files[0]);
  }

  /**
   * If the user doesn't have an avatar, there's no point in showing the
   * controls dropdown, because only one option would be viable: uploading.
   * Thus, when the avatar editor's dropdown toggle button is clicked, we prompt
   * the user to upload an avatar immediately.
   *
   * @param {MouseEvent} e
   */
  quickUpload(e) {
    e.preventDefault();
    e.stopPropagation();
    this.openPicker();
  }

  /**
   * Upload avatar using file picker
   */
  openPicker() {
    if (this.loading) return;

    // Create a hidden HTML input element and click on it so the user can select
    // an avatar file. Once they have, we will upload it via the API.
    const $input = $('<input type="file" accept=".jpg, .jpeg, .png, .bmp, .gif">');

    $input
      .appendTo('body')
      .hide()
      .click()
      .on('input', (e) => {
        this.upload($(e.target)[0].files[0]);
      });
  }

  /**
   * Upload avatar
   *
   * @param {File} file
   */
  upload(file) {
    if (!file || !window.FileReader) return;
    if (this.loading) return;
    // 获取 sitename 和 siteurl
    const sitename = document.getElementById('sitename').value; // 请将这里替换为实际获取 sitename 的逻辑
    const siteurl = document.getElementById('siteurl').value; // 请将这里替换为实际获取 siteurl 的逻辑
    // 存储到 savedState
    this.savedState = {sitename, siteurl};
    app.modal.show(ImageCropModal, {
      file,
      upload: (file) => this.uploadfile(file, sitename, siteurl)
    });
  }

  uploadfile(file, sitename, siteurl) {
    if (this.loading) return;
    this.savedState = this.savedState || {};
    // 保存 file 到 savedState
    this.savedState.file = file;
    // 返回数据给 UploadModal 并触发重新显示
    const form_data = new FormData();
    form_data.append('sitelogo', file);
    form_data.append('sitename', sitename);
    form_data.append('siteurl', siteurl);
    this.loading = true;
    m.redraw();
    app.modal.show(UploadModal, {
      data: form_data,
      state: this.state
    });
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
    const file = this.attrs.data && this.attrs.data.get ? this.attrs.data.get('sitelogo') : undefined;
    if (!file) {
      // 处理 file 不存在的情况
      app.alerts.show(Alert, { type: 'success' }, "站点LOGO不能为空");
      return;
    }

    const sitenameInput = document.getElementById('sitename');
    const siteurlInput = document.getElementById('siteurl');

    if (!sitenameInput || !siteurlInput) {
      app.alerts.show(Alert, { type: 'success' }, "站点名称和URL不能为空！");
      return;
    }
    const sitename = sitenameInput.value;
    const siteurl = siteurlInput.value;

    if (!sitename || !siteurl) {
      app.alerts.show(Alert, { type: 'success' }, "站点名称和URL不能为空！");
      return;
    }
    const data = new FormData();
    data.append('sitelogo', file);
    data.append('sitename', document.getElementById('sitename').value);
    data.append('siteurl', document.getElementById('siteurl').value);
// 转换为普通对象
    const formDataObject = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });

// 输出普通对象内容
    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/nodeloc/friend_link/add`,
        serialize: (raw) => raw,
        body: data
      })
      .then(() => {
        app.alerts.show(Alert, {type: 'success'}, "分享成功");
        this.hide();
        this.state.refresh();
      })
  }
}
