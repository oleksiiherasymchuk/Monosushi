import { Router, NavigationEnd } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit, OnDestroy {

  public discountArray!: Array<IDiscountResponse>;
  private eventSubscription!: Subscription;

  constructor(
    private discountService: DiscountService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getDiscount()
      }
    })
  }

  ngOnInit(): void {}

  getDiscount(): void {
    this.discountService.getAllFirebase().subscribe((data) => {
      this.discountArray = data as IDiscountResponse[]
    })
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe()
  }
}