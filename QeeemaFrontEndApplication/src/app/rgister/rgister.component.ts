import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../user";
import {Router} from "@angular/router";
import {debounce} from "rxjs/internal/operators";
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-rgister',
  templateUrl: './rgister.component.html',
  styleUrls: ['./rgister.component.css']
})
export class RgisterComponent implements OnInit {
  totalNumberOfLoggedUsers : any;
  totalNumberOfUser : any;
  disabled:boolean=false;
  usernameValue:string;
  enableSaveBtn:boolean=true;

  constructor( private router : Router ,private registerService :RegisterService ) { }

  ngOnInit() {
    this.totalNumberOfLoggedUsers;
    this.totalNumberOfUser;
  }

  user:User =new User();
  form = new FormGroup({
    username : new FormControl('' , Validators.required),
    email : new FormControl('' , Validators.required),
    password : new FormControl('' , Validators.required),
    confirmPassword : new FormControl('' , Validators.required),
  });

  register(){
    if(this.form.get('password').value == this.form.get('confirmPassword').value) {
      if(this.form.get('username').value != null)
      this.user.username = this.form.get('username').value;
      this.user.email = this.form.get('email').value;
      this.user.password = this.form.get('password').value;

      this.registerService.register(this.user).subscribe(res =>{
          //localStorage.setItem('email',this.user.email);
        debugger
          this.router.navigate(['/']);
          console.log("Response",res);
          alert('Registration Complete');
        }),(
        error => {
          debugger
          console.log("error",error);
          alert('Registration Failed');

        });

    }
    else {
      alert("Password and Confirm password not matched");

    }
  }

enableSaveButton(){

  if(this.form.get('username').value !=='' && this.form.get('email').value !=='' &&  this.form.get('password').value !=='' &&  this.form.get('confirmPassword').value !=='' ){
    this.enableSaveBtn=false;
  }
}


/* login()
 {

   if(this.form.get('password').value == this.form.get('confirmPassword').value)
   {
     this.user.username = this.form.get('username').value;
     this.user.email = this.form.get('email').value;
     this.user.password = this.form.get('password').value;

     this.loginService.login(this.user).subscribe(

       response => {
         let result = response.json();

         if(result > 0)
         {
           this.router.navigate(['/login']);
         }
         else
         {
           alert("error occur while registring User. please try after sometime.")
         }
       },
       error => {
         alert("error occur while registring User. please try after sometime.")
       }
     );

   }
   else
   {
     alert("Password and confirm password not match.");
   }
 }
*/
}
