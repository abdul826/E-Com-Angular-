import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService, private router:Router) { }

  showLogin = false;
  authError:string = '';

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data:SignUp):void{
    // console.log(data);
    this.seller.userSignUp(data);
  }

  login(data:Login):void{
    this.authError = '';
    this.seller.userLogin(data);

    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or Password is not Valid";
      }
    })

  }

  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
}
