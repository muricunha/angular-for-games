import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUsersComponent } from './change-users.component';

describe('ListUsersComponent', () => {
  let component: ChangeUsersComponent;
  let fixture: ComponentFixture<ChangeUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeUsersComponent]
    });
    fixture = TestBed.createComponent(ChangeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
