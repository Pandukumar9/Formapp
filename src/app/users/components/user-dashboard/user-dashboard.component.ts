import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  imurl: string = "../../../../assets/images/dhoni.jpeg";
  isCalled: boolean = false;
  iswCalled: boolean = false;
  saved() {
    if (!this.isCalled) {
      this.isCalled = true;
      console.log("called one time");
    }
  }

  uploadIconUrl: string = "../../../../assets/images/dhoni.jpeg";
  isUploadDisabled: boolean = false;
  errorMessage: string | null = null;

  onUploadClick(fileInput: HTMLInputElement) {
    // Reset any previous errors and disable further clicks
    this.errorMessage = null;
    this.isUploadDisabled = true;

    // Trigger file input click event
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    // File validations
    if (!file) {
      this.errorMessage = "Please select a file.";
      this.isUploadDisabled = false;
      return;
    }

    // 1. Validate file size (max 5MB)
    const maxSizeInMB = 5;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      this.errorMessage = "File size should not exceed 5MB.";
      this.isUploadDisabled = false;
      return;
    }

    // 2. Validate file extension
    if (file.type !== "text/xml" && file.name.split('.').pop()?.toLowerCase() !== 'xml') {
      this.errorMessage = "Only XML files are allowed.";
      this.isUploadDisabled = false;
      return;
    }

    // 3. Ensure it's a single file upload
    if (fileInput.files?.length !== 1) {
      this.errorMessage = "Only a single file can be uploaded.";
      this.isUploadDisabled = false;
      return;
    }

    // If all validations pass, proceed with the upload
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    // Simulate file upload and reset the disable state after uploading
    console.log("Uploading file:", file.name);

    // Mock async file upload process
    setTimeout(() => {
      console.log("File upload successful!");
      // Reset the disable state after upload completes
      this.isUploadDisabled = false;
    }, 3000);  // Mock upload delay
  }


}
