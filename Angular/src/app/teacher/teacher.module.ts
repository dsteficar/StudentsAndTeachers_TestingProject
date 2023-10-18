import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SharedModule } from '../shared/shared.module';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';



@NgModule({
  declarations: [
    TeachersComponent,
    TeacherFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeacherModule { }
