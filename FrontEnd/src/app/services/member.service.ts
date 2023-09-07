import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../models/member.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // One client, one user
  members = new BehaviorSubject<Member[] | null>(null);
  member = new BehaviorSubject<Member | null>(null);

  constructor() { }

  setMembers(members: Member[]) {
    this.members.next(members);
  }

  setMember(member: Member) {
    this.member.next(member);
  }
}
