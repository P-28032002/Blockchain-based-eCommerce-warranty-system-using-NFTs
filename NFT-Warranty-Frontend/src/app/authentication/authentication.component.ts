import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerHandlerService } from './../../services/http/server-handler.service';
import { Router } from '@angular/router';
import { UserService } from './../shared/user.service'
import { Auth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword }
         from '@angular/fire/auth'
import { addDoc, Firestore, collection, getDocs, query, where } from "@angular/fire/firestore";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [UserService]
})
export class AuthenticationComponent implements OnInit {

  constructor(public firestore: Firestore, public auth: Auth, private handler: ServerHandlerService,  private _router: Router, private userService: UserService) { }
  @ViewChild('myEmail') inputemail: any;
  @ViewChild('myphno') inputphno : any;
  @ViewChild('mypass1') inputpass1 : any;
  @ViewChild('mypass2') inputpass2 : any;
  @ViewChild('mylogin') inputlogin : any;
  @ViewChild('myloginform') inputloginform : any;
  @ViewChild('mysignuplinka') inputsignuplink : any;
  @ViewChild('login_email') loginEmail: any;
  @ViewChild('login_password') loginPassword: any;
  ngOnInit(): void {
  }

  /*const loginText = document.querySelector(".title-text .login")!;
  const loginForm = document.querySelector("form.login")!;
  const loginBtn = document.querySelector("label.login")!;
  const signupBtn = document.querySelector("label.signup")!;
  const signupLink = document.querySelector("form .signup-link a")!;
  */
  signupBtn(){
    this.inputlogin.nativeElement.style.marginLeft = "-50%";
    this.inputloginform.nativeElement.style.marginLeft = "-50%";
  }
  loginBtn(){
    this.inputlogin.nativeElement.style.marginLeft = "0%";
    this.inputloginform.nativeElement.style.marginLeft = "0%";
  }


  /*onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }*/
    validateEmail()
    {
        //alert("Inside valid user email id")
        var usermail = this.inputemail.nativeElement.value;
        var usermail2 = this.inputemail.nativeElement;
        //alert("The user email id is : "+usermail);
        var re = /^[a-z][a-z0-9]{2,20}([\.|\-|\_][a-z0-9]{2,20}){0,4}?@[a-z][a-z0-9]{1,20}(\.[a-z]{2,10}){1,4}$/;
        if(re.test(usermail))
        {
          //alert("Done");
          usermail2.style.border = " lightgrey solid 1px";
          return true;
        }
        else{
          usermail2.style.border = "red solid 1px";
          // usermail2.style.focus();
          console.log("email");
          return false;
        }
    }
    validatePhoneNumber()
    {
        var phone = this.inputphno.nativeElement.value;
        var phone2 = this.inputphno.nativeElement;
        var re1 = /^(\+91)?[6|7|8|9][0-9]{9}$/;
        if(re1.test(phone))
        {
          //alert("Done");
          phone2.style.border = "lightgrey solid 1px";
          return true;
        }
        else{
          //alert("Invalid PhoneNumber")
          phone2.style.border = "red solid 1px";
          console.log("phno");
          return false;
        }
    }
    validatePassword()
    {
        var pass = this.inputpass1.nativeElement.value;
        var pass1 = this.inputpass1.nativeElement;
        var strongRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[\+\-\*\/\$\#]).{6,16}$/;
        var mediumRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{6,16}$/;
        if(strongRegex.test(pass))
        {
          //alert("Strong Password");
          pass1.style.border = "lightgrey solid 1px";
          return true;
        }
        else if(mediumRegex.test(pass))
        {
          //alert("Medium Password");
          pass1.style.border = "red solid 1px";
          return false;
        }
        else{
          //alert("Weak Password");
          pass1.style.border = "red solid 1px";
          console.log("pass");
          return false;
        }

    }
    validatePassword2()
    {
        var password1 = this.inputpass1.nativeElement.value;
        var password2 = this.inputpass2.nativeElement.value;
        var pass2 = this.inputpass2.nativeElement;
        if(password1 === password2)
        {
          //alert("Password Matched");
          pass2.style.border = "lightgrey solid 1px";
          return true;
        }
        else{
          //alert("Please enter the same password in both the password fields");
          pass2.style.border = "red solid 1px";
          console.log("pass2");
          return false;
        }

    }

    signedinOrNot(event) {
      event.preventDefault();
      if(this.validateEmail() && this.validatePassword2() && this.validatePhoneNumber())
      {
        var email = this.inputemail.nativeElement.value;
        var password = this.inputpass1.nativeElement.value;
        var phone = this.inputphno.nativeElement.value;
        console.log(email);
        console.log(password);

        createUserWithEmailAndPassword(this.auth, email, password)
        .then((response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User signed up!',
            confirmButtonColor: "#FE5E5E",
            showCancelButton: false
          });
          localStorage.setItem('user_email', email);
          var value = {
            address: "",
            block_coins: 0,
            dob: "",
            email: email,
            first_name: "",
            gender: "",
            have_crypt_wallet: false,
            is_active: false,
            is_block: false,
            is_suspended: false,
            last_name: "",
            middlename: "",
            mobile_no: "",
            other_info: "",
            profile_photo: "",
            public_id_wallet: "",
            using_cryp_wallet: true
          };
          const dbInstance = collection(this.firestore, "users");
          addDoc(dbInstance, value)
          .then((response)=>{
            this._router.navigateByUrl('/dashboard');
          })
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error Occurred',
            text: 'Please try again!',
            confirmButtonColor: "#FE5E5E",
            showCancelButton: false
          });
        })
      }
      else
      {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please provide valid data!',
            confirmButtonColor: "#FE5E5E",
            showCancelButton: false
          });
      }
    }

    login(event){
      event.preventDefault();
      var email = this.loginEmail.nativeElement.value;
      var password = this.loginPassword.nativeElement.value;
      console.log(email);
      console.log(password);
      signInWithEmailAndPassword(this.auth, email, password)
      .then((response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login Successful!',
          confirmButtonColor: "#FE5E5E",
          showCancelButton: false
        });
        localStorage.setItem('user_email', email);
        this._router.navigateByUrl('/dashboard');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Occurred',
          text: 'Please try again!',
          confirmButtonColor: "#FE5E5E",
          showCancelButton: false
        });
      })
    }

}
