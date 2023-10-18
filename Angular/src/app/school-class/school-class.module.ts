import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolClassFormComponent } from './components/school-class-form/school-class-form.component';
import { SchoolClassesComponent } from './components/school-classes/school-classes.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SchoolClassFormComponent,
    SchoolClassesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SchoolClassModule { }
