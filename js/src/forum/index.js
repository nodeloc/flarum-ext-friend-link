import app from 'flarum/forum/app';
import addSidebarNav from './addSiderBar';
import IndexShowPage from './components/IndexShowPage';
import { extend } from 'flarum/common/extend';
import GlobalSearchState from 'flarum/forum/states/GlobalSearchState';
import VPSListState from './states/VPSListState';
import VPS from '../common/models/VPS';
import Merchant from "./model/Merchant";
import Location from "./model/Location";
import VpsTag from "./model/VpsTag";
import LikeNotification from './notification/LikeNotification';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';

app.initializers.add('nodeloc/flarum-ext-vps', () => {
  app.routes.vps = {
    path: '/vps',
    component: IndexShowPage,
  };
  app.store.models.vpsList = VPS;
  app.store.models.vps_merchants = Merchant;
  app.store.models.vps_locations =  Location;
  app.store.models.vps_tags = VpsTag;
  app.vpsListState = new VPSListState();

  addSidebarNav();
  extend(GlobalSearchState.prototype, 'params', function (params) {
    if(app.current.get('routeName') === 'vps'){
      params.cardFilter = "";
    }
  });

});
