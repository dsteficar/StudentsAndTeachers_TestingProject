import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './components/students/students.component';
import { StudentFormComponent } from './components/student-form/student-form/student-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentModule { }
