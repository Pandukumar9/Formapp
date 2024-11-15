import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000'; // JSON server URL

  constructor(private http:HttpClient) { }
   // Get the list of fruits
   getFruits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fruits`);
  }

  // Get the list of vegetables
  getVegetables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vegetables`);
  }

  // Add a fruit
  addFruit(fruit: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/fruits`, fruit);
  }

  // Add a vegetable
  addVegetable(vegetable: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vegetables`, vegetable);
  }

  // Edit a fruit
  editFruit(id: number, fruit: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/fruits/${id}`, fruit);
  }

  // Edit a vegetable
  editVegetable(id: number, vegetable: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/vegetables/${id}`, vegetable);
  }

  // Delete a fruit
  deleteFruit(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/fruits/${id}`);
  }

  // Delete a vegetable
  deleteVegetable(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/vegetables/${id}`);
  }
  getusers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  
}
