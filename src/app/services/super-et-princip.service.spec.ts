import { TestBed } from '@angular/core/testing';

import { SuperEtPrincipService } from './super-et-princip.service';

describe('SuperEtPrincipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperEtPrincipService = TestBed.get(SuperEtPrincipService);
    expect(service).toBeTruthy();
  });
});
