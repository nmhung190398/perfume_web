import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragrantComponent } from './fragrant.component';

describe('FragrantComponent', () => {
  let component: FragrantComponent;
  let fixture: ComponentFixture<FragrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
