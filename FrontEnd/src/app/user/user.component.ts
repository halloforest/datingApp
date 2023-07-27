import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ApiService } from '../api/api.service';
import { User } from './user.model';
import { SignInDto, SignUpDto } from '../api/api.dto';

@Component({
  selector: 'app-auth',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {  
  apiMessage: string | null = null;
  apiMessageSubscription !: Subscription;

  user: User | null = null;
  userSubscription !: Subscription;


  // Get access to html component from ts
  @ViewChild('signUpForm') signUpForm!: NgForm;
  @ViewChild('signInForm') signInForm!: NgForm;

  constructor(
    private apiService: ApiService, 
    private userService: UserService, 
    private router: Router) {}

  showSignUp: any;

  ngOnInit() {
    this.apiMessageSubscription = this.apiService.apiMessage.subscribe(
      (message) => {this.apiMessage = message;}
    );

    this.userSubscription = this.userService.user.subscribe(
      (user) => {
        this.user = user;
        if(this.user != null) {this.router.navigate(['/']);}} // Redirect to homepage after successful login/signup
    );
  }

  onClickSignUpSubmit() {
    let signUpDto: SignUpDto = {
      email: this.signUpForm.value.email,
      userName: this.signUpForm.value.userName,
      introduce: this.signUpForm.value.introduce,
      imageUrl: this.signUpForm.value.imageUrl,
      password: this.signUpForm.value.password,
    }
    this.apiService.signUp(signUpDto);
  }

  onClickSignInSubmit() {
    let signInDto: SignInDto = {
      userName: this.signInForm.value.userName,
      password: this.signInForm.value.password,
    }
    this.apiService.signIn(signInDto);
  }

  ngOnDestroy() {
    if (this.apiMessageSubscription) {
      this.apiMessageSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}