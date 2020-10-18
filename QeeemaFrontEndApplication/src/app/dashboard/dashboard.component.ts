import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import {User} from "../user";
import {WebSocketAPI} from "../webSocket";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  email :any;
  user: User[] = [];
  body:any;
  totalNumberOfLoggedUsers:any;
  totalNumberOfUser:any;

  constructor(private router : Router ,private dashboardService :DashboardService,private webSocketAPI:WebSocketAPI) {
    let email = localStorage.getItem('email');
    if (email==null || email=='' || email =="" || email == 'null')
    {
      localStorage.setItem('email',null);
       this.router.navigate(['/']);
    }




  }

  ngOnInit() {
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
      console.log("totalNumberOfLoggedUsers",this.totalNumberOfLoggedUsers);
      console.log("totalNumberOfUser",this.totalNumberOfUser);
    });
  }

  logout(){
    this.email = localStorage.getItem('email');
    this.dashboardService.logout(this.email).subscribe(res =>{
      localStorage.setItem('email',null);
      this.router.navigate(['/']);
      console.log("res",res);
        //this.router.navigate(['/login'], { replaceUrl: true });
      this.webSocketAPI._disconnect();

    }),(
  error => {
  console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",error);
});

  }



}
