import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../user";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {debounce} from "rxjs/internal/operators";
import {WebSocketAPI} from "../webSocket";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


  constructor(private loginService : LoginService, private router : Router ,private webSocketAPI:WebSocketAPI ) { }

  ngOnInit() {
  }

   user:User =new User();
  body:any;
  token:any;
  form = new FormGroup({
    email : new FormControl('' , Validators.required),
    password : new FormControl('' , Validators.required),
  });


  login()
  {
      this.user.email = this.form.get('email').value;
      this.user.password = this.form.get('password').value;

    this.loginService.login(this.user).subscribe(res =>{
        this.body=res.body;
        this.token=this.body.token;
        localStorage.setItem('token',this.token);
        localStorage.setItem('email', this.user.email);
        this.router.navigate(['/Dashboard']);
        console.log("Response",res);
        //alert("Login Sucees");
      this.webSocketAPI._send("Go To Home Now");


      },
      error => {
          console.log("error",error);
        alert("Please Enter Correct Username And Password ");

      });
  }


}
