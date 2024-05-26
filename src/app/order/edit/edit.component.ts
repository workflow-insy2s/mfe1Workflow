import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { WorkflowDto } from '../../common/models/workflow-dto';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/common/models/role';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  workflow: WorkflowDto = {
    id:"",
    name: "",
    description: "",
    role_id: [],
    creationDate: "",
    steps: [],
    // workflowId: 1,
    };
    
  roles: Role[]=[];
  checkedRole: String;

  constructor(private route: ActivatedRoute, private srvRole: ServiceService ,private router:Router, private srv: ServiceService ) { }
  workflowId=this.route.snapshot.params['workflowId'];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.workflowId = params.get('workflowId');
      this.srv.getWorkflowById(this.workflowId).subscribe((res: any) => {
        this.workflow = res;

        console.log("workflow",this.workflow);
      })

      this.srvRole.getAllRoles().subscribe((res: any) => {
        this.roles =res;
       })
    });
  }

  handleRoleChange(event: any, role: Role) {
    role.checked = event.target.checked;
    if (event.target.checked) {
      this.workflow.role_id= role.name;
    }
  }

  editWorkflow2(){
    this.srv.editworkflow(this.workflow , this.workflowId)
    .subscribe(
      (result) => { 
      console.log(result)
      this.ngOnInit()
      Swal.fire('Valider', '', 'success')
      this.router.navigate(['/mfe1/orderComponent/create-flowComponent/'+ this.workflowId]);
    },
    (err) => {
      console.log(err)
      Swal.fire('Invalid ', '', 'error')
    }
    )
  }
  
}
