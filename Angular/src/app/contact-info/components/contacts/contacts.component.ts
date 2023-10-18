import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ContactInfo } from '../../../core/models/contact-info';
import { ContactService } from 'src/app/core/services/contact-service/contact.service';
import { TeacherService } from 'src/app/core/services/teacher-service/teacher.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  displayedColumns: string[] = ['address','email','websiteLink', 'contactNumber', 'cabinetNumber','teacher','edit-action','delete-action'];
  dataSource!: MatTableDataSource<ContactInfo>;
  contactInfo: ContactInfo | undefined;
  constructor(private contactService: ContactService,private teacherService: TeacherService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getContactInfos();
  }
  
  getContactInfos(): void{
    this.contactService.getContactInfos().subscribe(contacts=> 
      contacts.forEach(contact => {
        this.teacherService.getTeacher(contact.teacherId).subscribe(teacher => {
          contact.teacherFullname = teacher.name + " " + teacher.surname;
        });
        this.dataSource = new MatTableDataSource(contacts)
    }));
  }

  openAddDialog(): void{
    const dialogRef = this.dialog.open(ContactFormComponent).afterClosed().subscribe(() => this.getContactInfos());
  }

  openEditDialog(selectedContactInfo: ContactInfo): void{
    const dialogRef = this.dialog.open(
      ContactFormComponent, {data : { contactInfo: selectedContactInfo}}).afterClosed().subscribe(() => this.getContactInfos());
  }

  deleteContactInfo(contact: ContactInfo){
    this.dataSource.data = this.dataSource.data.filter(c=> c !== contact);
    this.contactService.deleteContactInfo(contact.id).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
