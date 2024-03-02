import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { GuestlayoutComponent } from '@components/ui/guestlayout/guestlayout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'admin/categories/add',
        loadChildren: () =>
          import('./pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'admin/categories/:id',
        loadChildren: () =>
          import('./pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'admin/categories',
        loadChildren: () =>
          import('./pages/categories/list/list.module').then(
            (m) => m.ListModule
          ),
      },
      {
        path: 'admin/articles/add',
        loadChildren: () =>
          import('./pages/articles/articles.module').then(
            (m) => m.ArticlesModule
          ),
      },
      {
        path: 'admin/articles/:id',
        loadChildren: () =>
          import('./pages/articles/articles.module').then(
            (m) => m.ArticlesModule
          ),
      },
      {
        path: 'admin/articles',
        loadChildren: () =>
          import('./pages/articles/list/list.module').then((m) => m.ListModule),
      },
    ],
  },
  {
    path: '',
    component: GuestlayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./ui/home/home.module').then(m => m.HomeModule) },
        { path: 'contact', loadChildren: () => import('./ui/contact/contact.module').then(m => m.ContactModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
