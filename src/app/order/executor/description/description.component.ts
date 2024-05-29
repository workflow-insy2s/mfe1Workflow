import { Component, Inject } from '@angular/core';
import { ServiceService } from '../../service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
    // Copie de sauvegarde de parametre original
    newUser: any;
    constructor(
      private srvRole: ServiceService,
      public dialogRef: MatDialogRef<DescriptionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
            // Copie de l'objet d'origine pour les modifications
            this.newUser = { ...data.user };
      }
   
   
   
      onCancelClick(): void {
        // Fermer la boîte de dialogue sans appliquer de modifications
        this.dialogRef.close();
      }

}
