import app from 'flarum/admin/app';

app.initializers.add('nodeloc-vps', () => {
  app.extensionData
    .for('nodeloc-vps')
    .registerPermission(
    {
      icon: 'fas fa-id-card',
      label: app.translator.trans('nodeloc-vps.admin.settings.allow_add'),
      permission: 'vps.canAddProduct',
    },
    'moderate',
    90
  )
});
