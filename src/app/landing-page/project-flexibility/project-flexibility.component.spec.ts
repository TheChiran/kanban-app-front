import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFlexibilityComponent } from './project-flexibility.component';

describe('ProjectFlexibilityComponent', () => {
  let component: ProjectFlexibilityComponent;
  let fixture: ComponentFixture<ProjectFlexibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFlexibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFlexibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
