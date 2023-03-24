import { AccountService } from 'src/app/shared/services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth/auth.component';
import { CallModalComponent } from '../call-modal/call-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isBasketOpen: boolean = false
  public isBasketEmpty: boolean = false

  public total: number = 0
  public productQuantityInBasket: number = 0
  public basket: Array<IProductResponse> = []
  public currentProduct!: IProductResponse;

  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.loadBasket()
    this.updateBasket()
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response["productInfo"];
    })
  }
  
  showBasket(): void {
    this.isBasketOpen = !this.isBasketOpen
  }

  loadProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.productService.getOneProduct(id).subscribe(data => {
      this.currentProduct = data as IProductResponse;
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.getTotalPrice()
    this.productQuantityInBasket = this.basket.length
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket()
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.getTotalPrice()
  }

  deleteBasketProduct(index: number): void {
    this.basket.splice(index, 1)
    this.productQuantityInBasket = this.basket.length
    if(this.basket.length === 0){
      this.total = 0
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  goToCatalogue(): void {
    this.isBasketOpen = false
  }

  openLoginDialog(): void {
    this.dialog.open(AuthComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(() => {
      console.log('authorized');
      
    })
  }

  openPhoneModal(): void{
    this.dialog.open(CallModalComponent, {
      backdropClass: 'call-back',
      panelClass: 'call-dialog',
      autoFocus: false
    }).afterClosed().subscribe(() => {
      console.log('call modal');
    })
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true
      this.loginUrl = 'admin'
      this.loginPage = 'Admin'
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true
      this.loginUrl = 'profile'
      this.loginPage = 'Profile'
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin()
    })
  }
}

