import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/core/models/student';
import { StudentTeacher } from 'src/app/core/models/student-teacher';
import { Teacher } from 'src/app/core/models/teacher';
import { StudentService } from 'src/app/core/services/student-service/student.service';
import { StudentTeacherService } from 'src/app/core/services/student-teacher-service/student-teacher.service';
import { TeacherService } from 'src/app/core/services/teacher-service/teacher.service';


@Component({
  selector: 'app-student-teacher-form',
  templateUrl: './student-teacher-form.component.html',
  styleUrls: ['./student-teacher-form.component.scss']
})
export class StudentTeacherFormComponent implements OnInit {
  constructor(private studentTeacherService: StudentTeacherService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StudentTeacherFormComponent>,) { }


  students: Student[] = []
  teachers: Teacher[] = [];
  registeredForm!: FormGroup;


  ngOnInit() {
    this.getStudents();
    this.getTeachers();
    this.reactivateForm();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }
  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers);
  }

  reactivateForm() {
    this.registeredForm = this.formBuilder.group({
      studentId: [1],
      teacherId: [1],
    });
  }

  onSubmit() {
    var studentId = Number(this.registeredForm.controls['studentId'].value);
    var teacherId = Number(this.registeredForm.controls['teacherId'].value);

    this.studentTeacherService.addStudentTeacher({ studentId, teacherId } as StudentTeacher).subscribe();
    this.dialogRef.close();
  };
}
