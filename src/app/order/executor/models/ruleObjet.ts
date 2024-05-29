export class Objet {
    id: any;
    name: string;
    type: string;
    content: string;
    creationDate: any;
    parameters: any[]; 
    constructor(id: any, name: string, type: string, content: string ,creationDate: any,parameters: any[] ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.content = content;
        this.creationDate = creationDate;
        this.parameters = parameters;
    }
  }

 export class RuleObjet {
    id: any;
    rule: any; // Vous pouvez remplacer any par un type spécifique si nécessaire
    objet: Objet;
    rank: any;

    constructor(id: any, rule: any, objet: Objet, rank: any) {
        this.id = id;
        this.rule = rule;
        this.objet = objet;
        this.rank = rank;
    }
  }