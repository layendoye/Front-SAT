import { TestBed } from '@angular/core/testing';

import { IsCaissierService } from './is-caissier.service';

describe('IsCaissierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsCaissierService = TestBed.get(IsCaissierService);
    expect(service).toBeTruthy();
  });
});
