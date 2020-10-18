import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../user';
import {HttpClient,HttpResponse ,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // Base URL
  private  baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient, private router : Router) { }

  register(user:any)
  {
    let url = this.baseUrl + "/register";
    return this.http.post<any>(url,user);
  }


}
