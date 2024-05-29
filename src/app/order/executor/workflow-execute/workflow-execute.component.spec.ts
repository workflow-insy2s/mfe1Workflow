import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowExecuteComponent } from './workflow-execute.component';

describe('WorkflowExecuteComponent', () => {
  let component: WorkflowExecuteComponent;
  let fixture: ComponentFixture<WorkflowExecuteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkflowExecuteComponent]
    });
    fixture = TestBed.createComponent(WorkflowExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
