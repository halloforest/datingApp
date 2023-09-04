import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-person',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  members: Member[] | undefined = undefined;
  membersSubscription!: Subscription;

  apiMessage: string | undefined = undefined;
  apiMessageSubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private memberService: MemberService) {}

  ngOnInit() {
    this.apiMessageSubscription = this.apiService.apiMessage.subscribe(
      (message) => {this.apiMessage = message;}
    );

    this.membersSubscription = this.memberService.members.subscribe(
      (members) => {this.members = members;}
    );
  }

  ngOnDestroy() {
    if(this.apiMessageSubscription) this.apiMessageSubscription.unsubscribe(); 
    if(this.membersSubscription) this.membersSubscription.unsubscribe(); 
  }

  onClickGetUsers() {
    this.apiService.getMembers();
  }
}
