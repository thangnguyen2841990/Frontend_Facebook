import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOtherComponent } from './group-other.component';

describe('GroupOtherComponent', () => {
  let component: GroupOtherComponent;
  let fixture: ComponentFixture<GroupOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
