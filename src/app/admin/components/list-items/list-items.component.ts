import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {
  fruits: any[] = [];
  vegetables: any[] = [];

  constructor(private service: AdminService,private dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch fruits and vegetables on component initialization
    this.service.getFruits().subscribe(data => this.fruits = data);
    this.service.getVegetables().subscribe(data => this.vegetables = data);
  }

  // Delete a fruit
  deleteFruit(id: number): void {
    this.service.deleteFruit(id).subscribe(() => {
      this.fruits = this.fruits.filter(fruit => fruit.id !== id);
    });
  }

  // Delete a vegetable
  deleteVegetable(id: number): void {
    this.service.deleteVegetable(id).subscribe(() => {
      this.vegetables = this.vegetables.filter(veg => veg.id !== id);
    });
  }

  editData(item:any){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '400px',  // Optional: You can set the dialog size,
      data: {
        fruit: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform any actions after form submission (e.g., refresh item list)
        console.log('Item edited successfully');
      }
    });
  }
  
  viewData(item:any){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '400px',  // Optional: You can set the dialog size,
      data: {
        fruit: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform any actions after form submission (e.g., refresh item list)
        console.log('Item added successfully');
      }
    });
  }

}
