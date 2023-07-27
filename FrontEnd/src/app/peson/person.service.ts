import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  // One client, one user
  people = new BehaviorSubject<Person[] | null>(null);

  constructor() { }

  setPeople(people: Person[]) {
    this.people.next(people);
  }
}
