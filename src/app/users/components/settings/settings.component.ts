import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  settings = {
    username: '',
    email: '',
    emailNotifications: true,
    smsNotifications: false,
    profileVisibility: 'public',
    searchVisibility: true
  };

  // Methods to handle saving settings can be implemented here
  saveAccountSettings() {
    console.log("Account settings saved:", this.settings);
  }

  saveNotificationSettings() {
    console.log("Notification settings saved:", this.settings);
  }

  savePrivacySettings() {
    console.log("Privacy settings saved:", this.settings);
  }

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['users/user']); // replace '/dashboard' with the actual route to the User Dashboard
  }
}
