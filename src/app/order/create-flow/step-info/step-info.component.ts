import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';
import { Rule } from 'src/app/common/models/Rule';



@Component({
  selector: 'app-step-info',
  templateUrl: './step-info.component.html',
  styleUrls: ['./step-info.component.css']
})
export class StepInfoComponent implements OnInit{
  RuleDto: Rule[] = [];
  constructor(private srv: ServiceService , private router: Router) {}
  ngOnInit(): void {
    //let  stepEntryId = 2;
    //this.srv.getRuls(stepEntryId).subscribe((res: any) => {

      // console.log(res)
      // this.RuleDto = res
    // })
  }



createRule() :void {

      this.router.navigate(['/mfe-rule'])
    }
 



    deleteWorkflow(ruleId: any) {
      // Afficher un message d'alerte de confirmation avant la suppression
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Cette action est irréversible et supprimera la régle.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // L'utilisateur a cliqué sur "Oui, supprimer"
          this.srv.removeRule(ruleId)
            .subscribe(
              (result) => { // succès
                console.log(result);
                Swal.fire('Workflow supprimé avec succès', '', 'success');
                window.location.reload();
              },
              (err) => {
                // traitement du cas d'erreur
                console.log(err);
                Swal.fire('Workflow supprimé avec succès', '', 'success');
                window.location.reload();
              }
            );
        } else {
          // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
          Swal.fire('Suppression annulée', '', 'info');
        }
      });
    }
    
    
    
    
    editWorkflow(id: number): void {
      console.log(`Modification du workflow avec l'ID ${id}`);
    }

}