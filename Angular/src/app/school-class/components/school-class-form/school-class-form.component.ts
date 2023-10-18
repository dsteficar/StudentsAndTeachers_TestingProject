import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchoolClass } from 'src/app/core/models/school-class';
import { SchoolClassService } from 'src/app/core/services/schoool-class-service/school-class.service';

@Component({
  selector: 'app-school-class-form',
  templateUrl: './school-class-form.component.html',
  styleUrls: ['./school-class-form.component.scss']
})
export class SchoolClassFormComponent implements OnInit{
  constructor(private schoolClassService: SchoolClassService, 
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SchoolClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { schoolClass: SchoolClass}){
        if(data != undefined){
        this.editSchoolClass = data.schoolClass;
        this.checkedOnline= data.schoolClass.online;
      }
    }

  editSchoolClass: SchoolClass | undefined;
  checkedOnline: Boolean = false;
  registeredForm!: FormGroup;

  ngOnInit() {
    this.reactivateForm();
  }

  reactivateForm() {
    if (this.editSchoolClass === undefined) {
      this.registeredForm = this.formBuilder.group({
        id: ['0'],
        name: ['', [Validators.required, Validators.minLength(3)]],
        studentCapacity: ['', [Validators.required, this.capacityNumberValidator()]],
        online: [''],
      });
    } else {
      this.registeredForm = this.formBuilder.group({
        id: [this.editSchoolClass?.id],
        name: [this.editSchoolClass?.name, [Validators.required, Validators.minLength(3)]],
        studentCapacity: [this.editSchoolClass?.studentCapacity, [Validators.required, this.capacityNumberValidator()]],
        online: [this.editSchoolClass?.online],
      });
    }
  }

  capacityNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const capacityNumberRgx = /^\d+$/;
      const validated = capacityNumberRgx.test(control.value);
      return validated ? null : { validatedCapacity: { value: control.value } };
    };
  }

  errorHandling(control: string, error: string) {
    return this.registeredForm.controls[control].hasError(error);
  }

  onSubmit(newEntry: boolean) {
    var name = this.registeredForm.controls['name'].value.trim();
    var studentCapacity = Number(this.registeredForm.controls['studentCapacity'].value);
    var online = this.registeredForm.controls['online'].value != '' ? this.registeredForm.controls['online'].value : false;

    if (newEntry) {
      this.schoolClassService.addSchoolClass({ name, studentCapacity, online } as SchoolClass).subscribe();
    }
    else {
      var id = Number(this.registeredForm.controls['id'].value);
      this.schoolClassService.updateSchoolClass({ id,  name, studentCapacity, online  } as SchoolClass).subscribe();
    }
    this.dialogRef.close();
  };
}