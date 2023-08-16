import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product!: Product
  id:  string = '0'
  
constructor(
  private productService: ProductService,
  private router: Router,
  private route: ActivatedRoute,

  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getProduct(this.id);
    
    
  }

  getProduct(id: string): void {
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void{
    this.productService.delete(this.id).subscribe(product => {
      this.productService.showMessage("Porduto excluido com sucesso! :(")
      this.router.navigate(['/products']);
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
