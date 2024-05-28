import { CdkDragDrop, moveItemInArray, copyArrayItem, CdkDrag, CdkDropList, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, 
  ComponentFactoryResolver, ViewContainerRef , ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';
import { Step, WorkflowDto } from 'src/app/common/models/workflow-dto';
import { ConditionalStep, IterativeStep, StepDto1 } from 'src/app/common/models/step-dto';
import { MatDialog } from '@angular/material/dialog';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { DataService } from '../../data.service';
import { Rule } from 'src/app/common/models/Rule';
import { Role } from 'src/app/common/models/role';
import {RuleService} from 'src/app/order/RuleService';


@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StepsComponent  implements OnInit{

  cols: any[] = [];
  constructor(private srv: ServiceService , private srvStep: ServiceService,
    private router: Router ,private dialog: MatDialog,
    private route: ActivatedRoute,
    private dataService: DataService,
    private RuleService: RuleService
  ) {}
  @Input()
  set date(date: Date) {
    

    for (let i = 0; i < 4; ++i) {
      this.cols.push([{}, {}, {}, {}, {}, {}, {}]);
    }

    this.dataService.getSchedulesFor(2024, 3).subscribe((schedules) => {
      console.log(schedules);
      this.fillDaysWithSchedules(7, schedules);
    });
  }



  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;


    
  

  stepType :string = '';

  drop(event: CdkDragDrop<any>) {

    this.stepType = event.item.data ;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
         console.log("list of Steps",this.create);

  }

  private getSchedulesForDay(schedules: any[], currentDate: Date): any[] {
    return schedules
      .filter((x) => this.isSameDate(x.date, currentDate))
      .map((x) => {
        const tmp = { ...x };
        delete tmp.date;
        return tmp;
      });
  }

  private fillDaysWithSchedules(firstDayOfTheMonth: number, schedules: any[]) {
    
    let day = 1;

    for (let col = 0; col < 4; ++col) {
      let weekDay = col === 0 ? firstDayOfTheMonth : 0;
      for (; weekDay < 7; ++weekDay) {
        const currentDate = new Date(Date.UTC(2024, 1, day));
        this.cols[col][weekDay] = {
          schedules: this.getSchedulesForDay(schedules, currentDate),
        };

        ++day;
        
      }
    }
  }

  private isSameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  workflowId: number;
  workflow :WorkflowDto = {
    id:'',
    name: "",
    description: "",
    role_id: '',
    creationDate: '',
    steps: [],
    //workflowId: number;
  };

  
  idStep: number | null;
  // StepDto: StepDto = new StepDto();

  // stepdto: StepDto1 = { 
  //   id: '',
  //   name: "",
  //   description: "",
  //   creationDate: "",
  //   exitRulesIds: [],
  //   entryRulesId: [],
  //   role: new Role(1,'','','',''),
  //   workflow: new WorkflowDto('', "", "", '', []),
  //   rank: 1,
  //   state: "",
  //   start_date: "",
  //   end_date: "",
  //   step_type : "",
  // };

  stepdto : Step;

  steps: StepDto1[] = [];

  ngOnInit(): void {

    this.loadPosition();

    this.route.params.subscribe(params => {
      this.workflowId = params['workflowId']; 

     this.getWorkflowDetail();
  });



  // pour update le Steps avec le id rule
  this.addRuleToStep()
}

 positions: { [key: string]: { x: number, y: number } } = {};



onDragEnded(event: CdkDragEnd, item: any) {
  console.log("item : ", item);
  this.positions[item.id] = event.source.getFreeDragPosition();
  this.savePosition();
  }

  savePosition() {
    localStorage.setItem('dragPosition', JSON.stringify(this.positions));
    console.log("position", this.positions);
  }

  loadPosition() {
    const savedPositions = localStorage.getItem('dragPosition');
    if (savedPositions) {
      this.positions = JSON.parse(savedPositions);
    } else {
      this.positions = {};
    }
  }
  
numRole :number = 1;
  
  getWorkflowDetail(){
    this.srv.getWorkflowById(this.workflowId).subscribe((res: any) => {
      this.workflow = res;
    });
    this.srv.getAllStepsByWorkflowIdAndRoleId(this.workflowId ,this.numRole).subscribe((res:any) => {
      this.create=res;

    });
}
  

  
  deleteStep() {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible et supprimera l\'etape.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.idStep){
          this.srvStep.deleteStepFromWorkflow(this.idStep)
          .subscribe(
            (result) => { 
              console.log(result);
              Swal.fire('Step supprimé avec succès', '', 'success');
              window.location.reload();
            },
            (err) => {
              console.log(err);
              Swal.fire('Step supprimé avec succès', '', 'success');
              window.location.reload();
            }
          );
      }
        }
         else {
        Swal.fire('Suppression annulée', '', 'info');
      }
    });
  }

  Rules: Rule[] = [];
  
    deleteWorkflow(ruleId: any) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Cette action est irréversible et supprimera la régle.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.srv.removeRule(ruleId)
            .subscribe(
              (result) => {
                console.log(result);
                Swal.fire('Workflow supprimé avec succès', '', 'success');
                window.location.reload();
              },
              (err) => {
                console.log(err);
                Swal.fire('Workflow supprimé avec succès', '', 'success');
                window.location.reload();
              }
            );
        } else {
          Swal.fire('Suppression annulée', '', 'info');
        }
      });
    }
    
    editWorkflow(id: number): void {
      console.log(`Modification du workflow avec l'ID ${id}`);
    }
  
    
  stepst = ['Step','Iterative', 'Conditionelle', 'Exit'];

  create :any = [];
  iter :any = [];
  c2 :any = [];
  

  showStepInfo: boolean = false;

  createRule() :void {
    this.router.navigate(['/mfe-rule'], { queryParams: { idStep: this.idStep }});
  }

 /* isStepInfoVisible() {
  return this.showStepInfo;
  }*/

 /* ShowStepInfo():void {
  this.showStepInfo = true;
  }*/

  roles: Role[]=[];
  checkedRoles: number[] = [];

  handleRoleChange(event: any, role: Role) : void{
    role.checked = event.target.checked;
    console.log('role:', role);
    console.log('role:', role.checked);

    if (event.target.checked) {
      console.log("event: ",event.target.checked); 
      this.checkedRoles.push(role.id);
      console.log("checkedRoles", this.checkedRoles);
    } else {
      const index = this.checkedRoles.findIndex(r => r === role.id);
      if (index > -1) {
        this.checkedRoles.splice(index, 1);
      }
    }
  }

  

  showStepInfoNoCreated:boolean=false
