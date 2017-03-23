/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpPersistanceService } from './http-persistance.service';

describe('HttpPersistanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpPersistanceService]
    });
  });

  it('should ...', inject([HttpPersistanceService], (service: HttpPersistanceService) => {
    expect(service).toBeTruthy();
  }));
});
