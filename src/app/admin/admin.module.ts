import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [
  { path: 'admin-dash', component: AdminDashboardComponent },
  // { path: 'list', component: ListItemsComponent },
  // { path: 'add', component: AddItemComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class AdminModule { }
