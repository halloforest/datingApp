import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  people: Person[] | null = null;
  peopleSubscription!: Subscription;

  apiMessage: string | null = null;
  apiMessageSubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private personService: PersonService) {}

  ngOnInit() {
    this.apiMessageSubscription = this.apiService.apiMessage.subscribe(
      (message) => {this.apiMessage = message;}
    );

    this.peopleSubscription = this.personService.people.subscribe(
      (people) => {this.people = people;}
    );
  }

  ngOnDestroy() {
    if(this.apiMessageSubscription) this.apiMessageSubscription.unsubscribe(); 
    if(this.peopleSubscription) this.peopleSubscription.unsubscribe(); 
  }

  onClickGetUsers() {
    this.apiService.getPeople();
  }
}
