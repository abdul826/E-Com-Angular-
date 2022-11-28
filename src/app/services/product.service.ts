import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Add Product
  addProduct(data:product){
    return this.http.post('http://localhost:3000/products',data);
  }

  // Fetch Product
  productList(){
    return this.http.get<product[]>('http://localhost:3000/products'); // yaha pr hm product likhe hai uska type btane k liye wrna jb home page me call karenge to error aayega
  }

  // Delete Product
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  // Update Product
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`); 
  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product); 
  }

  popularProduct(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`); 
  }
}
