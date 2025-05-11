import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../models/book.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  @Output() add = new EventEmitter<Book>();

  book: Book = {
    title: '',
    author: '',
    rating: 1,
    category: '',
    cover: ''
  };

  constructor(private router: Router) {}

  submitForm() {
    if (
      this.book.title &&
      this.book.author &&
      this.book.rating &&
      this.book.category &&
      this.book.cover
    ) {
      this.add.emit({ ...this.book });
      this.resetForm();
      this.router.navigate(['/']); // Redirect back to home after adding
    }
  }

  resetForm() {
    this.book = {
      title: '',
      author: '',
      rating: 1,
      category: '',
      cover: ''
    };
  }
}
