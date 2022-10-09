import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@modules/main/layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardModule) },
      { path: 'login', loadChildren: () => import('./components/login/login.component').then(m => m.LoginModule) }
    ]
  }
]
export const routing = RouterModule.forChild(routes)
