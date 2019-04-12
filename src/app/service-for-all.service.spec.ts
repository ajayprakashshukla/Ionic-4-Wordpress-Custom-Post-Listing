import { TestBed } from '@angular/core/testing';

import { ServiceForAllService } from './service-for-all.service';

describe('ServiceForAllService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceForAllService = TestBed.get(ServiceForAllService);
    expect(service).toBeTruthy();
  });
});
