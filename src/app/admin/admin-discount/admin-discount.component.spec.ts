import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDiscountComponent } from './admin-discount.component';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
