import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from 'src/app/core/services/teacher-service/teacher.service';
import { Teacher } from 'src/app/core/models/teacher';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {

  displayedColumns: string[] = ['name', 'surname', 'yearsOfTeaching', 'salary', 'associate', 'edit-action', 'delete-action'];
  dataSource!: MatTableDataSource<Teacher>;
  teacher: Teacher | undefined;
  constructor(private service: TeacherService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.service.getTeachers().subscribe(teachers => { this.dataSource = new MatTableDataSource(teachers) });
  }

  openAddDialog(): void {
    this.dialog.open(TeacherFormComponent)
      .afterClosed().subscribe(() => this.getTeachers());
  }

  openEditDialog(selectedTeacher: Teacher): void {
    this.dialog.open(TeacherFormComponent, { data: { teacher: selectedTeacher } })
      .afterClosed().subscribe(() => this.getTeachers());
  }

  deleteTeacher(teacher: Teacher) {
    this.dataSource.data = this.dataSource.data.filter(t => t !== teacher);
    this.service.deleteTeacher(teacher.id).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
