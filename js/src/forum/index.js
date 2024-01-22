import app from 'flarum/forum/app';
import addSidebarNav from './addSiderBar';
import IndexShowPage from './components/IndexShowPage';
import { extend } from 'flarum/common/extend';
import GlobalSearchState from 'flarum/forum/states/GlobalSearchState';
import FileListState from './states/FileListState';
import FriendLinkListState from './states/FriendLinkListState';
import GetList from '../common/models/GetList';
import LikeNotification from './notification/LikeNotification';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';

app.initializers.add('nodeloc/flarum-ext-friend-link', () => {
  app.routes.friendlink = {
    path: '/friendlink',
    component: IndexShowPage,
  };
  app.notificationComponents.friendLinkLiked = LikeNotification;

  app.store.models.friendLinkList = GetList;

  app.friendLinkListState = new FriendLinkListState();
  app.fileListState = new FileListState();

  addSidebarNav();
  extend(GlobalSearchState.prototype, 'params', function (params) {
    if(app.current.get('routeName') === 'friendlink'){
      params.cardFilter = "";
    }
  });

  extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
    items.add('friendLinkLiked', {
      name: 'friendLinkLiked',
      icon: 'fas fa-camera-retro',
      label: "有人对您分享的卡片表示很赞",
    });
  });

});
