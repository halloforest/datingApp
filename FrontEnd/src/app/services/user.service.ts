import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserTokenDto } from '../dtos/api.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) { }

  userDtoHandler(userDto: UserTokenDto) {
    const user = new User(
      userDto.userName,
      userDto.token);
    this.user.next(user);
  }

  logout() {
    this.user.next(undefined);
    this.router.navigate(['/auth']);

    localStorage.removeItem('userToken');
  }

}