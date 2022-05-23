import { TestBed } from '@angular/core/testing';

import { ReplyCommentService } from './reply-comment.service';

describe('ReplyCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReplyCommentService = TestBed.get(ReplyCommentService);
    expect(service).toBeTruthy();
  });
});
