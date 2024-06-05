import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAddressComponent } from './choose-address.component';

describe('ChooseAddressComponent', () => {
  let component: ChooseAddressComponent;
  let fixture: ComponentFixture<ChooseAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseAddressComponent]
    });
    fixture = TestBed.createComponent(ChooseAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
