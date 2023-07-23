import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  userId: number | null = null;
  user: User | null = null;
  usersSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,) {}

  ngOnInit() {
    this.usersSubscription = this.userService.users.subscribe(
      (users) => {
        if(users != null && this.userId != null && this.userId < users.length) {
          this.user = users[this.userId]
        }
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        if(params['id'] == null) this.userId = null;
        else this.userId = +params['id'];
      }
    );
  }

  ngOnDestroy() {
    if(this.usersSubscription) this.usersSubscription.unsubscribe(); 
  }
}
