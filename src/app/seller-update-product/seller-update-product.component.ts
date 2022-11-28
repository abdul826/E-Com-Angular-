import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined|product // yaha pr product likhanhai na ki [] kyo ki 1 ki product ko update kr raha hai

  constructor(private route: ActivatedRoute, public product:ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    // console.log(productId);
    productId && this.product.getProduct(productId).subscribe((Result)=>{
      this.productData = Result
    })
  }

  updateProducts(data:product){
    console.log("product Updated Successfully")
    // product k andar id humne khud likha hai to yaha pr data k andar id jayegi nahi jis ki wajah se error aayega to hum khud forcefully id push karenge data me

    if(this.productData){
      data.id = this.productData.id;
    }
    
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.router.navigate(['/seller-home'])
      }
    })
  }

}
