import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Person } from '../peson/person.model';
import { PersonService } from '../peson/person.service';
import { SignInDto, SignUpDto, UserDto } from './api.dto';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getPeopleEndpoint: string = "https://localhost:5001/api/users";
  signUpEndpoint: string = "https://localhost:5001/api/account/register";
  signInEndpoint: string = "https://localhost:5001/api/account/login";
  apiMessage = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private personService: PersonService
  ) { }

  signUp(signUpDto: SignUpDto) {
    this.apiMessage.next("Sign up, loading...");
    this.http
      .post<UserDto>(
        this.signUpEndpoint,
        signUpDto)
      .subscribe(
        (userDto) => {
          this.userService.userDtoHandler(userDto);
          this.apiMessage.next("Sign up was successful!");
        },
        errorMessage => {
          this.apiMessage.next("Sign up error: " + errorMessage);
        }
      );
  }
  
  signIn(signInDto: SignInDto) {
    this.apiMessage.next("Sign in, loading...");
    this.http
      .post<UserDto>(
        this.signInEndpoint,
        signInDto)
      .subscribe(
        (userDto) => {
          this.userService.userDtoHandler(userDto);
          this.apiMessage.next("Sign in was successful!");
        },
        errorMessage => {
          this.apiMessage.next("Sign in error: " +  JSON.stringify(errorMessage) );
        }
      );
  }

  getPeople() {
    this.http
      .get<Person[]>(this.getPeopleEndpoint)
      .subscribe(
        (people: Person[]) => {
          this.personService.setPeople(people);
          this.apiMessage.next("Get people successful!");
        },
        error => {
          this.apiMessage.next("Get people error!" + JSON.stringify(error));
        },
        () => {
          this.apiMessage.next("Get people successful!" );
        },
      );
  }
}
