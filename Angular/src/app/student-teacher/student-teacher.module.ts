import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentTeachersComponent } from './components/student-teachers/student-teachers.component';
import { StudentTeacherFormComponent } from './components/student-teacher-form/student-teacher-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StudentTeachersComponent,
    StudentTeacherFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentTeacherModule { }
