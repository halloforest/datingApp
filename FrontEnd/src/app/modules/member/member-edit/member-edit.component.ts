import { Component, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  member: Member | null = null;
  memberSubscription!: Subscription;

  user: User | undefined;
  userSubscription!: Subscription;

  constructor(
    private memberService: MemberService,
    private apiService: ApiService,
    private userService: UserService) {}

    ngOnInit() {
      this.user = this.userService.user.getValue();
      if(this.user?.userName != undefined) this.apiService.getMemberByUserName(this.user?.userName);
      this.memberSubscription = this.memberService.member.subscribe(
        (member) => {this.member = member;});
    }
  
    ngOnDestroy() {
      if (this.memberSubscription) {this.memberSubscription.unsubscribe();}
      if (this.userSubscription) {this.userSubscription.unsubscribe();}
    }

    onClickSave() {
      this.apiService.updateMember(this.member);
      this.editForm?.reset(this.member);
    }

}
