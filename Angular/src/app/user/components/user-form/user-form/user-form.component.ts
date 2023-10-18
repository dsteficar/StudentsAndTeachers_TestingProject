import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user-service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private service: UserService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { user: User }) {
    if (data != undefined) {
      this.editUser = data.user;
    }
  }

  editUser: User | undefined;
  registeredForm!: FormGroup;

  ngOnInit() {
    this.reactivateForm();
  }

  reactivateForm() {
    if (this.editUser === undefined) {
      this.registeredForm = this.formBuilder.group({
        id: ['0'],
        fullName: ['', [Validators.required, this.fullNameValidator()]],
        number: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
        dateOfBirth: ['', [Validators.required]],
      });
    } else {
      this.registeredForm = this.formBuilder.group({
        id: [this.editUser?.id],
        fullName: [this.editUser?.fullName, [Validators.required, this.fullNameValidator()]],
        number: [this.editUser?.number, [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
        dateOfBirth: [this.editUser?.dateOfBirth, [Validators.required]],
      });
    }
  }

  fullNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fullNameRgx = /^[A-Z]{1}\w+\s{1}[A-Z]{1}\w+$/;
      const validated = fullNameRgx.test(control.value);
      return validated ? null : { validatedFullName: { value: control.value } };
    };
  }

  errorHandling(control: string, error: string) {
    return this.registeredForm.controls[control].hasError(error);
  }

  onSubmit(newEntry: boolean) {
    var fullName = this.registeredForm.controls['fullName'].value.trim();
    var number = this.registeredForm.controls['number'].value.trim();

    var dateOfBirthInput: Date = (this.registeredForm.controls['dateOfBirth'].value);
    var utcDate = new Date(dateOfBirthInput.getTime() - dateOfBirthInput.getTimezoneOffset() * 60000); // convert to UTC timezone
    var dateOfBirth = utcDate.toISOString();

    if (newEntry) {
      this.service.addUser({ fullName, number, dateOfBirth } as User).subscribe();
    }
    else {
      var id = Number(this.registeredForm.controls['id'].value);
      this.service.updateUser({ id, fullName, number, dateOfBirth } as User).subscribe();
    }
    this.dialogRef.close();
  };
}
