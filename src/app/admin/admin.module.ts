import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

const routes: Routes = [
  // { path: '', redirectTo: '/admin-dash', pathMatch: 'full' },
  { path: 'admin-dash', component: AdminDashboardComponent },
  // { path: 'list', component: ListItemsComponent },
  // { path: 'add', component: AddItemComponent },

];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddItemComponent,
    ListItemsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
