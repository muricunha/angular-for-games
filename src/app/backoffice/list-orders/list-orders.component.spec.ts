import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersComponent } from './list-orders.component';

describe('ListProductComponent', () => {
  let component: ListOrdersComponent;
  let fixture: ComponentFixture<ListOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrdersComponent]
    });
    fixture = TestBed.createComponent(ListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
