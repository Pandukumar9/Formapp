import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { SupportComponent } from './components/support/support.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserDashboardComponent },
  { path: 'support', component: SupportComponent },
  { path: 'userorder', component:  UserOrdersComponent},
  { path: 'userprofile', component:  UserProfileComponent },
  { path: 'usersetting', component: SettingsComponent },
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    SupportComponent,
    UserProfileComponent,
    SettingsComponent,
    UserOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ]
})
export class UsersModule { }
