import { Workflow } from "./workflow";

export class StepEx {
  id: number;
  name: string;
  description: string;
  creationDate: string;
  exitRulesIds: any[];
  entryRulesId: any[];
  role: number;
  workflow: Workflow;
  rank: number;
  state: any;
  start_date: any;
  end_date: any;

  constructor(end_date: any,start_date: any,state: any, id: number, name: string, description: string, creationDate: string, exitRulesIds: any[], entryRulesId: any[], role: number, workflow: Workflow, rank: number) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.creationDate = creationDate;
      this.exitRulesIds = exitRulesIds;
      this.entryRulesId = entryRulesId;
      this.role = role;
      this.workflow = workflow;
      this.rank = rank;
      this.state=state
      this.start_date=start_date;
      this.end_date=end_date;
  }
  }