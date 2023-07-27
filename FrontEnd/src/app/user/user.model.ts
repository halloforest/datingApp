import { Person } from "../peson/person.model";

export class User extends Person {
    constructor(
      id: string,
      userName: string,
      email: string,
      introduce: string,
      imageUrl: string,
      private _token: string,               // New property: token
    ) {
        // super: It is a keyword in TypeScript (and many other programming languages) used to call the constructor of the parent class
        super(id, userName, email, introduce, imageUrl);
    }

    get token(): string | null {
        // Check if the token expiration date set and it is not expired
        return this._token;
    }
}
