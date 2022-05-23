import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoInfoComponent } from './userinfo-info.component';

describe('UserinfoInfoComponent', () => {
  let component: UserinfoInfoComponent;
  let fixture: ComponentFixture<UserinfoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinfoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinfoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
