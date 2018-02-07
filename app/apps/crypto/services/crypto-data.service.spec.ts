import { TestBed, inject } from '@angular/core/testing';

import { CryptoDataService } from './crypto-data.service';

describe('CryptoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoDataService]
    });
  });

  it('should be created', inject([CryptoDataService], (service: CryptoDataService) => {
    expect(service).toBeTruthy();
  }));
});
