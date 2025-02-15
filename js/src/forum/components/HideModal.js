
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Alert from 'flarum/common/components/Alert';


export default class HideModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);
        this.show_id = vnode.attrs.show_id;
    }

    title() {
        return "是否隐藏链接";
    }

    className() {
        return 'HideCardLinkModal Modal--small';
    }

    content() {
        return(
            <div className="Modal-footer">
                 <Button
                    className={'Button Button--primary m-r-10'}
                    onclick = {()=>this.hideReq(this.show_id)}
                >
                    确定
                </Button>
                <Button
                    className={'Button'}
                    onclick = {()=>{this.hide()}}
                >
                    取消
                </Button>
            </div>
        )
    }

    hideReq(show_id){
        app
        .request({
            method: 'POST',
            url: `${app.forum.attribute('apiUrl')}/nodeloc/friend_link/hide`,
            body: { show_id },
        })
        .then(() => {
            app.alerts.show(Alert, { type: 'success' }, "隐藏成功");
            setTimeout(() => app.alerts.clear(), 3000);
            this.hide();
        })

    }
}
