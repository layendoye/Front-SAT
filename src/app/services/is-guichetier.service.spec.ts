import { TestBed } from '@angular/core/testing';

import { IsGuichetierService } from './is-guichetier.service';

describe('IsGuichetierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsGuichetierService = TestBed.get(IsGuichetierService);
    expect(service).toBeTruthy();
  });
});
