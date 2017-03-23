/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LangAutocompleteStatusService } from './lang-autocomplete-status.service';

describe('LangAutocompleteStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangAutocompleteStatusService]
    });
  });

  it('should ...', inject([LangAutocompleteStatusService], (service: LangAutocompleteStatusService) => {
    expect(service).toBeTruthy();
  }));
});
