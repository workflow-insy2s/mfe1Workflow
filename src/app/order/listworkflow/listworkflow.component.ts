import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { WorkflowDto } from '../../common/models/workflow-dto';

@Component({
    selector: 'app-listworkflow',
    templateUrl: './listworkflow.component.html',
    styleUrls: ['./listworkflow.component.css']
})
export class ListworkflowComponent implements OnInit {
  
  WorkflowDto: WorkflowDto[] = [];
  pageIndex = 1;
  pageSize = 6;

  constructor(private srv: ServiceService , private router: Router) {}
  
  ngOnInit(): void {
    this.srv.getWorkflows().subscribe((res: any) => {
      console.log(res)
      this.WorkflowDto = res
    })
  }
  
  deleteWorkflow(workflowId: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible et supprimera le workflow.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srv.removeWorkflow(workflowId)
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

  viewWorkflow(id: number): void {
    console.log(`Voir les détails du workflow avec l'ID ${id}`);
  }

  nav(workflowId : any) {
    this.router.navigate(['/mfe1/orderComponent/editComponent/',workflowId]);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex + 1;
  }
}
