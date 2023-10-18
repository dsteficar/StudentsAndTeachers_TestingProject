import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from 'src/app/core/services/student-service/student.service';
import { SchoolClassService } from 'src/app/core/services/schoool-class-service/school-class.service';
import { Student } from 'src/app/core/models/student';
import { SchoolClass } from 'src/app/core/models/school-class';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { _MatTabGroupBase } from '@angular/material/tabs';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  constructor(private studentService: StudentService,
    public formBuilder: FormBuilder,
    private schoolClassService: SchoolClassService,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { student: Student }) {
    if (data != undefined) {
      this.editStudent = data.student;
    }
  }

  editStudent: Student | undefined;
  schoolClasses: SchoolClass[] = [];
  registeredForm!: FormGroup;


  ngOnInit() {
    this.getSchoolClasses();
    this.reactivateForm();
  }

  getSchoolClasses(): void {
    this.schoolClassService.getSchoolClasses().subscribe(schoolClasses => this.schoolClasses = schoolClasses);
  }

  reactivateForm() {
    if (this.editStudent === undefined) {
      this.registeredForm = this.formBuilder.group({
        id: ['0'],
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]],
        address: ['', [Validators.required]],
        age: ['', [Validators.required, this.ageNumberValidator()]],
        email: [''],
        schoolClass: [1],
      });
    } else {
      this.registeredForm = this.formBuilder.group({
        id: [this.editStudent?.id],
        name: [this.editStudent?.name, [Validators.required, Validators.minLength(3)]],
        surname: [this.editStudent?.surname, [Validators.required, Validators.minLength(3)]],
        address: [this.editStudent?.address, [Validators.required]],
        age: [this.editStudent?.age, [Validators.required, this.ageNumberValidator()]],
        email: [this.editStudent?.email],
        schoolClass: [this.editStudent?.schoolClassId],
      });
    }
  }

  ageNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const ageNumberRgx = /^\d+$/;
      const validated = ageNumberRgx.test(control.value);
      return validated ? null : { validatedAge: { value: control.value } };
    };
  }

  errorHandling(control: string, error: string) {
    return this.registeredForm.controls[control].hasError(error);
  }

  onSubmit(newEntry: boolean) {
    var name = this.registeredForm.controls['name'].value.trim();
    var surname = this.registeredForm.controls['surname'].value.trim();
    var address = this.registeredForm.controls['address'].value.trim();
    var age = Number(this.registeredForm.controls['age'].value.trim());
    var email = this.registeredForm.controls['email'].value.trim();
    var schoolClassId = Number(this.registeredForm.controls['schoolClass'].value);

    if (newEntry) {
      this.studentService.addStudent({ name, surname, address, age, email, schoolClassId } as Student).subscribe();
    }
    else {
      var id = Number(this.registeredForm.controls['id'].value);
      this.studentService.updateStudent({ id, name, surname, address, age, email, schoolClassId } as Student).subscribe();
    }
    this.dialogRef.close();
  };
}
