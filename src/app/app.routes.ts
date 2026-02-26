import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'home', redirectTo: '/', pathMatch: 'full' },
   {
      path: 'login',
      loadComponent: () =>
         import('./modules/login/login.component').then(
            (c) => c.LoginComponent,
         ),
   },
   {
      path: 'companies',
      loadComponent: () =>
         import('./modules/company/company.component').then(
            (c) => c.CompanyComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'minerals',
      loadComponent: () =>
         import('./modules/mineral/mineral.component').then(
            (c) => c.MineralComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'type-minerals',
      loadComponent: () =>
         import('./modules/type-mineral/type-mineral.component').then(
            (c) => c.TypeMineralComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'mines',
      loadComponent: () =>
         import('./modules/mine/mine.component').then((c) => c.MineComponent),
      canActivate: [authGuard],
   },
   {
      path: 'lots',
      loadComponent: () =>
         import('./modules/lot/lot.component').then((c) => c.LotComponent),
      canActivate: [authGuard],
   },
   {
      path: 'suppliers',
      loadComponent: () =>
         import('./modules/supplier/supplier.component').then(
            (c) => c.SupplierComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'cooperatives',
      loadComponent: () =>
         import('./modules/cooperative/cooperative.component').then(
            (c) => c.CooperativeComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'loads',
      loadComponent: () =>
         import('./modules/load/load.component').then((c) => c.LoadComponent),
      canActivate: [authGuard],
   },
   {
      path: 'liquidations',
      loadComponent: () =>
         import('./modules/liquidation/liquidation.component').then(
            (c) => c.LiquidationComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'percentage-liquidations',
      loadComponent: () =>
         import('./modules/percentage-liquidation/percentage-liquidation.component').then(
            (c) => c.LiquidationComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'users',
      loadComponent: () =>
         import('./modules/user/user.component').then(
            (c) => c.UserComponent,
         ),
      canActivate: [authGuard],
   },
   {
      path: 'welcome',
      loadComponent: () =>
         import('./modules/welcome/welcome.component').then(
            (c) => c.WelcomeComponent,
         )
   },
   {
      path: '**',
      pathMatch: 'full',
      loadComponent: () =>
         import('./shared/components/nout-found/nout-found.component').then(
            (c) => c.NoutFoundComponent,
         ),
   },
];
