
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../user';
import {HttpClient,HttpResponse ,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Base URL
  private  baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient, private router : Router) { }


  getUsers(){
    let url = this.baseUrl + "/getUserDetails";
    return this.http.get(url);
  }

  getTotalNumberOfUsers(){
    let url = this.baseUrl + "/getTotalNumberOfUsers";
    return this.http.get(url);
  }


  logout(email:any) {
    let url = this.baseUrl + "/logout?email=" + email;
    return this.http.get(url,email);

  }


}
