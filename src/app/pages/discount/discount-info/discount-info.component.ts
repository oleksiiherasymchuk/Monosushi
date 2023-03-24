import { ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { Component, OnInit } from '@angular/core';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { Observable } from 'rxjs';

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
    
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentDiscount = response["discountInfo"]
    })
    this.getOneDiscount()

  }

  getOneDiscount():void{
    const DISCOUNT_ID = this.activatedRoute.snapshot.paramMap.get('id') as string
    this.discountService.getOneFirebase(DISCOUNT_ID).subscribe((data) => {
      this.currentDiscount = data as IDiscountResponse
    })
    
  }
}

