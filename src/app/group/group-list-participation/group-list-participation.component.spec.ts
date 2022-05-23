import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListParticipationComponent } from './group-list-participation.component';

describe('GroupListParticipationComponent', () => {
  let component: GroupListParticipationComponent;
  let fixture: ComponentFixture<GroupListParticipationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListParticipationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
