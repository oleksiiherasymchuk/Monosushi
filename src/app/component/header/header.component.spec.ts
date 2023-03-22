import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        // ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        // { provide: Auth, useValue: {} },
        // { provide: Firestore, useValue: {} },
        // { provide: ToastrService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
    const FAKE_BASKET = [
      {
        id: 1,
        category: {
          id: 2,
          name: 'qqq',
          path: 'string',
          imagePath: 'qqqq',
        },
        name: 'string',
        path: 'string',
        ingredients: 'string',
        weight: 'string',
        price: 10,
        imagePath:'string',
        proteins: 10,
        carbohydrates: 20,
        fat: 30,
        calories: 10,
        count: 2
      }
    ]
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });
});
