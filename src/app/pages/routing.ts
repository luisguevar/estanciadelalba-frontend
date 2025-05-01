import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () => import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule),
    // data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () => import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () => import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () => import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'apps/users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'apps/roles',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  },
  {
    path: 'apps/permissions',
    loadChildren: () => import('./permission/permission.module').then((m) => m.PermissionModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('../modules/usuarios/usuarios.module').then((m) => m.UsuariosModule)
  },
  {
    path: 'tarifa-hotelera',
    loadChildren: () => import('../modules/tarifa-hotelera/tarifa-hotelera.module').then((m) => m.TarifaHoteleraModule)
  },
  {
    path: 'huespedes',
    loadChildren: () => import('../modules/huespedes/huespedes.module').then((m) => m.HuespedesModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('../modules/reservas/reservas.module').then((m) => m.ReservasModule)
  },

  {
    path: 'estancias',
    loadChildren: () => import('../modules/estancias/estancias.module').then((m) => m.EstanciasModule)
  },
  {
    path: 'recepcion',
    loadChildren: () => import('../modules/recepcion/recepcion.module').then((m) => m.RecepcionModule)
  },
  {
    path: 'panel-control',
    loadChildren: () => import('../modules/panel-control/panel-control.module').then((m) => m.PanelControlModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('../modules/reporte/reporte.module').then((m) => m.ReporteModule)
  },

  {
    path: 'facturacion',
    loadChildren: () => import('../modules/facturacion/facturacion.module').then((m) => m.FacturacionModule)
  },
  {
    path: 'reclamaciones',
    loadChildren: () => import('../modules/reclamaciones/reclamaciones.module').then((m) => m.ReclamacionesModule)
  },

  /*   {
      path: 'pagina-web',
      loadChildren: () => import('../modules/pagina-web/pagina-web.module').then((m) => m.PaginaWebModule)
    }, */

  {
    path: '',
    redirectTo: '/panel-control',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
