import { TestBed } from '@angular/core/testing';

import { FournitureService } from './fourniture.service';

describe('FournitureService', () => {
  let service: FournitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
