import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';

export default function addSidebarNav() {
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'vps',
      <LinkButton icon="fa-solid fa-server" href={
        app.route('vps')
      }>
        {app.translator.trans(`nodeloc-vps.forum.title.page_title`)}
      </LinkButton>,
      100
    );

    return items;
  });
}
