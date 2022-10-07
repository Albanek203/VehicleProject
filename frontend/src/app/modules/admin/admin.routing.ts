import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', loadChildren: () => import('./components/users/users.component').then(m => m.UsersModule) }
    ]
  }
]
export const routing = RouterModule.forChild(routes)