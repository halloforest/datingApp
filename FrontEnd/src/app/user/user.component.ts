import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { Subscription } from 'rxjs';
import { User, UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: User[] | null = null;
  usersSubscription!: Subscription;

  dataMessage: string | null = null;
  dataMessageSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private userService: UserService) {}

  ngOnInit() {
    this.dataMessageSubscription = this.dataService.dataMessage.subscribe(
      (dataMessage) => {this.dataMessage = dataMessage;}
    );

    this.usersSubscription = this.userService.users.subscribe(
      (users) => {this.users = users;}
    );
  }

  ngOnDestroy() {
    if(this.dataMessageSubscription) this.dataMessageSubscription.unsubscribe(); 
    if(this.usersSubscription) this.usersSubscription.unsubscribe(); 
  }

  onClickGetUsers() {
    this.dataService.getUsers();
  }
}
