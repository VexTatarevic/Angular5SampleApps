import { TestBed, inject } from '@angular/core/testing';

import { GuestbookDataService } from './guestbook-data.service';

describe('GuestbookDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestbookDataService]
    });
  });

  it('should be created', inject([GuestbookDataService], (service: GuestbookDataService) => {
    expect(service).toBeTruthy();
  }));
});
