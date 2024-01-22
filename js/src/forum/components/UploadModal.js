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
    }

    title() {
        return app.translator.trans(`nodeloc-friend-link.forum.title.share_my_site`);
    }

    className() {
        return 'Modal--large';
    }

    oncreate(vnode) {
        super.oncreate(vnode);
    }

    onremove() {
    }


    content() {
        if (!this.user) {
            return;
        }
        return (
            <div>
                <div className="Modal-body">
                    <p style="margin-bottom: 20px;font-size:15px">{app.translator.trans(`nodeloc-friend-link.forum.tips.upload_tips`)}</p>
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
                            <a
                                className={this.user.avatarUrl() ? 'Dropdown-toggle' : 'Dropdown-toggle AvatarEditor--noAvatar'}
                                title={app.translator.trans('core.forum.user.avatar_upload_tooltip')}
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
                    {/* Upload Image button */}
                    <Button
                        className="Button Button--primary"
                    >
                        确认
                    </Button>
                    <Button oclassName="Button">
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
        app.modal.show(ImageCropModal, {
            file,
            upload: this.uploadfile,
        });
    }

    uploadfile(file) {
        if (this.loading) return;
        // 返回数据给 UploadModal 并触发重新显示
        const user = app.session.user;
        const data = new FormData();
        data.append('avatar', file);

        this.loading = true;
        m.redraw();
        console.log(this);
        app
            .request({
                method: 'POST',
                url: `${app.forum.attribute('apiUrl')}/users/${user.id()}/avatar`,
                serialize: (raw) => raw,
                body: data,
            })
            .then(response => this.success(response), error => this.failure(error))
            .finally(() => {
                // 处理完成后显示 UploadModal
                app.modal.show(UploadModal);
            });
    }

    /**
     * Remove the user's avatar.
     */
    remove() {
        const user = this.user;

        this.loading = true;
        m.redraw();
        // app
        //   .request({
        //     method: 'DELETE',
        //     url: `${app.forum.attribute('apiUrl')}/users/${user.id()}/avatar`,
        //   })
        //   .then(this.success.bind(this), this.failure.bind(this));
    }

    /**
     * After a successful upload/removal, push the updated user data into the
     * store, and force a re-computation of the user's avatar color.
     *
     * @param {object} response
     * @protected
     */
    success(response) {
        app.store.pushPayload(response);
        delete this.user.avatarColor;

        this.loading = false;
        m.redraw();
        app.modal.close();
    }

    /**
     * If avatar upload/removal fails, stop loading.
     *
     * @param {object} response
     * @protected
     */
    failure(response) {
        this.loading = false;
        m.redraw();
        if (app.modal && app.modal.modal && app.modal.modal.componentClass === ImageCropModal) {
            app.modal.modal.attrs.error = error;
            m.redraw();
        }
    }


    /**
     * Add or remove file from selected files
     *
     * @param {File} file
     */
    onConfirmSubmit(file) {
        app
            .request({
                method: 'POST',
                url: `${app.forum.attribute('apiUrl')}/nodeloc/friend_link/add`,
                body: {uuidList, width, height},
                sitename: document.getElementById('sitename').value,
                siteurl: document.getElementById('siteurl').value,
            })
            .then(() => {
                app.alerts.show(Alert, {type: 'success'}, "分享成功");
                this.hide();
                this.state.refresh();
            })
    }


}
