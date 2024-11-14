import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  constructor(private userService: UserService, private authService: AuthService,private api:ApiService, private route:Router) {}
  userProfile:any;
  ngOnInit(): void {
    this.api.userdata.subscribe(res => {
      this.userProfile = res;
    })
  }

  logout(): void {
    this.authService.logout();  // Clear session using AuthService
    // window.location.reload();    // Reload the page
  }

  ngOnDestroy(): void {
    // // Unsubscribe to prevent memory leaks
    // if (this.userSubscription) {
    //   this.userSubscription.unsubscribe();
    // }
  }

  register(){
    this.route.navigate(['/register']);
  }

  login(){
    this.route.navigate(['/login']);
  }
}
