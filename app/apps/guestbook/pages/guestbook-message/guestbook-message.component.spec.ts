import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestbookMessageComponent } from './guestbook-message.component';

describe('GuestbookMessageComponent', () => {
  let component: GuestbookMessageComponent;
  let fixture: ComponentFixture<GuestbookMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestbookMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestbookMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
