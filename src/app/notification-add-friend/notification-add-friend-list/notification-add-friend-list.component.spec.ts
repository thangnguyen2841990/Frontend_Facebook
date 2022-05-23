import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAddFriendListComponent } from './notification-add-friend-list.component';

describe('NotificationAddFriendListComponent', () => {
  let component: NotificationAddFriendListComponent;
  let fixture: ComponentFixture<NotificationAddFriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationAddFriendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAddFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
