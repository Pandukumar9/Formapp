import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  itemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddItemComponent>,  // Inject dialog reference
    private service: AdminService
  ) { }

  ngOnInit(): void {
    // Initialize the form
    this.itemForm = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      pricePerKg: [null, [Validators.required, Validators.min(1)]],
      availableQuantity: [null, [Validators.required, Validators.min(1)]],
      comments: ['fruit', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      const item = {
        category: formData.category,
        name: formData.name,
        pricePerKg: formData.pricePerKg,
        availableQuantity: formData.availableQuantity,
        comments: formData.comments
      };

      if (item.category === 'fruit') {
        this.service.addFruit(item).subscribe(() => {
          this.dialogRef.close(true);  // Close dialog and return success
        });
      } else {
        this.service.addVegetable(item).subscribe(() => {
          this.dialogRef.close(true);  // Close dialog and return success
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();  // Close dialog without doing anything
  }
}
