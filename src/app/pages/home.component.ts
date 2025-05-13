import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header.component';
import { BookCardComponent } from '../components/book-card.component';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, BookCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  isGridView: boolean = true;
  error: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data;
      },
      error: () => this.error = 'Failed to load books'
    });
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm) ||
      book.author.toLowerCase().includes(this.searchTerm)
    );
  }

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  addBook(newBook: Book) {
    this.bookService.addBook(newBook).subscribe({
      next: (addedBook) => {
        this.books.push(addedBook);
        this.filteredBooks = [...this.books];
      },
      error: () => {
        this.error = 'Failed to add book';
      }
    });
  }

  deleteBook(id: string) {
  this.bookService.deleteBook(id).subscribe({
    next: () => {
      this.books = this.books.filter(book => book.id !== id);
      this.filteredBooks = this.filteredBooks.filter(book => book.id !== id);
      Swal.fire('Deleted!', 'The book has been removed.', 'success'); //just 1 alert
    },
    error: () => {
      Swal.fire('Error', 'Failed to delete book.', 'error');
    }
  });
}


}
