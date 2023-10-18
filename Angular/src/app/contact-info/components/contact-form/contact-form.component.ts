import { Component, Inject, OnInit } from '@angular/core';
import { ContactService } from 'src/app/core/services/contact-service/contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactInfo } from 'src/app/core/models/contact-info';
import { TeacherService } from 'src/app/core/services/teacher-service/teacher.service';
import { Teacher } from 'src/app/core/models/teacher';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  constructor(private contactService: ContactService,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { contactInfo: ContactInfo }) {
    if (data != undefined) {
      this.editContactInfo = data.contactInfo;
    }
  }

  editContactInfo: ContactInfo | undefined;
  teachers: Teacher[] = [];
  registeredForm!: FormGroup;

  ngOnInit() {
    this.getTeachers();
    this.reactivateForm();
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers);
  }

  reactivateForm() {
    if (this.editContactInfo === undefined) {
      this.registeredForm = this.formBuilder.group({
        id: ['0'],
        address: [''],
        email: ['', [Validators.required, Validators.email]],
        websiteLink: [''],
        contactNumber: ['', [Validators.required, this.numberValidator(), Validators.minLength(9), Validators.maxLength(9)]],
        cabinetNumber: ['', [Validators.required, this.numberValidator()]],
        teachers: [1],
      });
    } else {
      this.registeredForm = this.formBuilder.group({
        id: [this.editContactInfo?.id],
        address: [this.editContactInfo?.address],
        email: [this.editContactInfo?.email, [Validators.required, Validators.email]],
        websiteLink: [this.editContactInfo?.websiteLink],
        contactNumber: [this.editContactInfo?.contactNumber, [Validators.required, this.numberValidator(), Validators.minLength(9), Validators.maxLength(9)]],
        cabinetNumber: [this.editContactInfo?.cabinetNumber, [Validators.required, this.numberValidator()]],
        teachers: [this.editContactInfo?.teacherId],
      });
    }
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ageNumberRgx = /^\d+$/;
      const validated = ageNumberRgx.test(control.value);
      return validated ? null : { validatedNumber: { value: control.value } };
    };
  }

  errorHandling(control: string, error: string) {
    return this.registeredForm.controls[control].hasError(error);
  }

  onSubmit(newEntry: boolean) {
    var address = this.registeredForm.controls['address'].value.trim();
    var email = this.registeredForm.controls['email'].value.trim();
    var websiteLink = this.registeredForm.controls['websiteLink'].value.trim();
    var contactNumber = this.registeredForm.controls['contactNumber'].value;
    var cabinetNumber = Number(this.registeredForm.controls['cabinetNumber'].value);
    var teacherId = Number(this.registeredForm.controls['teachers'].value);

    if (newEntry) {
      this.contactService.addContactInfo({ address, email, websiteLink, contactNumber, cabinetNumber, teacherId } as ContactInfo).subscribe();
    }
    else {
      var id = Number(this.registeredForm.controls['id'].value);
      this.contactService.updateContactInfo({ id, address, email, websiteLink, contactNumber, cabinetNumber, teacherId } as ContactInfo).subscribe();
    }
    this.dialogRef.close();
  };
}
