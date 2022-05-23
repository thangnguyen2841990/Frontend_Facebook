import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListMemberComponent } from './group-list-member.component';

describe('GroupListMemberComponent', () => {
  let component: GroupListMemberComponent;
  let fixture: ComponentFixture<GroupListMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
