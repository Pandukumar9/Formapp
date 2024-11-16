import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  users: User[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private admin: AdminService,private fb: FormBuilder, private auth:AuthService) {}

  ngOnInit(): void {
    // Fetch fruits
    this.subscriptions.add(
      this.admin.getFruits().subscribe({
        next: (res) => {
          console.log('Fruits:', res);
        },
        error: (err) => console.error('Error fetching fruits:', err)
      })
    );

    // Fetch users
    this.getUsersData()

    this.fetchUsers();
    this.initForm();

    this.user = this.auth.getLoggedInUser();
  }
  user: any;

  addItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Item added successfully');
        // Refresh the users list if needed
        this.fetchUsers();
      }
    });
  }

  // Method to fetch users again (if needed)
  fetchUsers(): void {
    this.admin.getusers().subscribe({
      next: (res) => {
        console.log('Updated Users:', res);
        this.users = res;
      },
      error: (err) => console.error('Error refreshing users:', err)
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }


  // users: User[] = [];
  userForm!: FormGroup;
  dialogTitle: string = '';
  selectedUser: User | null = null;

  // fetchUsers(): void {
  //   this.admin.getUsers().subscribe({
  //     next: (res) => {
  //       this.users = res;
  //     },
  //     error: (err) => console.error('Error fetching users:', err)
  //   });
  // }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      role: ['']
    });
  }

  // openAddDialog(): void {
  //   this.dialogTitle = 'Add User';
  //   this.userForm.reset();
  //   this.dialog.open(this.userDialog);
  // }

  openEditDialog(user: User): void {
    this.dialogTitle = 'Edit User';
    this.selectedUser = user;
    this.userForm.patchValue(user);
    this.dialog.open(this.userDialog);
  }
  @ViewChild('userDialog') userDialog!: TemplateRef<any>; // Reference the dialog template
  openViewDialog(user: User): void {
    this.dialogTitle = 'View User';
    this.userForm.patchValue(user);
    this.dialog.open(this.userDialog);
  }

  saveUser(){
    const userData = this.userForm.value;
    if (this.selectedUser) {
      // Update existing user
      this.admin.updateUser(userData,this.userForm.value.id.toString()).subscribe(res => {
        console.log(res,'ress');
        this.closeDialog();
        this.getUsersData();
        // this.api.userdata.next(res);
       })
    }


  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.admin.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully.');
          this.getUsersData(); // Refresh the user list after successful deletion
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('An error occurred while deleting the user. Please try again.');
        }
      });
    }
  }


  closeDialog(): void {
    this.dialog.closeAll();
  }

  getUsersData(){
    this.subscriptions.add(
      this.admin.getusers().subscribe({
        next: (res) => {
          console.log('Users:', res);
          this.users = res;
        },
        error: (err) => console.error('Error fetching users:', err)
      })
    );
  }

}

