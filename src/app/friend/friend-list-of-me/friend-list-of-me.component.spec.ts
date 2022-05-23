import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListOfMeComponent } from './friend-list-of-me.component';

describe('FriendListOfMeComponent', () => {
  let component: FriendListOfMeComponent;
  let fixture: ComponentFixture<FriendListOfMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendListOfMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListOfMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
