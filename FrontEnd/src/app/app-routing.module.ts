import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './modules/user/user.component';
import { ErrorComponent } from './modules/error/error.component';
import { MemberListComponent } from './modules/member/member-list/member-list.component';
import { MemberDetailComponent } from './modules/member/member-detail/member-detail.component';
import { MemberEditComponent } from './modules/member/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';


const routes: Routes = [  
  { path: 'members',
    children: [
      { path: 'list',      component: MemberListComponent},
      { path: 'edit',      component: MemberEditComponent, canDeactivate:[preventUnsavedChangesGuard]},
      { path: ':username', component: MemberDetailComponent}]}, 
  { path: 'user',         component: UserComponent},
  { path: 'error',         component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
