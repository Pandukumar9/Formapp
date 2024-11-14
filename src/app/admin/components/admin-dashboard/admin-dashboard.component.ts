import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private dialog: MatDialog, private admin:AdminService) { }
  ngOnInit(): void {
     this.admin.getFruits().subscribe(res => {
      console.log(res);
     })
  }

  addItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '400px'  // Optional: You can set the dialog size
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform any actions after form submission (e.g., refresh item list)
        console.log('Item added successfully');
      }
    });
  }
}
