import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl ="http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private hhtp: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(product: Product): Observable<Product>{
    return this.hhtp.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler (e))
    );
  }

  read(): Observable<Product[]>{
    return this.hhtp.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler (e))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.hhtp.get<Product>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler (e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.hhtp.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler (e))
    );
  }

  delete(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.hhtp.delete<Product>(url).pipe(
      map(obj => obj),
      catchError((e) => this.errorHandler (e))
    );
  }

  errorHandler(e:any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY 
  }
}
