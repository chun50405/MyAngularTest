import { TestBed } from '@angular/core/testing';

import { UserEventCheckService } from './user-event-check.service';

describe('UserEventCheckService', () => {
  let service: UserEventCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEventCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
