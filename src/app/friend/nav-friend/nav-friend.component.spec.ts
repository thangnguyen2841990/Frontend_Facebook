import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFriendComponent } from './nav-friend.component';

describe('NavFriendComponent', () => {
  let component: NavFriendComponent;
  let fixture: ComponentFixture<NavFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
