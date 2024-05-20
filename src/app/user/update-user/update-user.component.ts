import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/modal/user.modal';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.route.params.subscribe((res) => {
      if (res['id']) {
        this.userId = res['id'];
        this.userService.getUserById(this.userId).subscribe({
          next: (user) => {
            if (user) {
              this.patchUserValue(user);
            }
          },
        });
      }
    });
  }

  /**
   *
   * Initialization of user form
   * @memberof UpdateUserComponent
   */
  initUserForm(): void {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null, Validators.required],
    });
  }

  /**
   * Patch user form value
   * @param {User} user
   * @memberof UpdateUserComponent
   */
  patchUserValue(user: User): void {
    new Date(user.dueDate.seconds);
    this.userForm.patchValue({
      title: user.title,
      description: user.description,
      dueDate:
        typeof user.dueDate === 'string'
          ? user.dueDate
          : new Date(user.dueDate.seconds * 1000).toISOString(),
    });
  }

  /**
   *
   * Return boolean value if any controller has error
   * @param {string} controlName
   * @param {string} errorName
   * @return {*}
   * @memberof UpdateUserComponent
   */
  hasError(controlName: string, errorName: string) {
    return this.userForm.get(controlName)?.hasError(errorName);
  }

  /**
   * Save and update user based on userId
   *
   * @return {*}  {void}
   * @memberof UpdateUserComponent
   */
  saveOrUpdateUser(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;
    this.isLoading = true;
    this.userId ? this.update() : this.save();
  }

  /**
   *
   * Save user
   * @memberof UpdateUserComponent
   */
  save(): void {
    this.userService.saveUser(this.userForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.success('User added successfully!', 'Success', {
          timeOut: 1000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.error(err);
      },
    });
  }

  /**
   * Update user
   *
   * @memberof UpdateUserComponent
   */
  update(): void {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.success('User updated successfully!', 'Success', {
          timeOut: 1000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.error(err);
      },
    });
  }
}
