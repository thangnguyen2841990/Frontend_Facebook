import { TestBed } from '@angular/core/testing';

import { NotificationCheckStatusService } from './notification-check-status.service';

describe('NotificationCheckStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationCheckStatusService = TestBed.get(NotificationCheckStatusService);
    expect(service).toBeTruthy();
  });
});
