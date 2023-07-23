import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserPageComponent } from './user/user-page/user-page.component';

const routes: Routes = [  
  { path: '',                   redirectTo: '/users', pathMatch: 'full'},
  { path: 'users',            component: UserComponent, children: [
    { path: '',               component: UserComponent},
    { path: ':id',      component: UserPageComponent}]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
