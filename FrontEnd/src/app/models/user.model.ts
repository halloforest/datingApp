export class User {
    constructor(
      public userName: string,
      private _token: string,               // New property: token
    ) {}

    get token(): string | null {
        // Check if the token expiration date set and it is not expired
        return this._token;
    }
}
