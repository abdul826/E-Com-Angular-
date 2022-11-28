import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string = 'default';
  sellerName:string = '';
  searchResult : undefined|product[];

  constructor(private router:Router, private product:ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem("seller") && val.url.includes('seller')){
          // console.log(val.url)
          this.menuType = 'seller';

          if(localStorage.getItem("seller")){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else{
          this.menuType = 'default';
        }
      }
    })
  }

  // Logout
  logout(){
    localStorage.removeItem("seller");
    this.router.navigate(['/'])
  }

  // Search Logic
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;

      this.product.searchProduct(element.value).subscribe((result)=>{
        if(result.length>5){
          result.length=5; // if u want to show only 5 result in search the use it
        }
        this.searchResult = result
      })
    }
  }

  hidden(){
    this.searchResult=undefined;
  }

}


