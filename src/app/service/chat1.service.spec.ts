import { TestBed } from '@angular/core/testing';

import { Chat1Service } from './chat1.service';

describe('Chat1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Chat1Service = TestBed.get(Chat1Service);
    expect(service).toBeTruthy();
  });
});
