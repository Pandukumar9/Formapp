import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router, private api: ApiService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<User[]>(this.loginUrl).pipe(
      map(users => {
        // Find the user based on username and password
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          // Store token and role in localStorage
          localStorage.setItem('authToken', user.token);
          localStorage.setItem('userRole', user.role);
          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('userName', user.username);
          return { userData: user, Status: "Success" };
        } else {
          return "Failed";
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(false);  // Return false on error
      })
    );
  }

  logout(): void {
    this.api.userdata.next({});
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  // Method to register a new user
  register(username: string, email: string, password: string): Observable<any> {
    // Generating a token and setting a default role
    const authToken = this.generateToken();
    const user = {
      id: this.generateUserId(), // Simulating ID generation; replace with backend-generated ID if available
      username,
      email,
      password,
      role: 'user',  // Default role
      token: authToken
    };

    return this.http.post(this.loginUrl, user).pipe(
      map((response: any) => {
        // Save the auth token and role in local storage upon successful registration
        // localStorage.setItem('authToken', authToken);
        // localStorage.setItem('userRole', user.role);
        // localStorage.setItem('userId', user.id.toString());
        return response;
      })
    );
  }

  // Helper method to simulate token generation
  private generateToken(): string {
    return Math.random().toString(36).substring(2);
  }

  // Helper method to simulate unique user ID generation (for frontend-only; otherwise, let backend handle this)
  private generateUserId(): number {
    return Math.floor(Math.random() * 100000); // Just for demo; use a real ID system for production
  }
}
