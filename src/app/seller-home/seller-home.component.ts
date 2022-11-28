import { Component, OnInit } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList : undefined | product[] ;
  deleteProductmsg : string | undefined ;

  // Fontawsome Icons

  delIcon = faTrash;
  editIcon = faEdit;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    
  // Fetch Product
    this.list();
  }

  // delete Product
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        alert("Are you confirm to delete product?")
        this.deleteProductmsg = "Product Deleted Successfully";
        this.list();
      }else{
        this.deleteProductmsg = "Error : Product Not Deleted";
      }

      setTimeout(()=>{
        this.deleteProductmsg = undefined;
      }, 3000);
    })
  }

  list(){
    this.product.productList().subscribe((result)=>{
      this.productList = result;
    })
  }

}
