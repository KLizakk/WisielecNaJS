import { TestBed } from '@angular/core/testing';

import { SerwerService } from './serwer.service';

describe('SerwerService', () => {
  let service: SerwerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerwerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
