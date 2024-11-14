import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Import services, interceptors, guards here
// import { AuthService } from './services/auth.service';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}

// The CoreModule is used for services that should be provided at the root level and only loaded once (e.g., AuthService, AuthGuard). This module is typically imported in AppModule.