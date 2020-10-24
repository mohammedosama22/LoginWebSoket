import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import {User} from "../user";
import {WebSocketAPI} from "../webSocket";
import {interval, Observable, of, Subscription} from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mySub: Subscription;
  email :any;
  token :any;
  user: User[] = [];
  body:any;
  totalNumberOfLoggedUsers:any;
  totalNumberOfUser:any;

  userNameObservable: Observable<string>;
  userName: String = '';



  constructor(private router : Router ,private dashboardService :DashboardService,private webSocketAPI:WebSocketAPI) {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('Token');

    /* if (email==null || email=='' || email =="" || email == 'null')
     {
       localStorage.setItem('email',null);
        this.router.navigate(['/']);
     }*/

   this.mySub = interval(100).subscribe((func => {

      this.totalNumberOfLoggedUsers=   localStorage.getItem('totalNumberOfLoggedUsers');
      this.totalNumberOfUser=   localStorage.getItem('totalNumberOfUser');

    }));

  }

  ngOnInit() {

    //
    // this.userNameObservable = Observable.create(
    //   of(localStorage.getItem('total1'))
    // );
    // this.userNameObservable.subscribe((name: String) => {
    //   this.totalNumberOfLoggedUsers = name;
    // });





    this.totalNumberOfLoggedUsers;
    this.totalNumberOfUser;
    this.getTotalNumberOfUsers();
     this.getUserS();
  }

getUserS() {
  this.dashboardService.getUsers().subscribe(res => {
  //this.user=res;
  });
}
  getTotalNumberOfUsers() {
    this.dashboardService.getTotalNumberOfUsers().subscribe(res => {
      this.body=res;
      this.totalNumberOfLoggedUsers=this.body.totalNumberOfLoggedUsers;
      this.totalNumberOfUser=this.body.totalNumberOfUser;
      localStorage.setItem('totalNumberOfLoggedUsers',this.totalNumberOfLoggedUsers);
      localStorage.setItem('totalNumberOfUser',this.totalNumberOfUser);

      console.log("totalNumberOfLoggedUsers",this.totalNumberOfLoggedUsers);
      console.log("totalNumberOfUser",this.totalNumberOfUser);
    });
  }

  logout(){
    this.token = localStorage.getItem('token');
     this.email = localStorage.getItem('email');
    this.dashboardService.logout(this.email).subscribe(res =>{
      localStorage.setItem('token',null);
      this.router.navigate(['/']);
      console.log("res",res);
        let total=localStorage.getItem('totalNumberOfLoggedUsers');
        if (this.totalNumberOfLoggedUsers!=0) {
          this.totalNumberOfLoggedUsers = parseInt(total) - 1;
        }
       localStorage.setItem('totalNumberOfLoggedUsers',this.totalNumberOfLoggedUsers);
      //this.router.navigate(['/login'], { replaceUrl: true });
      this.webSocketAPI._disconnect();

    }),(
  error => {
  console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",error);
});

  }



}
