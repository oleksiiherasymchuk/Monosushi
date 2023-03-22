import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DiscountInfoComponent } from './discount-info.component';

xdescribe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountInfoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        // ReactiveFormsModule,
        // MatDialogModule
      ],
      providers: [
        // { provide: MatDialogRef, useValue: {} },
        // { provide: Auth, useValue: {} },
        // { provide: Firestore, useValue: {} },
        // { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
