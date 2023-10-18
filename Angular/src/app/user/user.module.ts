import { NgModule } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form/user-form.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UserModule { }
