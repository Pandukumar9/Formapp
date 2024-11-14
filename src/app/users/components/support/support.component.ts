import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  categories = ['Account Issues', 'Payment Problems', 'Technical Support', 'General Questions'];
  selectedCategory = '';
  filteredFaqs = this.getFaqs();

  supportRequest = {
    name: '',
    email: '',
    category: '',
    message: ''
  };

  faqs = [
    { id: 1, question: 'How do I reset my password?', answer: 'You can reset your password in the Account section.', category: 'Account Issues' },
    { id: 2, question: 'How can I update my payment information?', answer: 'Go to the Payments section to update information.', category: 'Payment Problems' },
    { id: 3, question: 'How do I report a technical issue?', answer: 'Use the support form and select Technical Support.', category: 'Technical Support' },
    { id: 4, question: 'How do I contact support?', answer: 'Use the contact form below.', category: 'General Questions' }
  ];

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filteredFaqs = this.getFaqs();
  }

  getFaqs() {
    if (!this.selectedCategory) return this.faqs;
    return this.faqs.filter(faq => faq.category === this.selectedCategory);
  }

  submitSupportRequest() {
    console.log('Support request submitted:', this.supportRequest);
    alert('Your support request has been submitted.');
    // Reset form
    this.supportRequest = {
      name: '',
      email: '',
      category: '',
      message: ''
    };
  }
}
