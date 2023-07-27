import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PersonComponent } from './peson/person.component';
import { PersonPageComponent } from './peson/person-page/person-page.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [  
  { path: '',                 redirectTo: '/user', pathMatch: 'full'},
  { path: 'user',             component: UserComponent},
  { path: 'people',            component: PersonComponent, children: [
    { path: '',               component: UserComponent},
    { path: ':id',            component: PersonPageComponent}]}, 
  { path: 'error',            component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