// pour ajouter un step
AddStep : Step = new Step(0,'','','',[],[],[],this.workflow,0);
ShowStepInfoClickToAddStep(){
  console.log("methode il est bien")
  
  
  // getAllRoles dans le systeme
  this.srvStep.getAllRoles().subscribe((res: any) => {
  this.roles =res;
  console.log(this.Rules)
  if(this.roles.length>0){
  this.showStepInfoNoCreated=true;

  //this.showStepInfo = true;
  console.log("les roles:",this.roles)
   }
              
             })

 }

 ShowButtonAddRule:boolean=false;
AddNewStep:Step= new Step(0,'','','',[],[],[],this.workflow,0);;
 addStepsToWorkflow(): void {
  this.AddStep.role = this.checkedRoles
  console.log("les Step qui vous ajouter:",this.AddNewStep)
  console.log("les id workflow.id :",this.workflow.id)
  console.log("les id workflowId 2 :",this.workflowId)
  this.AddNewStep.role.push(1);

  
    this.srvStep.addStepsToWorkflow(this.AddNewStep, this.workflowId)
        .subscribe(
          (result :any) => { 
            console.log(result);
            Swal.fire('Valider', '', 'success');  
            this.AddStep=result;

            this.getWorkflowDetail();
            this.ShowButtonAddRule = true;
            
          },
          (error) => { 
            console.log('Error:', error);
            Swal.fire('Erreur', '', 'error');
          }
          
        );
}
  //pour update of Step
 
listIdRole:number[]=[];
listRole:Role[]=[];

