import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class UserModule {}
