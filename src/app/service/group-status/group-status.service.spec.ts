import { TestBed } from '@angular/core/testing';

import { GroupStatusService } from './group-status.service';

describe('GroupStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupStatusService = TestBed.get(GroupStatusService);
    expect(service).toBeTruthy();
  });
});
