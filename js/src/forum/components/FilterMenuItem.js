import Component from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';
export default class FilterMenuItem extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.state = vnode.attrs.state;
}

  view() {
    const options = ['recent', 'score'];
    const selected = app.search.cachedSearches.cardFilter?app.search.cachedSearches.cardFilter:"recent";

    return (
      Dropdown.component(
        {
          buttonClassName: 'Button',
          label: app.translator.trans(
            `nodeloc-friend-link.forum.filter.${selected}_label`
          )
        },
        Object.keys(options).map((value) => {
          const label = options[value];
          const active = selected == label;

          return Button.component(
            {
              icon: active ? 'fas fa-check' : true,
              active: active,
              onclick: () => {
                if(label=="recent"){
                  app.search.cachedSearches={cardFilter:"recent"}
                  this.state.refreshParams({
                    filter: {
                        query: this.search
                    },
                    sort: '-created_time',
                  })
                }
                if(label=="score"){
                  app.search.cachedSearches={cardFilter:"score"}
                  this.state.refreshParams({
                    filter: {
                        query: this.search
                    },
                    sort: '-like_count',
                  })
                }
              },
            },
            app.translator.trans(`nodeloc-friend-link.forum.filter.${label}_label`)
          );
        })
      )
    );
  }
}
