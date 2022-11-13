import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@modules/main/layout/main-layout.component";
import { NotAuthenticatedGuard } from "@guards/not-authenticated.guard";
import { AuthenticatedGuard } from "@guards/authenticated.guard";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardModule) },
      { path: 'login', loadChildren: () => import('./components/authorization/login/login.component').then(m => m.LoginModule), canActivate: [NotAuthenticatedGuard] },
      { path: 'registration', loadChildren: () => import('./components/authorization/registration/registration.component').then(m => m.RegistrationModule), canActivate: [NotAuthenticatedGuard] },
      { path: 'profile', loadChildren: () => import('./components/profile/profile.component').then(m => m.ProfileModule), canActivate:[AuthenticatedGuard] },
      { path: 'deliveries', loadChildren: () => import('./components/deliveries/deliveries.module').then(m => m.DeliveriesModule) }
    ]
  }
]
export const routing = RouterModule.forChild(routes)
