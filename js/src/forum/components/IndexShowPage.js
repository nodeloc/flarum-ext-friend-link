import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import FilterMenuItem from './FilterMenuItem';
import Button from 'flarum/common/components/Button';
import UploadModal from './UploadModal';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import avatar from 'flarum/helpers/avatar';
import Link from 'flarum/components/Link';
import LoginModal from 'flarum/components/LogInModal';
import HideModal from './HideModal';
import ApproveModal from './ApproveModal';

export default class IndexShowPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.bodyClass = 'App--index';
    app.setTitle(app.translator.trans(
      `nodeloc-friend-link.forum.title.page_title`
    ));

    app.friendLinkListState.refreshParams({
      filter: {},
      sort: '-created_time',
    });
  }

  view() {
    let loading = null;
    const state = app.friendLinkListState;
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
                  state={state}
                />
                <Button
                  className={`Button friendLink-fresh`}
                  icon="fas fa-sync"
                  aria-label="刷新"
                  onclick={() => {
                    state.refresh()
                  }}>
                </Button>
                <Button
                  className={`Button friendLink-upload-botton`}
                  icon="fas fa-plus"
                  onclick={() => {
                    if (!app.session.user) {
                      app.modal.show(LoginModal)
                      return;
                    }
                    app.modal.show(UploadModal, {
                      state: state
                    })
                  }}>
                  {app.translator.trans(`nodeloc-friend-link.forum.button.share_my_site`)}
                </Button>
              </div>
              <ul className="FriendLink-SiteList">
                {
                  state.getPages().map((pg) => {
                    return pg.items.map((item) => {
                      // 检查当前用户是否是管理员
                      const isAdmin = app.session.user && app.session.user.isAdmin();
                      const isOwner = app.session.user && item.user().id() === app.session.user.id();

                      // 如果是管理员，或者 item.status() 为真，则渲染该项
                      return (isAdmin || isOwner || item.status()) && (
                        <li className="FriendLink-SiteList-item" id={"card-" + item.id()}>
                          <a href={item.siteurl()} target="_blank" rel="noopener noreferrer"
                             style="text-decoration: none;">
                            <div className="FriendLink-SiteList-logo">
                              <img className="Sitelogo" loading="lazy" src={item.sitelogourl()}/>
                            </div>
                            <div className="FriendLink-SiteList-site">
                              <a href={item.siteurl()} target="_blank" rel="noopener noreferrer">
                                {item.sitename()}
                              </a>
                            </div>
                            <div className="FriendLink-SiteList-user">
                                          <span className="username">
                                            <a
                                              href={app.route('user', {username: item.user().username()})}>{item.user().username()}</a>
                                          </span>
                            </div>
                          </a>
                          <div className="action-buttons">
                            {this.likeButton(item, state)}
                            {this.exchangeButton(item, this)}
                            {!item.status() && isAdmin && this.approveButton(item, this)}
                          </div>
                        </li>
                      );
                    });

                  })
                }
              </ul>
              {<div className="SupportSearchList-loadMore friendLink-more">{loading}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  getClass(width, height) {
    // (/Mobi|Android|iPhone/i.test(navigator.userAgent))
    if (width > height) {
      return "tall";
    }
    if (height < 1000) {
      return "tall";
    }
    if (height > 1000) {
      return "taller";
      ;
    }
    return "taller";
    ;
  }

  likeStatus(count) {
    if (count > 0 && count < 1000) {
      return count
    }
    if (count >= 1000) {
      return count / 1000 + "k"
    }
    return ""
  }

  viewer(item) {
    var count = item.view_count();
    if (count >= 1000) {
      count = count / 1000 + "k";
    }
    return (
      <Button
        className={`Button viewer`}
        icon={"far fa-eye"}
        aria-label="浏览量"//防止console报错
        disable={true}
      >
        {count}
      </Button>
    )
  }

  likeButton(item, state) {
    return (
      <Button
        className={`Button like`}
        icon={item.is_my_like() ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
        aria-label="点赞"//防止console报错
        onclick={() => {
          if (!app.session.user) {
            app.modal.show(LoginModal)
            return;
          }
          this.like(item.id(), state);
        }}>
        {this.likeStatus(item.like_count())}
      </Button>
    )
  }

  like(show_id, state) {
    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/nodeloc/friend_link/like`,
        body: {show_id},
      })
      .then((msg) => {
        if (msg.status) {
          $("#card-" + show_id + " .action .like i").removeClass("far fa-thumbs-up")
          $("#card-" + show_id + " .action .like i").addClass("fas fa-thumbs-up")
          var origin = $("#card-" + show_id + " .action .like span").text();
          if (!origin) {
            origin = 0;
          }
          var likeNum = parseInt(origin) + 1;
          if (origin >= 1000) {
            likeNum = origin / 1000 + "k";
          }
          $("#card-" + show_id + " .action .like span").text(likeNum)
          return;
        }
      })
      .catch((error) => {
        m.redraw();
      });
  }

  exchangeButton(item, e) {
    const isAdmin = app.session.user && app.session.user.isAdmin();

    if (isAdmin || (app.session.user && app.session.user.data.id === item.user().id())) {
      return (
        <Button
          className={`Button bulk`}
          icon="fas fa-trash"
          aria-label="删除链接"
          onclick={() => {
            if (!app.session.user) {
              app.modal.show(LoginModal);
              return;
            }

            app.modal.show(HideModal, {
              show_id: item.id(),
            });
          }}
        ></Button>
      );
    }
  }

  approveButton(item, e) {
    const isAdmin = app.session.user && app.session.user.isAdmin();

    if (isAdmin) {
      return (
        <Button
          className={`Button bulk`}
          icon="fas fa-check"
          aria-label="审批链接"
          onclick={() => {
            if (!app.session.user) {
              app.modal.show(LoginModal);
              return;
            }

            app.modal.show(ApproveModal, {
              show_id: item.id(),
            });
          }}
        ></Button>
      );
    }
  }
}
