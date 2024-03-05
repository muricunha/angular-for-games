import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlterComponent } from './modal-alter.component';

describe('ModalAlterComponent', () => {
  let component: ModalAlterComponent;
  let fixture: ComponentFixture<ModalAlterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAlterComponent]
    });
    fixture = TestBed.createComponent(ModalAlterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
