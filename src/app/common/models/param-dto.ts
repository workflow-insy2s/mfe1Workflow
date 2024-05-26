export class ParamDto {
  name: string;
  content: string;
  rank: any;
  objet: {
    id: any;
  };

  constructor(name: string, content: string, rank: any, objetId: any) {
    this.name = name;
    this.content = content;
    this.rank = rank;
    this.objet = { id: objetId };
  }
  }

