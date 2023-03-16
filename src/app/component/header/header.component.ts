import { AccountService } from 'src/app/shared/services/account/account.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ROLE } from 'src/app/shared/constants/role.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {


  public authForm!: FormGroup;

  public isSignInModalShown: boolean = false
  public isEntranceModalShown: boolean = false
  public isForgetModalShown: boolean = false

  public isBasketOpen: boolean = false
  public isBasketEmpty: boolean = false

  public total: number = 0
  public basket: Array<IProductResponse> = []
  public currentProduct!: IProductResponse;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBasket()
    this.updateBasket()
    this.initAuthForm()
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response["productInfo"];
      // console.log(this.currentProduct);
      
    })  
  }
  ngDoCheck(): void {
    // console.log(this.basket);
    
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null , [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(): void{
    this.accountService.login(this.authForm.value).subscribe((data) => {
      if(data && data.length > 0){
        const user = data[0]
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.accountService.isUserLogin$.next(true)
        if(user && user.role === ROLE.USER){
          this.router.navigate(['/profile'])
        } else if(user && user.role === ROLE.ADMIN){
          this.router.navigate(['/admin'])
        }
      }
    }, (e) => {
      console.log(e);
    })

    this.isEntranceModalShown = false
  }

  showEntranceModal():void{
    this.isEntranceModalShown = true
    this.isForgetModalShown = false
    this.isSignInModalShown = false
  }

  closeEntranceModal():void{
    this.isEntranceModalShown = false
  }

  showForgetModal(): void{
    this.isForgetModalShown = true
    this.isEntranceModalShown = false
    this.isSignInModalShown = false

  }

  closeForgetModal():void{
    this.isForgetModalShown = false
  }

  showSignInModal(): void{
    this.isSignInModalShown = true
    this.isForgetModalShown = false
    this.isEntranceModalShown = false
    // document.body.style.backgroundColor = 'gray'
  }

  closeSignInModal(): void{
    this.isSignInModalShown = false
    
  }

  showBasket(): void {
    // console.log(this.basket);
    // if(this.basket.length === 0){
    //   this.isBasketEmpty = true
    // } else { 
    //   this.isBasketEmpty = false
    // }
    
    this.isBasketOpen = !this.isBasketOpen

    if (this.isBasketOpen) {
      // console.log('make main gray');

    }
  }

  loadProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(id).subscribe(data => {
      this.currentProduct = data;
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.getTotalPrice()
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

  goToCatalogue(): void{
    this.isBasketOpen = false
  }

  
}




// public total = 0;
// private basket: Array<IProductResponse> = [];
// public isLogin = false;
// public loginUrl = '';
// public loginPage = '';

// constructor(
//   private orderService: OrderService,
//   private accountService: AccountService
// ) { }

// ngOnInit(): void {
//   this.loadBasket();
//   this.updateBasket();
//   this.checkUserLogin();
//   this.checkUpdatesUserLogin();
// }

// loadBasket(): void {
//   if(localStorage.length > 0 && localStorage.getItem('basket')){
//     this.basket = JSON.parse(localStorage.getItem('basket') as string);
//   }
//   this.getTotalPrice();
// }

// getTotalPrice(): void {
//   this.total = this.basket
//     .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
// }

// updateBasket(): void {
//   this.orderService.changeBasket.subscribe(() => {
//     this.loadBasket();
//   })
// }

// checkUserLogin(): void {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
//   if(currentUser && currentUser.role === ROLE.ADMIN){
//     this.isLogin = true;
//     this.loginUrl = 'admin';
//     this.loginPage = 'Admin';
//   } else if(currentUser && currentUser.role === ROLE.USER) {
//     this.isLogin = true;
//     this.loginUrl = 'cabinet';
//     this.loginPage = 'Cabinet';
//   } else {
//     this.isLogin = false;
//     this.loginUrl = '';
//     this.loginPage = '';
//   }
// }

// checkUpdatesUserLogin(): void {
//   this.accountService.isUserLogin$.subscribe(() => {
//     this.checkUserLogin();
//   })
// }