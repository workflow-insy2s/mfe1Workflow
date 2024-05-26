import { TestBed } from '@angular/core/testing';

import { WorkflowInterceptor } from './workflow.interceptor';

describe('WorkflowInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WorkflowInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: WorkflowInterceptor = TestBed.inject(WorkflowInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
