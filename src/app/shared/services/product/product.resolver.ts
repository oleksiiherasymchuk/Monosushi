import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProductResponse> {

  constructor ( private productService: ProductService ) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.productService.getOneProduct(route.paramMap.get('id') as string);
  }
}

