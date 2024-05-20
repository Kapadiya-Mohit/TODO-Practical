import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialougComponent } from 'src/app/shared/components/confirmation-dialoug/confirmation-dialoug.component';
import { User } from 'src/app/shared/modal/user.modal';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'action'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  users: User[] = [];
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  /**
   *
   * For get user's data
   * @memberof UserListComponent
   */
  getUsersData(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        if (users) {
          this.isLoading = false;
          users.map((user) => {
            user.dueDate =
              typeof user.dueDate === 'string'
                ? user.dueDate
                : user.dueDate.toDate();
          });
          this.dataSource = new MatTableDataSource(users);
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

  /**
   *
   * Redirect to edit user
   * @param {User} user
   * @memberof UserListComponent
   */
  goToEditUser(user: User): void {
    this.router.navigate(['/add', user.id]);
  }

  /**
   *
   * Filter user based on title, description and dueDate
   * @param {Event} event
   * @memberof UserListComponent
   */
  searchUserData(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Delete user if user confirm yes
   *
   * @param {User} user
   * @memberof UserListComponent
   */
  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialougComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (user && user.id) {
          this.isLoading = true;
          this.userService.deleteUser(user.id).subscribe({
            next: () => {
              this.isLoading = false;
              this.toast.success('User deleted successfully!', 'Success', {
                timeOut: 1000,
              });
            },
            error: (err) => console.log(err),
          });
        }
      }
    });
  }
}
