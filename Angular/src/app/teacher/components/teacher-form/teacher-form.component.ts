import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from 'src/app/core/models/teacher';
import { TeacherService } from 'src/app/core/services/teacher-service/teacher.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {
  constructor(private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TeacherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { teacher: Teacher }) {
    if (data != undefined) {
      this.editTeacher = data.teacher;
      this.checkedAssociate = data.teacher.associate;
    }
  }

  editTeacher: Teacher | undefined;
  checkedAssociate: Boolean = false;
  registeredForm!: FormGroup;

  ngOnInit() {
    this.reactivateForm();
  }

  reactivateForm() {
    if (this.editTeacher === undefined) {
      this.registeredForm = this.formBuilder.group({
        id: ['0'],
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]],
        yearsOfTeaching: ['', [Validators.required, this.yrOfTeachingNumberValidator()]],
        salary: ['', [Validators.required, this.salaryNumberValidator()]],
        associate: [''],
      });
    } else {
      this.registeredForm = this.formBuilder.group({
        id: [this.editTeacher?.id],
        name: [this.editTeacher?.name, [Validators.required, Validators.minLength(3)]],
        surname: [this.editTeacher?.surname, [Validators.required, Validators.minLength(3)]],
        yearsOfTeaching: [this.editTeacher?.yearsOfTeaching, [Validators.required, this.yrOfTeachingNumberValidator()]],
        salary: [this.editTeacher?.salary, [Validators.required, this.salaryNumberValidator()]],
        associate: [this.editTeacher?.associate],
      });
    }
  }

  salaryNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ageNumberRgx = /^\d+$/;
      const validated = ageNumberRgx.test(control.value);
      return validated ? null : { validatedSalary: { value: control.value } };
    };
  }

  yrOfTeachingNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ageNumberRgx = /^\d+$/;
      const validated = ageNumberRgx.test(control.value);
      return validated ? null : { validatedYrOfTeaching: { value: control.value } };
    };
  }

  errorHandling(control: string, error: string) {
    return this.registeredForm.controls[control].hasError(error);
  }

  onSubmit(newEntry: boolean) {
    var name = this.registeredForm.controls['name'].value.trim();
    var surname = this.registeredForm.controls['surname'].value.trim();
    var yearsOfTeaching = this.registeredForm.controls['yearsOfTeaching'].value;
    var salary = Number(this.registeredForm.controls['salary'].value);
    var associate = this.registeredForm.controls['associate'].value != '' ? this.registeredForm.controls['associate'].value : false;

    if (newEntry) {
      this.teacherService.addTeacher({ name, surname, yearsOfTeaching, salary, associate } as Teacher).subscribe();
    }
    else {
      var id = Number(this.registeredForm.controls['id'].value);
      this.teacherService.updateTeacher({ id, name, surname, yearsOfTeaching, salary, associate } as Teacher).subscribe();
    }
    this.dialogRef.close();
  };
}
