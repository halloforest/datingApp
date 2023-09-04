import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './modules/user/user.component';
import { MemberComponent } from './modules/member/member.component';
import { ErrorComponent } from './modules/error/error.component';
import { MemberListComponent } from './modules/member/member-list/member-list.component';
import { MemberDetailComponent } from './modules/member/member-detail/member-detail.component';


const routes: Routes = [  
  { path: 'members',
    children: [
      { path: 'list',      component: MemberListComponent},
      { path: ':username', component: MemberDetailComponent}]}, 
  { path: 'user',         component: UserComponent},
  { path: 'error',         component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
