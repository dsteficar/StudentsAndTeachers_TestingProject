import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/core/services/student-service/student.service';
import { Student } from 'src/app/core/models/student';
import { SchoolClass } from 'src/app/core/models/school-class';
import { SchoolClassService } from 'src/app/core/services/schoool-class-service/school-class.service';
import { StudentFormComponent } from '../student-form/student-form/student-form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  displayedColumns: string[] = ['name', 'surname', 'address', 'age', 'email', 'schoolClass', 'edit-action', 'delete-action'];
  dataSource!: MatTableDataSource<Student>;
  student: Student | undefined;
  schoolClass: SchoolClass | undefined
  constructor(private studentService: StudentService, private schoolClassService: SchoolClassService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students =>
      students.forEach(student => {
        this.schoolClassService.getSchoolClass(student.schoolClassId).subscribe(schoolClass => {
          student.schoolClassName = schoolClass.name;
        });
        this.dataSource = new MatTableDataSource(students);
      }));
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(StudentFormComponent).afterClosed().subscribe(() => this.getStudents());
  }

  openEditDialog(selectedStudent: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, { data: { student: selectedStudent } }).afterClosed().subscribe(() => this.getStudents());
  }

  deleteStudent(student: Student) {
    this.dataSource.data = this.dataSource.data.filter(st => st !== student);
    this.studentService.deleteStudent(student.id).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
