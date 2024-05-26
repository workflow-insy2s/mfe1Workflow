import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworkflowComponent } from './addworkflow.component';

describe('AddworkflowComponent', () => {
  let component: AddworkflowComponent;
  let fixture: ComponentFixture<AddworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddworkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
