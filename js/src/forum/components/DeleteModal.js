
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Alert from 'flarum/common/components/Alert';


export default class DeleteModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);
        this.show_id = vnode.attrs.show_id;
    }

    title() {
        return "是否删除链接";
    }

    className() {
        return 'HideCardLinkModal Modal--small';
    }

    content() {
        return(
            <div className="Modal-footer">
                 <Button
                    className={'Button Button--primary m-r-10'}
                    onclick = {()=>this.deleteReq(this.show_id)}
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

  deleteReq(show_id){
        app
        .request({
            method: 'POST',
            url: `${app.forum.attribute('apiUrl')}/nodeloc/friend_link/delete`,
            body: { show_id },
        })
        .then(() => {
            app.alerts.show(Alert, { type: 'success' }, "删除成功");
            setTimeout(() => app.alerts.clear(), 3000);
            this.hide()
            var ui = document.getElementById("card-"+show_id);
            ui.style.display="none";
        })

    }
}
