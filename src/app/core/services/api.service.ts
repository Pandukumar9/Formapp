import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userdata = new BehaviorSubject<any>({});
  constructor() { }
}
