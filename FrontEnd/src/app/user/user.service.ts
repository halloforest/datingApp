import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number,
  userName: string,
  introduce: string,
  imageUrl: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = new BehaviorSubject<User[] | null>(null);

  constructor() { }

  setUsers(users: User[]) {
    this.users.next(users);
  }
}
