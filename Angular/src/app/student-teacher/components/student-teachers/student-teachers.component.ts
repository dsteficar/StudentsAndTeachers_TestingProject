import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentTeacherService } from 'src/app/core/services/student-teacher-service/student-teacher.service';
import { StudentTeacher } from 'src/app/core/models/student-teacher';
import { StudentService } from 'src/app/core/services/student-service/student.service';
import { TeacherService } from 'src/app/core/services/teacher-service/teacher.service';
import { StudentTeacherFormComponent } from '../student-teacher-form/student-teacher-form.component';

@Component({
  selector: 'app-student-teachers',
  templateUrl: './student-teachers.component.html',
  styleUrls: ['./student-teachers.component.scss']
})
export class StudentTeachersComponent {
  displayedColumns: string[] = ['studentFullName','teacherFullName','delete-action'];
  dataSource!: MatTableDataSource<StudentTeacher>;
  teacher: StudentTeacher | undefined;
  constructor(private studentTeacherService: StudentTeacherService,private studentService: StudentService, private teacherService: TeacherService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getStudentTeachers();
  }
  
  getStudentTeachers(): void{
    this.studentTeacherService.getStudentTeachers().subscribe(studentTeachers=> {
      studentTeachers.forEach(studentTeacher => {
        this.studentService.getStudent(studentTeacher.studentId).subscribe(student =>{
          studentTeacher.studentFullName = student.name + " " + student.surname;
      });
        this.teacherService.getTeacher(studentTeacher.teacherId).subscribe(teacher =>{
            studentTeacher.teacherFullName = teacher.name + " " + teacher.surname;
        });
                
      });
      this.dataSource = new MatTableDataSource(studentTeachers)});
  }

  openAddDialog(): void{
    const dialogRef = this.dialog.open(StudentTeacherFormComponent).afterClosed().subscribe(result => this.getStudentTeachers());
  }

  deleteStudentTeacher(studentTeacher: StudentTeacher){
    this.dataSource.data = this.dataSource.data.filter(st=> st !== studentTeacher);
    this.studentTeacherService.deleteStudentTeacher(studentTeacher.studentId,studentTeacher.teacherId).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
