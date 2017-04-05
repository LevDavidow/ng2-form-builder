import { TestBed, inject } from '@angular/core/testing';

import { FieldHooksService } from './field-hooks.service';

describe('FieldHooksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldHooksService]
    });
  });

  it('should ...', inject([FieldHooksService], (service: FieldHooksService) => {
    expect(service).toBeTruthy();
  }));
});
