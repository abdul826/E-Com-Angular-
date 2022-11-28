import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProduct: undefined|product[];  //we can show multiple products in home page that's whay we use [] sign otherwise only write product for single one.s
  trendProducts: undefined|product[];

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.popularProduct().subscribe((data)=>{
      this.popularProduct = data;
    });

    this.product.trendProduct().subscribe((data)=>{
      this.trendProducts = data;
    })
  }

}
