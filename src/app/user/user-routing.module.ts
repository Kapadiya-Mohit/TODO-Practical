import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserService } from '../shared/services/user.service';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'add',
    component: UpdateUserComponent,
  },
  {
    path: 'add/:id',
    component: UpdateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
