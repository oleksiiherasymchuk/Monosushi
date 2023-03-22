import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
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

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
