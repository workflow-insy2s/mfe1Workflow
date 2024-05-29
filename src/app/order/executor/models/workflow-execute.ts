import { StepEx } from "./stepEx";
import { Workflow } from "./workflow";

export class WorkflowExecution {
    id: number;
    state: string;
    user_id: number;
    start_date: string;
    end_date: string;
    workflow: Workflow;
    step: StepEx;

    constructor(id: number, state: string, user_id: number, start_date: string, end_date: string, workflow: Workflow, step: StepEx) {
        this.id = id;
        this.state = state;
        this.user_id = user_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.workflow = workflow;
        this.step = step;
    }
}