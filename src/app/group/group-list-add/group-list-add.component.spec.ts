import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListAddComponent } from './group-list-add.component';

describe('GroupListAddComponent', () => {
  let component: GroupListAddComponent;
  let fixture: ComponentFixture<GroupListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
