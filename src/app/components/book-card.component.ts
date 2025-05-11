import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../models/book.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() delete = new EventEmitter<string>(); // emits book ID

  confirmDelete() {
    Swal.fire({
      title: 'Delete this book?',
      text: `Are you sure you want to delete "${this.book.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(result => {
      if (result.isConfirmed) {
        this.delete.emit(this.book.id!);  // ✅ delegate actual deletion to parent
      }
    });
  }
}
