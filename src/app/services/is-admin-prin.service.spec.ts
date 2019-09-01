import { TestBed } from '@angular/core/testing';

import { IsAdminPrinService } from './is-admin-prin.service';

describe('IsAdminPrinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsAdminPrinService = TestBed.get(IsAdminPrinService);
    expect(service).toBeTruthy();
  });
});
