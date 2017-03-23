/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElfinderHeightMemoService } from './elfinder-height-memo.service';

describe('ElfinderHeightMemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElfinderHeightMemoService]
    });
  });

  it('should ...', inject([ElfinderHeightMemoService], (service: ElfinderHeightMemoService) => {
    expect(service).toBeTruthy();
  }));
});
