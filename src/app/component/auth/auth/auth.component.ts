import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public loginSubscription!: Subscription;

  // public isLogin = false
  public isSignInModalShown: boolean = false
  public isEntranceModalShown: boolean = true
  public isForgetModalShown: boolean = false


  constructor(
    private auth: Auth,
    private afs: Firestore,
    private accountService: AccountService,
    private toastr: ToastrService,
    // private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<AuthComponent>
  ) { }

  ngOnInit(): void {
    this.initAuthForm(),
      this.initRegisterForm()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.loginSubscription.unsubscribe()
  }


  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    })
  }


  loginUser(): void {
    this.dialogRef.close({
      formData: this.authForm.value
    })
    const { email, password } = this.authForm.value
    this.login(email, password).then(() => {
      this.toastr.success('User successfully login')
    }).catch((e) => {
      this.toastr.error(e.message);
    })

    this.isEntranceModalShown = false
  }

  async login(email: string, password: string): Promise<void> {
    const credentials = await signInWithEmailAndPassword(this.auth, email, password)
    docData(doc(this.afs, 'users', credentials.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credentials.user.uid }
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      if (user && user['role'] === ROLE.ADMIN) {
        // debugger
        this.router.navigate(['/admin'])
      } else if (user && user['role'] === ROLE.USER) {
        // debugger
        this.router.navigate(['/profile'])
      }
      this.accountService.isUserLogin$.next(true)
    }, (e) => {
      console.log('error login', e);
    })
  }


  registerUser(): void {
    const { email, password } = this.registerForm.value
    this.signUp(email, password).then(() => {
      this.toastr.success('User successfully created');
      // this.isLogin = !this.isLogin;
      this.registerForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async signUp(email: string, password: string): Promise<any> {
    const credentials = await createUserWithEmailAndPassword(this.auth, email, password)
    const user = {
      email: credentials.user.email,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      orders: [],
      role: 'USER'
    }

    setDoc(doc(this.afs, 'users', credentials.user.uid), user)
  }


  showEntranceModal(): void {
    this.isEntranceModalShown = true
    this.isForgetModalShown = false
    this.isSignInModalShown = false
  }

  showForgetModal(): void {
    this.isForgetModalShown = true
    this.isEntranceModalShown = false
    this.isSignInModalShown = false

  }


  showSignInModal(): void {
    this.isSignInModalShown = true
    this.isForgetModalShown = false
    this.isEntranceModalShown = false
  }
}





