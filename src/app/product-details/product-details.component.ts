import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined|product;

  constructor(private activateRoute:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId'); // is se hm product-Id ko get kr rahe hai jo is page pr url k through aa rahi hai

    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData = result;
    })
  }

}
