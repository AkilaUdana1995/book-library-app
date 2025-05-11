import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../models/book.model';

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
    if (confirm(`Are you sure you want to delete "${this.book.title}"?`)) {
      this.delete.emit(this.book.id!);
    }
  }
}
