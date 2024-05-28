import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { WorkflowDto } from '../../common/models/workflow-dto';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../TokenService';
import { Role } from 'src/app/common/models/role';


@Component({
    selector: 'app-addworkflow',
    templateUrl: './addworkflow.component.html',
    styleUrls: ['./addworkflow.component.css']

})

export class AddworkflowComponent implements OnInit{

  token: string | null | undefined;
  form : FormGroup;
  roles: Role[]=[];
  workflow: WorkflowDto = {
    id: '',
    name: '',
    description: '',
    role_id: '',
    creationDate: new Date(),
    steps: [],
  };  empty= false;
  empty_role=false;

  constructor(private srv: ServiceService, private srvRole: ServiceService, private router: Router, private dialog: MatDialog,private tokenService: TokenService) { }
  
  ngOnInit(): void {

      this.token = this.tokenService.getToken();
      this.srvRole.getAllRoles().subscribe((res: any) => {
          this.roles = res;
      })
  }

  selectedRoles: Role[] = [];

  handleRoleChange(event: any, role: Role) {
    role.checked = event.target.checked;
    if (event.target.checked) {
      this.workflow.role_id= role.name;
    }
    console.log(this.workflow.role_id); 
  }

  updateEmptyRoleFlag() {
    this.empty_role = this.selectedRoles.length === 0;
  }
  
  resetinput () {
    this.workflow.name="";
    this.workflow.description="";  
    this.workflow.role_id="";
  }
  
  ajoutWorkflow() {
      console.log("this.workflow", this.workflow);
      this.workflow.role_id
      this.srv.addWorkflow(this.workflow)
      .subscribe(
        (result) => { 
          console.log("workflow :", this.workflow)

          this.router.navigate(['/mfe1/orderComponent/create-flowComponent/'+result.id]);
          Swal.fire('Valider', '', 'success');
          
        },
        (err) => {
          Swal.fire('Invalid ', '', 'error');
        }
      );
  }
}
