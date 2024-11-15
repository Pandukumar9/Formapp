import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ApiService, AuthService } from 'src/app/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  profilePicture: string | ArrayBuffer | null = null;

  constructor(private authService: AuthService, private http: HttpClient,private users:UserService,private api:ApiService) {}

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
  }

  onProfilePictureSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.profilePicture = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSaveChanges() {
    const updatedUser = {
      ...this.user,
      profilePicture: this.profilePicture, // Add the profile picture
    };

   this.users.updateUserProfile(updatedUser,this.user.id.toString()).subscribe(res => {
    console.log(res,'ress');
    this.api.userdata.next(res);

   })
  }

}
