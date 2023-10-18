import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { User } from '../../../core/models/user';
import { UserFormComponent } from '../user-form/user-form/user-form.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'number', 'dateOfBirth', 'edit-action', 'delete-action'];
  dataSource!: MatTableDataSource<User>;
  user: User | undefined;
  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.service.getUsers().subscribe(users => { this.dataSource = new MatTableDataSource(users) });
  }

  openAddDialog(): void {
    this.dialog.open(UserFormComponent).afterClosed().subscribe(result => this.getUsers());
  }

  openEditDialog(selectedUser: User): void {
    this.dialog.open(UserFormComponent, { data: { user: selectedUser } }).afterClosed().subscribe(result => this.getUsers());
  }

  delete(user: User) {
    this.dataSource.data = this.dataSource.data.filter(u => u !== user);
    this.service.deleteUser(user.id).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
