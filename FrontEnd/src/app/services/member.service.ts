import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // One client, one user
  members = new BehaviorSubject<Member[] | undefined>(undefined);
  member = new BehaviorSubject<Member | undefined>(undefined);

  constructor() { }

  setMembers(members: Member[]) {
    this.members.next(members);
  }

  setMember(member: Member) {
    this.member.next(member);
  }
}
