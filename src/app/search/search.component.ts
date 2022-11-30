import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult: undefined|product[];

  constructor(private activateRoute:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query');  // yaha pr query is liye likhe hai kyo ko route file me hm ne query as a id liya hai 
    
    // call query api from product service
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult = result;
    })
  }

}
