import { Component, OnInit } from '@angular/core';
import { StepInfoComponent} from '../create-flow/step-info/step-info.component';
import { StepsComponent} from '../create-flow/steps/steps.component';
import { CreateWorkflowComponent} from '../create-flow/create-workflow/create-workflow.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent implements OnInit {
  dates: Date[] = [];

  constructor(private date: DataService) {}

  ngOnInit() {
    this.initCalendarDates();
  }

  private initCalendarDates() {
    const { year, monthIndex } = this.date.getCurrent();

    

    this.dates = [
      new Date(year, monthIndex)
    ];
  }
}

