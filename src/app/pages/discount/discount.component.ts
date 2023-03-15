import { ActivatedRoute, Route, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  public discountArray!: Array<IDiscountResponse>;
  // private eventSubscription!: Subscription;

  constructor(
    private discountService: DiscountService,
    // private activatedRoute: ActivatedRoute,
    // private router: Router
  ) {
    // this.eventSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.getDiscount()
    //   }
    // })
  }

  ngOnInit(): void {
    this.getDiscount()
  }

  getDiscount(): void {
    this.discountService.getAll().subscribe((data) => {
      this.discountArray = data
    })
  }

}

/* 



getProducts(): void {
  // this.productService.getAll().subscribe((data) => {
  //   this.productsArray = data
  const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
  this.productService.getAllByCategory(categoryName).subscribe((data) => {
    this.productsArray = data
    // console.log(categoryName);
    
  })
}

ngOnDestroy(): void {
  this.eventSubscription.unsubscribe()
} */
