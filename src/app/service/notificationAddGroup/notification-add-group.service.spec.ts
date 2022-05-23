import { TestBed } from '@angular/core/testing';

import { NotificationAddGroupService } from './notification-add-group.service';

describe('NotificationAddGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationAddGroupService = TestBed.get(NotificationAddGroupService);
    expect(service).toBeTruthy();
  });
});
