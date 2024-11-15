import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  users: User[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog, private admin: AdminService) {}

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
}
