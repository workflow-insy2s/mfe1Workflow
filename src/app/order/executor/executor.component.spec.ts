import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorComponent } from './executor.component';

describe('ExecutorComponent', () => {
  let component: ExecutorComponent;
  let fixture: ComponentFixture<ExecutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExecutorComponent]
    });
    fixture = TestBed.createComponent(ExecutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
