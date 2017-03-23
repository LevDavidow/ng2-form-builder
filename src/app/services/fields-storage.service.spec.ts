/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FieldsNormalizeService } from './fields-storage.service';

describe('FieldsNormalizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldsNormalizeService]
    });
  });

  it('should ...', inject([FieldsNormalizeService], (service: FieldsNormalizeService) => {
    expect(service).toBeTruthy();
  }));
});
