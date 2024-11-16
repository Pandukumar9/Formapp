import { Component, Inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    private service: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject the data passed from the parent
  ) { }
  isViewMode: boolean = false;
  ngOnInit() {
    console.log(this.data,'padnu');
    // Initialize the form
    this.itemForm = this.fb.group({
      category: [this.data.fruit.category? this.data.fruit.category : '', Validators.required],
      name: [this.data.fruit.name? this.data.fruit.name : '', Validators.required],
      pricePerKg: [this.data.fruit.pricePerKg? this.data.fruit.pricePerKg : null, [Validators.required, Validators.min(1)]],
      availableQuantity: [this.data.fruit.availableQuantity? this.data.fruit.availableQuantity : null, [Validators.required, Validators.min(1)]],
      comments: [this.data.fruit.comments? this.data.fruit.comments : '', Validators.required]
    });

    // If in view mode, disable all form fields
    if (this.data?.mode === 'view') {
      this.isViewMode = true;
      this.itemForm.disable();
    }
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

    // this.isViewMode = false;
    // this.itemForm.enable(); // Enable all form fields for editing
  }

  onCancel(): void {
    this.dialogRef.close();  // Close dialog without doing anything
  }
}
