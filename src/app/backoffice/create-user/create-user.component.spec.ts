import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [HttpClientModule],
      providers: [HttpClientModule, HttpClientTestingModule, MatDialogModule]
    });
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
