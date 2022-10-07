import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@modules/main/layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadChildren: () => import('./components/login/login.component').then(m => m.LoginModule) }
    ]
  }
]
export const routing = RouterModule.forChild(routes)
