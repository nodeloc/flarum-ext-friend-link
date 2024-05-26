import Component from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';

export default class FilterMenuItem extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.state = vnode.attrs.state;
  }

  view() {
    const options = ['recent', 'score','score_asc', 'cpu','cpu_asc', 'memory','memory_asc','storage','storage_asc','bandwidth','bandwidth_asc','GIG','GIG_asc','price','price_asc'];
    const selected = app.search.cachedSearches.cardFilter || 'recent';

    return Dropdown.component(
      {
        buttonClassName: 'Button',
        label: app.translator.trans(
          `nodeloc-vps.forum.filter.${selected}_label`
        )
      },
      options.map((label) => {
        const active = selected === label;

        return Button.component(
          {
            icon: active ? 'fas fa-check' : true,
            active: active,
            onclick: () => this.updateFilter(label),
          },
          app.translator.trans(`nodeloc-vps.forum.filter.${label}_label`)
        );
      })
    );
  }

  updateFilter(label) {
    this.attrs.onChange(label); // 将所选的过滤器选项传递给父组件
  }
}
