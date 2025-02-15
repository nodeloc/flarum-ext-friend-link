import Notification from 'flarum/forum/components/Notification';

export default class LikeNotification extends Notification {
  icon() {
    return 'fas fa-camera-retro';
  }

  href() {
    return app.route('friendlink');
  }

  content() {
    const notification = this.attrs.notification;
    const user = notification.fromUser();
    return app.translator.trans('nodeloc-friend-link.forum.notification.like', {
        user,
    });
  }

  excerpt() {

    return (
      <div>
      </div>
    );
  }
}
