import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  public discountArray!: Array<IDiscountResponse>;

  ngOnInit(): void {
    this.getDiscount()
  }

  constructor( private discountService: DiscountService ){}

  getDiscount(): void {
    this.discountService.getAll().subscribe((data) => {
      this.discountArray = data
    })
  }
}
