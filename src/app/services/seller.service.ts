import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false); // ye variable error message shoe krwane k liye hai 

  constructor(private http:HttpClient, private router:Router) { }

  // Seller-SignUp
  userSignUp(data:SignUp){
    return this.http.post('http://localhost:3000/seller',data,{observe:"response"})
    .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem("seller",JSON.stringify(result.body))
      this.router.navigate(['seller-home']);
      // console.log(result)
    });

  }

  // Seller-Login
  userLogin(data:Login){
    // console.log(data);

    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:"response"}
    ).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem("seller",JSON.stringify(result.body))
      this.router.navigate(['seller-home']);
      }else{
        console.log("Error: Email and Password Not Match");
        this.isLoginError.emit(true);
      }
    })

  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
