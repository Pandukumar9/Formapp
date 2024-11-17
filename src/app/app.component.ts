import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isactive:string="hai"
  title = 'formerapp';
  constructor(private keycloak: KeycloakService) {}
  ngOnInit(): void {
    console.log(this.keycloak.isUserInRole('farmer'));
    console.log(this.keycloak.isUserInRole('custamer'));
  }

  logout() {
    this.keycloak.logout();
  }
  login() {
    this.keycloak.login();
  }
}
// npx json-server db.json
