import { Role } from "./role";
import { WorkflowDto } from "./workflow-dto";

export class StepDto1 {
   id: any;
   name: string;
   description: string;
   creationDate: string;
   exitRulesIds: any[];
   entryRulesId: any[];
   role: Role;
   workflow: WorkflowDto;
   rank: number;
   state: any;
   start_date: any;
   end_date: any;
   step_type : any;
 
   constructor(end_date: any,start_date: any,state: any, step_type:any, id: number, name: string, description: string, creationDate: string, exitRulesIds: any[], entryRulesId: any[], role: Role, workflow: WorkflowDto, rank: number) 
   {
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
       this.step_type= step_type;
   }
   
}

export interface Branch {
   id: string;
   branch_Type: string;
   position: { x: number, y: number };
 }

 export class ConditionalStep extends StepDto1 {
   conditionId : any
 }
 
 export class IterativeStep extends StepDto1 {
   exitRuleId :any
}




  
  
   
  