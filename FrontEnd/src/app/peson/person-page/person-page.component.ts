import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Params } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person.model';


@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent {
  personId: number | null = null;
  person: Person | null = null;
  personSubscription!: Subscription;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,) {}

  ngOnInit() {
    this.personSubscription = this.personService.people.subscribe(
      (people) => {
        if(people != null && this.personId != null && this.personId < people.length) {
          this.person = people[this.personId]
        }
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        if(params['id'] == null) this.personId = null;
        else this.personId = +params['id'];
      }
    );
  }

  ngOnDestroy() {
    if(this.personSubscription) this.personSubscription.unsubscribe(); 
  }
}
