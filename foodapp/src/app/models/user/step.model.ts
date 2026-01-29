export class User {
    id: number;
    firstname: string;
    lastname: string;
    mail: string;
    role: string;
    mdp: string;
    nbPerson? : number;
    regimeId?: number;

    constructor(id: number, firstname: string, lastname: string, mail: string, role: string, mdp: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.role = role;
        this.mdp = mdp;
    }
}
