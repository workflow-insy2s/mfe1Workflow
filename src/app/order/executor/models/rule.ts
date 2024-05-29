export class Rule {
    id: number;
    name: string;
    description: string;
    formula: string;
    creationDate: Date;
    ruleObjets: any[]; // Si nécessaire, remplacez any[] par le type approprié
  
    constructor(obj: any) {
      this.id = obj.id;
      this.name = obj.name;
      this.description = obj.description;
      this.formula = obj.formula;
      this.creationDate = new Date(obj.creationDate);
      this.ruleObjets = obj.ruleObjets; // Si nécessaire, adaptez ce code selon la structure de votre application
    }
  }