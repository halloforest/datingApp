import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;
  recipeServerMessage: string = "";
  recipeServerMessageSubscription!: Subscription;

  user: User | undefined = undefined;
  userSubscription!: Subscription;

  constructor( private userService: UserService) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
    
    this.userSubscription = this.userService.user.subscribe(
      (user) => {this.user = user;})
  }


  ngOnDestroy() {

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutsideDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown');

    if (dropdownElement && !dropdownElement.contains(targetElement)) {
      this.isDropdownOpen = false;
    }
  }

  onClickLogout() {
    this.userService.logout();
  }
}