import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUsersComponent } from './change-users.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
describe('ListUsersComponent', () => {
  let component: ChangeUsersComponent;
  let fixture: ComponentFixture<ChangeUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeUsersComponent],
      imports: [
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
    ]
    });
    fixture = TestBed.createComponent(ChangeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
