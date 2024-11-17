import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from 'src/app/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userProfile:any;

  constructor(private userService: UserService, private authService: AuthService,private api:ApiService, private route:Router,private keycloak: KeycloakService) {}

  ngOnInit() {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      // Load user data from localStorage
      this.userProfile = JSON.parse(storedUserProfile);
    } else {
      // Subscribe to API to fetch user data
      this.api.userdata.subscribe(res => {
        this.userProfile = res;
        // Persist the data in localStorage
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
      });
    }
  }


  register(){
    this.route.navigate(['/register']);
  }

  login(){
    this.route.navigate(['/login']);
  }

  // logout() {
  //   this.authService.logout();  // Clear session using AuthService
  //   localStorage.removeItem('userProfile');
  // console.log('User logged out');
  // // Redirect to login or clear the current user profile
  // this.userProfile = null;
  // }

  ngOnDestroy() {
    // // Unsubscribe to prevent memory leaks
    // if (this.userSubscription) {
    //   this.userSubscription.unsubscribe();
    // }
  }

  getInitials(firstname: string, lastname: string): string {
    return (firstname.charAt(0) + lastname.charAt(0)).toUpperCase();
  }

  getAvatarBackgroundColor(): string {
    const colors = ['#FF5733', '#33A1FF', '#33FF57', '#FFC133', '#B833FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  //keycloak logout
  logout() {
    this.keycloak.logout();
  }

}
