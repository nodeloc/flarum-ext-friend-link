
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Alert from 'flarum/common/components/Alert';


export default class HideModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);
        this.show_id = vnode.attrs.show_id;
    }

    title() {
        return "是否审批该链接？";
    }

    className() {
        return 'ApproveCardLinkModal Modal--small';
    }

    content() {
        return(
            <div className="Modal-footer">
                 <Button
                    className={'Button Button--primary m-r-10'}
                    onclick = {()=>this.approveReq(this.show_id)}
                >
                    确定
                </Button>
                <Button
                    className={'Button'}
                    onclick = {()=>{this.approve()}}
                >
                    取消
                </Button>
            </div>
        )
    }

    approveReq(show_id){
        app
        .request({
            method: 'POST',
            url: `${app.forum.attribute('apiUrl')}/nodeloc/friend_link/approve`,
            body: { show_id },
        })
        .then(() => {
            app.alerts.show(Alert, { type: 'success' }, "审批成功");
            this.hide();
        })

    }
}