listRule:Rule[]=[]

  ShowStepInfoClick(StepId:any): void {
    console.log("hello:",StepId)
    let listIdRule: number[]=[]
    

    //this.stepdto.role = this.checkedRoles;
    if(!(StepId === null || StepId === undefined)){
        this.srvStep.getStepById(StepId).subscribe(
        (result:Step) => { 
          this.AddStep = result;
          console.log("addStep:", this.AddStep);
          this.listIdRole=[]
          this.listIdRole =this.AddStep.role
          console.log("list des rolles id ",this.listIdRole)
          this.showStepInfo = true;
          this.listRole=[]

          //getRoles of this step
          for (let i = 0; i < this.listIdRole.length; i++) {
            console.log(this.listIdRole[i]);
            this.srvStep.getRoleByIdOfStep(this.listIdRole[i]).subscribe((res:any) => {
              
              this.listRole.push(res)
        
            });
        }

          // getAllRoles dans le systeme
          this.srvStep.getAllRoles().subscribe((res: any) => {
            this.roles =res;
            
           })
           
           // get All rule of this steps
           this.listRule = []
           listIdRule = [...this.AddStep.entryRulesId, ...this.AddStep.exitRulesIds];
           for (let i = 0; i < listIdRule.length; i++) {

           this.srvStep.getRuleById(listIdRule[i]).subscribe((res: any) => {
            this.listRule.push(res);
            
           })
          }
          console.log("this list of rules:",this.listRule)


        },
        (err) => {
          console.log(err);
        }
        );
    // this.dialog.open(StepInfoComponent, {
    //   width: '400px',
    //   // Add any other configuration options here
    // });
  }else{
    this.ShowStepInfoClickToAddStep()

  }
  }

  getSteps(): Step[]{
    let steps= this.workflow.steps;
    return steps;
  }

  testStep(element: any): Boolean {
    if (element instanceof Step || element === "Step") {
      return true;
    } 
    return false;
  }

  condiStep(element: any):Boolean{
    if (element instanceof Step || element === "Conditionelle") {
      return true;
    } 
    return false;
  }

  // condiStep(step: Step): boolean {
  //   return step.step_type === "Conditionelle";
  // }
  

  iterStep(element: any):Boolean{
    if (element instanceof Step || element === "Itération") {
      return true;
    } 
    return false;
  }

  // iterStep(step: Step): boolean {
  //   return step.step_type === 'Iterative';
  // }
  


  editStepOfWorkflow(): void {
    this.AddStep.role = this.checkedRoles
    console.log(this.AddStep);
    this.srvStep.editStepOfWorkflow(this.idStep, this.AddStep)
    .subscribe(
      (result) => { 

      Swal.fire('Valider', '', 'success')
     },
    (err) => {
      console.log(err)
      Swal.fire('Invalid ', '', 'error')
    }
    )
  }

  showRuleDetails(): void{
    
  }






  //les methode pour les ajouter regle
  viewAddRule(){
            // send ID Rule with localStorge to WorkflowFrontEnd
            const IdWorkflow = this.workflowId.toString() ;
            const IdStep = this.AddStep.id.toString() ;

 
            // Stockez le token dans localStorage
            localStorage.setItem('IdWorkflow', IdWorkflow);
            localStorage.setItem('IdStep', IdStep);

            console.log('id Workflow localStorage Workflow',localStorage);
    
    this.router.navigate(['/mfe1/orderComponent/MfeRule']);


    
    //this.router.navigate(['/MfeRule']);
  }


  // methode apres retoure de l'ajoute de regle
  listNewRule:Rule[]=[]
  addRuleToStep(){
    let UpdateStep:Step
            // get IdWorkflow and navigat vers le workflow
            const IdRule = this.RuleService.getIdRule(); 
            console.log('id Rule localStorage Rule',IdRule);
            const IdStep = this.RuleService.getIdStep(); ;
            console.log('id IdStep localStorage IdStep',IdStep);
            // si le nouvelle step
           if (!(IdRule == 'null' && IdStep == 'null' )){
              //getStepById
              this.srvStep.getStepById(IdStep).subscribe(
                (result:Step) => {
                  UpdateStep=result
                  const idR = parseInt(IdRule, 10);
                  UpdateStep.entryRulesId.push(idR)
                  //updateStep
                  this.srvStep.editStepOfWorkflow(IdStep, UpdateStep)
                  .subscribe(
                    (result) => { 
              
                    Swal.fire('Valider', '', 'success')
                    localStorage.setItem('IdRule','null' );
                    localStorage.setItem('IdStep','null' );


                   },
                  (err) => {
                    console.log(err)
                  }
                  )

                  


                 });
              


              

              }

            }


            fermerBlogNewStep(){
              this.showStepInfoNoCreated=false
            }
            fermerBlogInfoStep(){
              this.showStepInfo=false
            }
  }





