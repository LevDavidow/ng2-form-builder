/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PersistanceValidationService } from './persistance-validation.service';

describe('PersistanceValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistanceValidationService]
    });
  });

  it('should ...', inject([PersistanceValidationService], (service: PersistanceValidationService) => {
    expect(service).toBeTruthy();
  }));
});
