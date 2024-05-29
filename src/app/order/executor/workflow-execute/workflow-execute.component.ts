import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StepEx } from '../models/stepEx';
import { WorkflowExecution } from '../models/workflow-execute';
import { Rule } from '../models/rule';
import { Objet, RuleObjet } from '../models/ruleObjet';

@Component({
  selector: 'app-workflow-execute',
  templateUrl: './workflow-execute.component.html',
  styleUrls: ['./workflow-execute.component.css']
})
export class WorkflowExecuteComponent implements OnInit{
  stepsEx:WorkflowExecution[] = [];  
  steps:StepEx[] = [];
  SExecute!:WorkflowExecution;
  listRule: Rule[]=[]
  step2!:StepEx;
  nombreRule :number = 0;
  nombreRuleExecute :number = 0;


  constructor(private route: ActivatedRoute ,private router:Router,private srv: ServiceService){}
  workflowId=this.route.snapshot.params['workflowId'];
  



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.workflowId = params.get('workflowId');
      this.getlistSteps(this.workflowId);
  
      
    });
  }

  getlistSteps(workflowId:any){
    this.srv.getAllStepByIdWorkflow(workflowId).subscribe((res: any) => {
      this.steps = [];
      this.stepsEx = res;
      let test = true;
      let i = 0;

      while (test && i < this.stepsEx.length) {
        if (this.stepsEx[i].state == "terminer") {
          this.steps.push(this.stepsEx[i].step);
          i++;
        } else {
          this.SExecute = this.stepsEx[i];
          this.step2 = this.stepsEx[i].step;
          test = false;
          //affichage le tableau de regles 
          if (this.step2 != null) {
            let listId: any[] = [];
            listId.push(this.step2.entryRulesId);
            //listId.push(this.step2.exitRulesIds);
            this.listRule=[];
    
            for (let i = 0; i < listId.length; i++) {
              this.srv.getRuleById(listId[i]).subscribe((res: any) => {
                this.listRule.push(res);
              }, (error) => {
                console.error('Error serveur', error);
               // alert('Une erreur est survenue lors de la récupération de règle de step.');
              });
            }
          }
        }
      }


    }, (error) => {
      console.error('Error serveur', error);
      alert('Une erreur est survenue lors de la récupération des résultats.');
    });

  }
  

  showEx:boolean=false;
  showViewTraitement:boolean=false;
  showButtonEx:boolean=false;
  listObject: Objet[]=[]
  rule:any;
  //ruleObjectList:RuleObjet[]=[];

  ex(id:any){
    let localRuleObjectList:RuleObjet[]=[];
    this.showViewTraitement=true;
    this.rule =id;
    //getAllObjectByRuleId
    this.srv.getAllObjetByRuleId(id).subscribe((res: any) => {
     // listRuleObject.push(res);      
      localRuleObjectList = res;
      console.log("la list le plus important:",localRuleObjectList)
      //
            //parcourire les RuleObjet et récupére les objets des cette regle 
            if (localRuleObjectList) {   
              for (let i = 0; i < localRuleObjectList.length; i++) {
                if(localRuleObjectList[i].objet.type === "saisir"){
                  this.listObject.push(localRuleObjectList[i].objet);
                }
                
              }


                            // Appeler la méthode pour traiter les objets
              
                            this.processObjetList();
            }

              














    }, (error) => {
      console.error('Error serveur', error);
      alert('Une erreur est survenue lors de la récupération les objets de regle.');
    });


    


              


}

objetSaisir: Objet;
//methode pour traite le objet de type saisir
processObjetList() {
  if(this.listObject){
    for (const objet of this.listObject) { 
        //console.log("hamdollh");
        this.showEx=true;    
        this.objetSaisir = objet;
        return; // Arrêter la boucle
    }

  }else{
    this.showEx= false; 


  }
 
}


// pour souvgarder les input
sauvegarder() {
  // Sauvegarde des inputs dans l'objet
  console.log("le continu d'objet=",this.objetSaisir)
  this.srv.editObjet(this.objetSaisir, this.objetSaisir.id).subscribe(
    (result) => {
      console.log(result);
      this.listObject.shift();//Supprime le premier élément
      // Après la sauvegarde, continuer le traitement des objets restants
      Swal.fire('Valider', '', 'success');
      this.showEx=false;    
     
      console.log(this.listObject);
      if (this.listObject.length === 0) {
        this.showButtonEx=true;
        this.showEx= false; 
        console.log("akhw far4a")


      }else{
        this.processObjetList();
      }


      
    },
    (err) => {
      // Traitement du cas d'erreur
      console.log(err);
      Swal.fire('Invalid ', '', 'error');
    }
  ); 
}
  



// apres tous le traitement on faire l'execution de regle
async executerRegles(){
  if(this.rule){
    try {
      const res = await this.srv.getResultRule(this.rule).toPromise();
      
      if (res === true){
        Swal.fire('Valider', '', 'success');
      this.nombreRuleExecute =this.nombreRuleExecute + 1 ;
      console.log("les resultat de cette regle :",res)
  
      }else {
        Swal.fire('Invalid ', '', 'error');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du résultat pour la règle ID:', error);
      alert('Une erreur est survenue lors de la récupération des résultats pour les règles.');
  
    }
  }

  }
  
// methode pour passer a staep suivant
Progresser(){
  this.nombreRule =  this.listRule.length;
  console.log( this.listRule.length)
  console.log(this.nombreRule)
  console.log(this.nombreRuleExecute)

   if(this.nombreRule === this.nombreRuleExecute){
    this.SExecute.state= "terminer"
    this.srv.editStep(this.SExecute,this.SExecute.id).subscribe(
      (result) => { 
      console.log("le step est terminer en passer a la suivant")
     // window.location.reload();
     this.getlistSteps(this.workflowId);

    },
    (err) => {
      // traitement du cas d'erreur
      console.log(err)
      
    }
    )

  }else{
    console.log("probleme il un regle nest pas execute")
  } 
}





}
