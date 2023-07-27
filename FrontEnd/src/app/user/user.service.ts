import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment.prod';
import { User } from './user.model';
import { UserDto } from '../api/api.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  userDtoHandler(userDto: UserDto) {
    const user = new User(
      userDto.id,
      userDto.userName,
      userDto.email,
      userDto.introduce,
      userDto.imageUrl,
      userDto.token);
    this.user.next(user);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');
  }

}