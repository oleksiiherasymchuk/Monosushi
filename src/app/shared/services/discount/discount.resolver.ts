import { DocumentData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountResolver implements Resolve<IDiscountResponse> {

  constructor( private discountService: DiscountService ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.discountService.getOneFirebase(route.paramMap.get('id') as string);
  }
}
