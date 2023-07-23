import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  usersEndpoint: string = "https://localhost:5001/api/users";
  dataMessage = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  getUsers() {
    this.http
      .get<User[]>(this.usersEndpoint)
      .subscribe(
        (users: User[]) => {
          this.userService.setUsers(users);
          this.dataMessage.next("Get users successful!");
        },
        error => {
          this.dataMessage.next("Get users error!" + JSON.stringify(error));
        },
        () => {
          this.dataMessage.next("Get users successful!" );
        },
      );
  }
}
