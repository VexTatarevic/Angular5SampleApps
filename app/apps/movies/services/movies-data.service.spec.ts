import { TestBed, inject } from '@angular/core/testing';

import { MoviesDataService } from './movies-data.service';

describe('MoviesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesDataService]
    });
  });

  it('should be created', inject([MoviesDataService], (service: MoviesDataService) => {
    expect(service).toBeTruthy();
  }));
});
