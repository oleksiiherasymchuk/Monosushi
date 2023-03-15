import { ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public currentDiscount!: IDiscountResponse;

  constructor( 
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute,
   //   private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentDiscount = response["discountInfo"]
    })
  }
}

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe(response => { 
  //     this.currentProduct = response["productInfo"];
      
  //   })
  // }

  // loadProduct(): void {
  //   const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  //   this.productService.getOne(id).subscribe(data => {
  //     this.currentProduct = data;
  //   })
  // }

  // productCount(product: IProductResponse, value: boolean): void {
  //   if(value){
  //     ++product.count;
  //   } else if(!value && product.count > 1){
  //     --product.count;
  //   }
  // }

  // addToBasket(product: IProductResponse): void {
  //   let basket: Array<IProductResponse> = [];
  //   if(localStorage.length > 0 && localStorage.getItem('basket')){
  //     basket = JSON.parse(localStorage.getItem('basket') as string);
  //     if(basket.some(prod => prod.id === product.id)){
  //       const index = basket.findIndex(prod => prod.id === product.id);
  //       basket[index].count += product.count;
  //     } else {
  //       basket.push(product);
  //     }
  //   } else {
  //     basket.push(product);
  //   }
  //   localStorage.setItem('basket', JSON.stringify(basket));
  //   product.count = 1;
  //   this.orderService.changeBasket.next(true);
  // }