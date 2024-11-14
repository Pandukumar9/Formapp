import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA'
  };

  onSaveChanges() {
    console.log('User data saved:', this.user);
  }
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['users/user']); // replace '/dashboard' with the actual route to the User Dashboard
  }
}
