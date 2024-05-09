import { TestBed } from '@angular/core/testing';

import { ForgamesService } from './forgames.service';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing'

fdescribe('ForgamesService', () => {
  let service: ForgamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[MatDialogModule,
            HttpClientModule],

    providers:[HttpClientModule,
              HttpClientTestingModule,
              MatDialogModule
    ]
    });

    service = TestBed.inject(ForgamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
