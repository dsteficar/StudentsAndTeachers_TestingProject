import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolClassService } from 'src/app/core/services/schoool-class-service/school-class.service';
import { SchoolClass } from 'src/app/core/models/school-class';
import { SchoolClassFormComponent } from '../school-class-form/school-class-form.component';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.scss']
})
export class SchoolClassesComponent {

  displayedColumns: string[] = ['name', 'studentCapacity', 'online', 'edit-action', 'delete-action'];
  dataSource!: MatTableDataSource<SchoolClass>;
  schoolClass: SchoolClass | undefined;
  constructor(private service: SchoolClassService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSchoolClasses();
  }

  getSchoolClasses(): void {
    this.service.getSchoolClasses().subscribe(schoolClasses => { this.dataSource = new MatTableDataSource(schoolClasses) });
  }

  openAddDialog(): void {
    this.dialog.open(SchoolClassFormComponent)
      .afterClosed().subscribe(() => this.getSchoolClasses());
  }

  openEditDialog(selectedSchoolClass: SchoolClass): void {
    this.dialog.open(SchoolClassFormComponent, { data: { schoolClass: selectedSchoolClass } })
      .afterClosed().subscribe(() => this.getSchoolClasses());
  }

  deleteSchoolClass(schoolClass: SchoolClass) {
    this.dataSource.data = this.dataSource.data.filter(sc => sc !== schoolClass);
    this.service.deleteSchoolClass(schoolClass.id).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
