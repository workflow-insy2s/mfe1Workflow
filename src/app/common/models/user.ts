export class User {
  id : any;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  docProfileId: string;
  dateInscription: Date;
  enabled: boolean;
  status: boolean;
  roles: { id: number; 
          name: string,
          description: string,
          status: boolean
  }[] = [];

  constructor(
    id :any,
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    docProfileId: string,
    dateInscription: any,
    enabled: any,
    status: any,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.docProfileId = docProfileId;
    this.dateInscription = dateInscription;
    this.enabled = enabled;
    this.status = status;
  }
}
