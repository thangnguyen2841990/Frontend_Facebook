import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserInfoComponent } from './other-user-info.component';

describe('OtherUserInfoComponent', () => {
  let component: OtherUserInfoComponent;
  let fixture: ComponentFixture<OtherUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
