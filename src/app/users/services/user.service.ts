import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject<{ name: string, role: string } | null>(null);  // Default is null
  user$ = this.userSource.asObservable();  // Observable for subscribing

  constructor() {}

  // Set user details in BehaviorSubject
  setUser(userName: string, userRole: string): void {
    this.userSource.next({ name: userName, role: userRole });
  }

  // Method to get user details from localStorage (for initial load)
  getUser(): { name: string, role: string } | null {
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    if (userName && userRole) {
      return { name: userName, role: userRole };
    }
    return null;
  }

  // Method to clear user data from localStorage on logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.userSource.next(null);  // Reset the BehaviorSubject
  }
}
