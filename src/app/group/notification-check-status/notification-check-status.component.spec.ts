import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCheckStatusComponent } from './notification-check-status.component';

describe('NotificationCheckStatusComponent', () => {
  let component: NotificationCheckStatusComponent;
  let fixture: ComponentFixture<NotificationCheckStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCheckStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCheckStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
