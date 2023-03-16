import { AccountService } from 'src/app/shared/services/account/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  constructor(
    private router: Router,
    private accountService: AccountService
  ){}

  ngOnInit(): void {
    
  }

  logout():void{
    this.router.navigate(['/'])
    localStorage.removeItem('currentUser')
    this.accountService.isUserLogin$.next(true)
  }
}
