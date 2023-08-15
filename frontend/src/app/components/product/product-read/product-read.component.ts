import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent {


  products: Product[] = [];
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private productService: ProductService){ }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }
  teste(data: any) {
    console.log(data)
  }
}
