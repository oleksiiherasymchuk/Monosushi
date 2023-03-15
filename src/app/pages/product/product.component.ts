import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public productsArray!: Array<IProductResponse>;
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getProducts()
      }
    })
  }
  ngOnInit(): void {
    // this.getProducts()        
  }

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
  }

}