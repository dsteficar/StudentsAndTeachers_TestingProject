import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ContactFormComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ContactInfoModule { }
