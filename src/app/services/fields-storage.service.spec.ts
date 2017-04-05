/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FieldsStorageService } from './fields-storage.service';

describe('FieldsStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldsStorageService]
    });
  });

  it('should ...', inject([FieldsStorageService], (service: FieldsStorageService) => {
    expect(service).toBeTruthy();
  }));
});
