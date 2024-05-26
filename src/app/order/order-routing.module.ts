import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AddworkflowComponent } from './addworkflow/addworkflow.component';
import { CreateFlowComponent } from './create-flow/create-flow.component';
import { CreateWorkflowComponent } from './create-flow/create-workflow/create-workflow.component';
import { StepInfoComponent } from './create-flow/step-info/step-info.component';
import { StepsComponent } from './create-flow/steps/steps.component';
import { ListworkflowComponent } from './listworkflow/listworkflow.component';
import { EditComponent } from './edit/edit.component';
// import { ExecutorComponent } from './executor/executor.component';
// import { WorkflowListComponent } from './executor/workflow-list/workflow-list.component';
// import { WorkflowExecuteComponent } from './executor/workflow-execute/workflow-execute.component';
// import { DescriptionComponent } from './executor/description/description.component';

const orderRoutes: Routes = [


  { path: '', redirectTo:'orderComponent/dashbordComponent', pathMatch: 'full' },


  // {
  //   path: 'executor',
  //   component: ExecutorComponent,
  //   children:[{
  //     path:'workflowList',
  //     component: WorkflowListComponent
  //   },
  //   {
  //     path: 'workflowExecute/:workflowId',
  //     component: WorkflowExecuteComponent
  //   },
  //   {path : 'description',
  //     component :DescriptionComponent
  //   }

  //   ]
  // },
    {
        path: 'orderComponent',
        component: OrderComponent,
        children:[
          {
            path: 'dashbordComponent',
            component: DashbordComponent
          },
          {
            path: 'addworkflowComponent',
            component: AddworkflowComponent
          },
          {
            path: 'create-flowComponent/:workflowId',
            component: CreateFlowComponent,
            children:[
              {
                path: 'create-workflowComponent',
                component: CreateWorkflowComponent
            
              },
              {
                path: 'step-infoComponent',
                component: StepInfoComponent
            
              },
              {
                path: 'stepsComponent',
                component: StepsComponent
            
              }
            ]
            
          },
          {
            path: 'editComponent/:workflowId',
            component: EditComponent
        
          },
          {
            path: 'listworkflowComponent',
            component: ListworkflowComponent
        
          },
         
        ]
    
      },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes)
    ]
})
export class OrderRoutingModule { }
