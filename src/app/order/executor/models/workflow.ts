export class Workflow {
    id:any
    name: string;
    description: string;
    role_id: any;
    creationDate: any;
    steps: Step[];
  
    constructor(
      name: string,
      description: string,
      role_id: any,
      creationDate: any,
      steps: Step[]
    ) {
      this.name = name;
      this.description = description;
      this.role_id = role_id;
      this.creationDate = creationDate;
      this.steps = steps;
    }
  }
  
  export class Step {
    id: number;
    name: string;
    description: string;
    creationDate: string;
    exitRulesIds: number[];
    entryRulesId: number[];
    role: number;
    workflow: Workflow;
    rank: number;
  
    constructor(id: number, name: string, description: string, creationDate: string, exitRulesIds: number[], entryRulesId: number[], role: number, workflow: Workflow, rank: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.exitRulesIds = exitRulesIds;
        this.entryRulesId = entryRulesId;
        this.role = role;
        this.workflow = workflow;
        this.rank = rank;
    }
    
  
  }