import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// Import shared components, directives, and pipes here
// import { SharedComponent } from './components/shared-component/shared-component.component';



@NgModule({
  declarations: [
    // SharedComponent,
  
    // HeaderComponent,
    LoginComponent,
    RegisterComponent,
    // DashboardComponent,
    HomeComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    // SharedComponent,
    CommonModule
  ]
})
export class SharedModule { }
// The SharedModule is where you can import and export common components, directives, and pipes to use across multiple modules without having to re-import them.