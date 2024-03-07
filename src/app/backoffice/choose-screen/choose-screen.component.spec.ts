import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseScreenComponent } from './choose-screen.component';

describe('ChooseScreenComponent', () => {
  let component: ChooseScreenComponent;
  let fixture: ComponentFixture<ChooseScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseScreenComponent]
    });
    fixture = TestBed.createComponent(ChooseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
