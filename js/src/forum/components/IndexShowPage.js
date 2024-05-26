import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import FilterMenuItem from './FilterMenuItem';
import Button from 'flarum/common/components/Button';
import AddProductModal from './AddProductModal';
import AddLocationModal from './AddLocationModal';
import AddMerchantModal from './AddMerchantModal';
import AddTagModal from './AddTagModal';
import Stream from 'flarum/utils/Stream';

import LoadingIndicator from 'flarum/components/LoadingIndicator';
import LoginModal from 'flarum/components/LogInModal';
import {paymentCycleOptions, diskTypeOptions, currencyOptions, availableOptions, renderStars} from '../common/constants';
import MerchantSelectionModal from "./MerchantSelectionModal";
import LocationSelectionModal from "./LocationSelectionModal";
import VpsTagsSelectionModal from "./VpsTagsSelectionModal";

export default class IndexShowPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.bodyClass = 'App--index';
    // Stream to store selected merchants

    this.filterMerchants =   [];
    this.filterLocations = [];
    this.filterVpsTags =  [];
    app.setTitle(app.translator.trans(
      `nodeloc-vps.forum.title.page_title`
    ));
    app.vpsListState.refreshParams({
      filter: {
      },
      sort: '-created_at',
    });
  }

  applySorts(label) {
    const state = app.vpsListState;
    const filters = {
      merchants: this.filterMerchants,
      locations: this.filterLocations,
      tags: this.filterVpsTags
    };
    const sortMap = {
      recent: '-created_at',
      score: '-score',
      score_asc: 'score',
      cpu: '-cpu',
      cpu_asc: 'cpu',
      memory: '-memory',
      memory_asc: 'memory',
      storage: '-storage',
      storage_asc: 'storage',
      bandwidth: '-bandwidth',
      bandwidth_asc: 'bandwidth',
      GIG: '-gig',
      GIG_asc: 'gig',
      price: '-price',
      price_asc: 'price'
    };

    state.refreshParams({
      filter: {
        merchants: filters.merchants.length  ? filters.merchants.map(m => m.id) : "",
        locations: filters.locations.length ? filters.locations.map(l => l.id) : "",
        tags: filters.tags.length ? filters.tags.map(t => t.id) : ""      },
      sort: sortMap[label], // 使用传递进来的 label 参数
    });
  }

  formatM(gig) {
    if (gig < 1000) {
      return gig + 'M';
    } else {
      return (gig / 1000).toFixed(1) + 'G';
    }
  }

  formatG(gig) {
    if (gig < 1000) {
      return gig + 'G';
    } else {
      return (gig / 1000).toFixed(1) + 'T';
    }
  }
  view() {
    let loading = null;
    const state = app.vpsListState;
    const canAdd = app.session.user && app.forum.attribute('canAddProduct')===true;
    if (state.isInitialLoading() || state.isLoadingNext()) {
      loading = LoadingIndicator.component({
        size: 'large',
      });
    } else if (state.hasNext()) {
      loading = Button.component(
        {
          className: 'Button',
          icon: 'fas fa-chevron-down',
          onclick: state.loadNext.bind(state),
        },
        "加载更多"
      );
    }

    if (state.isInitialLoading() && state.isEmpty()) {
      return <LoadingIndicator/>;
    }
    return (
      <div className="IndexPage">
        {IndexPage.prototype.hero()}
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">
              <div>
                <FilterMenuItem
                  onChange={(label) => this.applySorts(label)}
                  state={state}
                />
                <Button className="Button merchant hasIcon" icon="fas fa-store" onclick={() => this.openMerchantSelectionModal()}>
                  选择商家
                </Button>
                <Button style="display: inline-block;margin-left: 10px;" className="Button location hasIcon" icon="fa-solid fa-location-dot" onclick={() => this.openLocationSelectionModal()}>
                  选择地区
                </Button>
                <Button style="display: inline-block;margin-left: 10px;" className="Button location hasIcon" icon="fa-solid fa-tags" onclick={() => this.openTagsSelectionModal()}>
                  选择标签
                </Button>

                <Button
                  className={`Button vps-fresh`}
                  icon="fas fa-sync"
                  aria-label="刷新"
                  onclick={() => {
                    state.refresh()
                  }}>
                </Button>
                {canAdd &&
                <Button
                  className={`Button vps-add-botton`}
                  icon="fas fa-plus"
                  onclick={() => {
                    if (!app.session.user) {
                      app.modal.show(LoginModal)
                      return;
                    }
                    app.modal.show(AddProductModal, {
                      state: state
                    })
                  }}>
                  {app.translator.trans(`nodeloc-vps.forum.button.product`)}
                </Button>
                }
                {canAdd &&
                <Button
                  className={`Button vps-add-botton`}
                  icon="fas fa-plus"
                  onclick={() => {
                    if (!app.session.user) {
                      app.modal.show(LoginModal)
                      return;
                    }
                    app.modal.show(AddMerchantModal, {
                      state: state
                    })
                  }}>
                  {app.translator.trans(`nodeloc-vps.forum.button.merchant`)}
                </Button>
                }
                {canAdd &&
                <Button
                  className={`Button vps-add-botton`}
                  icon="fas fa-plus"
                  onclick={() => {
                    if (!app.session.user) {
                      app.modal.show(LoginModal)
                      return;
                    }
                    app.modal.show(AddLocationModal, {
                      state: state
                    })
                  }}>
                  {app.translator.trans(`nodeloc-vps.forum.button.location`)}
                </Button>
                }
                {canAdd &&
                <Button
                  className={`Button vps-add-botton`}
                  icon="fas fa-plus"
                  onclick={() => {
                    if (!app.session.user) {
                      app.modal.show(LoginModal)
                      return;
                    }
                    app.modal.show(AddTagModal, {
                      state: state
                    })
                  }}>
                  {app.translator.trans(`nodeloc-vps.forum.button.tag`)}
                </Button>
                }
              </div>
              <ul className="VPS-SiteList">
                {
                  state.getPages().map((pg) => {
                    return pg.items.map((item) => {
                      const tagIds = item.data.relationships.tags.data.map(tag => tag.id);
                      const tagNames = tagIds.map(tagId => {
                        const tag = app.store.data.vps_tags[tagId];
                        return tag ? tag.tag_name() : 'Unknown Tag';
                      });
                      return  (
                        <li className="VPS-List-item" id={"vps-" + item.id()}>
                          <div className="VPS-Product">
                            <span className="merchant">{app.store.data.vps_merchants[item.merchant_id()].merchant_name()}</span>
                            <br />
                            <span className="product">{item.product_name()}</span>
                          </div>
                          <div className="VPS-store">
                            <span>{renderStars(item.score())}</span>
                            <br/>
                            <span>{availableOptions[item.available()]}</span>
                          </div>
                          <div className="VPS-config">
                            <span >
                              {item.cpu()} vCPU {item.memory()}G RAM {this.formatG(item.storage())} {diskTypeOptions[item.disk_type()]}
                            </span>
                            <br />
                            {this.formatM(item.GIG())}带宽 {this.formatG(item.bandwidth())}流量
                          </div>
                          <div className="VPS-location">
                            <span >
                              {app.store.data.vps_locations[item.location_id()].location_name()}
                            </span>
                          </div>
                          <div className="VPS-cost">
                            <span >
                              {item.cost()}{currencyOptions[item.currency()]}/{paymentCycleOptions[item.payment_cycle()]}
                            </span>
                            <br/>
                            <span>约{item.price()}CNY/年</span>
                          </div>
                          <div className="VPS-tags">
                            {tagNames.map(tagName => (
                              <span className="tag-style">{tagName}</span>
                            ))}
                          </div>

                          <div className="VPS-action">
                            <a href="#">监控</a>
                            <a href={item.review_url() ? item.review_url() : "https://www.nodeloc.com/t/review"}>测评</a>
                            <a href={item.buy_url() ? item.buy_url() : "#"}>购买</a>
                          </div>
                        </li>
                      );
                    });

                  })
                }
              </ul>
              {<div className="SupportSearchList-loadMore vps-more">{loading}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
  openMerchantSelectionModal() {
    // 打开商家选择弹窗
    app.modal.show(MerchantSelectionModal, {
      state: this.state,
      onsubmit: (selectedMerchants) => {
        this.handleMerchantSelect(selectedMerchants);
        m.redraw();
      }
    });
  }

  openLocationSelectionModal() {
    // 打开商家选择弹窗
    app.modal.show(LocationSelectionModal, {
      state: this.state,
      onsubmit: (selectedLocations) => {
        this.handleLocationSelect(selectedLocations);
        m.redraw();
      }
    });
  }

  openTagsSelectionModal() {
    // 打开商家选择弹窗
    app.modal.show(VpsTagsSelectionModal, {
      state: this.state,
      onsubmit: (selectedVpsTags) => {
        this.handleVpsTagsSelect(selectedVpsTags);
        m.redraw();
      }
    });
  }
  handleMerchantSelect(selectedMerchants) {
    this.filterMerchants = selectedMerchants;
    this.applySorts();
    m.redraw();
  }

  handleLocationSelect(selectedLocations) {
    this.filterLocations = selectedLocations;
    this.applySorts();
    m.redraw();
  }

  handleVpsTagsSelect(selectedVpsTags) {
    this.filterVpsTags = selectedVpsTags;
    this.applySorts();
    m.redraw();
  }
}
