import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private api: ApiService
  ) {
    // Initialize the form with email and password fields
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (success) => {
          console.log(success);
          if (success.Status === "Success") {
            // Store user data using a shared service
            this.api.userdata.next(success.userData);
            this.authService.setLoggedInUser(success.userData); // Save user in shared service
            success.userData.role == 'admin' ? this.router.navigate(['/admin-dash']) : this.router.navigate(['/users/user']);  // Navigate to home on successful login
            // window.location.reload();    // Reload the page

            // Navigate based on the user's role
            success.userData.role === 'admin'
              ? this.router.navigate(['/admin-dash'])
              : this.router.navigate(['/users/user']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      );
    }
  }

}
