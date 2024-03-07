import { TestBed } from '@angular/core/testing';

import { ForgamesService } from './forgames.service';

describe('ForgamesService', () => {
  let service: ForgamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
