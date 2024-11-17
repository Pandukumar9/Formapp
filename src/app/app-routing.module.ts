import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  // { path: 'login', component:LoginComponent},
  // { path: 'register', component:RegisterComponent},

    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      canActivate: [roleGuard],
      data: { roles: ['farmer'] }
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      canActivate: [roleGuard],
      data: { roles: ['custamer'] }
    },
    // { path: '**', redirectTo: '/home' }, // Catch-all for unknown routes


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
