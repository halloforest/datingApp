import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { ApiService } from 'src/app/services/api.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
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

    this.apiService.getMembers();
  }

  ngOnDestroy() {
    if (this.apiMessageSubscription) {this.apiMessageSubscription.unsubscribe();}
    if (this.membersSubscription) {this.membersSubscription.unsubscribe();}
  }


}
