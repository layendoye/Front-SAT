import { TestBed } from '@angular/core/testing';

import { IsSuperAdminService } from './is-super-admin.service';

describe('IsSuperAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsSuperAdminService = TestBed.get(IsSuperAdminService);
    expect(service).toBeTruthy();
  });
});
