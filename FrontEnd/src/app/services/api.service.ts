import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { SignInDto, SignUpDto, UserTokenDto } from '../dtos/api.dto';
import { UserService } from './user.service';
import { environment } from 'src/environment/environment';
import { Member } from '../models/member.model';
import { MemberService } from './member.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.baseUrl;
  apiMessage = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private memberService: MemberService
  ) { }

  signUp(signUpDto: SignUpDto) {
    this.apiMessage.next("Sign up, loading...");
    this.http
      .post<UserTokenDto>(
        environment.baseUrl + `/account/register`,
        signUpDto)
      .subscribe(
        (UserTokenDto) => {
          this.userService.userDtoHandler(UserTokenDto);
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
      .post<UserTokenDto>(
        environment.baseUrl + `/account/login`,
        signInDto)
      .subscribe(
        (userTokenDto) => {
          this.handleUserToken(userTokenDto);
          this.userService.userDtoHandler(userTokenDto);
          this.apiMessage.next("Sign in was successful!");
        },
        errorMessage => {
          this.apiMessage.next("Sign in error: " +  JSON.stringify(errorMessage) );
        }
      );
  }

  getMembers() { 
    this.http
      .get<Member[]>(environment.baseUrl + `/users`)  // Token was handled in the inteceptor
      .subscribe(
        (members: Member[]) => {
          this.memberService.setMembers(members);
          this.apiMessage.next("Get members successfully!");
        },
        error => {
          this.apiMessage.next("Get members error!" + JSON.stringify(error));
        },
        () => {
          this.apiMessage.next("Get members successful!" );
        },
      );
  }

  updateMember(member: Member | null) {
    this.http
    .put<Member[]>(environment.baseUrl + `/users`, member, {params: this.getHttpParams()})
    .subscribe(
      () => {
        this.apiMessage.next("Recipes were uploaded to the server successfully!");
      },
      error => {
        this.apiMessage.next("Save recipes error: " + error.message);
      }
    );   
  }

  getMemberByUserName(userName: string | undefined) {
    // Member already exist in the local caching, do nothing
    if(this.memberService.member.getValue()?.userName === userName) return;

    let localMember = this.memberService.members.getValue()?.find(x => x.userName === userName);

    if (localMember) {
      // Member can be extracted from local members caching
      this.memberService.member.next(localMember);
    } else {
      // Get member from remote
      this.http
      .get<Member>(environment.baseUrl + `/users/${userName}`, {params: this.getHttpParams()})
      .subscribe(
        (member: Member) => {
          this.memberService.setMember(member);
          this.apiMessage.next("Get member successfully!");
        },
        error => {
          this.apiMessage.next("Get member error!" + JSON.stringify(error));
        },
        () => {
          this.apiMessage.next("Get member successful!" );
        },
      );
    }  
  }

  private getHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    let user = this.userService.user.getValue(); // Get the current value from BehaviorSubject
    if(user && user.token) {
      httpParams = httpParams.set('auth', user.token)
    }
    return httpParams;
  }

  private handleUserToken(userTokenDto: UserTokenDto) {
    const user = new User(
      userTokenDto.userName,
      userTokenDto.token);
    this.userService.user.next(user);

    // Save the user data locally
    localStorage.setItem('userToken', JSON.stringify(user));
  }

  autoSignIn() { 
    // Convert from file to string
    const loadedUserString: string | null = localStorage.getItem('userToken');
    if(loadedUserString == null) return;

    // Convert from string to structure
    const loadedUser: {
      userName: string;
      _token: string;
    } = JSON.parse(loadedUserString);

    // Convert from structure to User datatype
    const user = new User(
      loadedUser.userName,
      loadedUser._token
    );

    this.userService.user.next((user.token == undefined)? undefined : user);
  }
}
