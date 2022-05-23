import { TestBed } from '@angular/core/testing';

import { ChangeAvatarService } from './change-avatar.service';

describe('ChangeAvatarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeAvatarService = TestBed.get(ChangeAvatarService);
    expect(service).toBeTruthy();
  });
});
