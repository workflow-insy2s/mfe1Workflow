import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListworkflowComponent } from './listworkflow.component';

describe('ListworkflowComponent', () => {
  let component: ListworkflowComponent;
  let fixture: ComponentFixture<ListworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListworkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
