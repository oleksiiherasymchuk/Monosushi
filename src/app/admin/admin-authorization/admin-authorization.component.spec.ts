import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';

import { AdminAuthorizationComponent } from './admin-authorization.component';

describe('AdminAuthorizationComponent', () => {
  let component: AdminAuthorizationComponent;
  let fixture: ComponentFixture<AdminAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorizationComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        // MatDialogModule
      ],
      providers: [
        // { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
