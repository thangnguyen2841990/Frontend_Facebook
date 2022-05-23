import { TestBed } from '@angular/core/testing';

import { NotificationAddFriendService } from './notification-add-friend.service';

describe('NotificationAddFriendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationAddFriendService = TestBed.get(NotificationAddFriendService);
    expect(service).toBeTruthy();
  });
});
