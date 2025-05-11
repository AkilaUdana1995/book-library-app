import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header.component';
import { BookCardComponent } from '../components/book-card.component';
import { BookFormComponent } from '../components/book-form.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, BookCardComponent,RouterModule],
  template: `
    <div class="container">
      <app-header
        [searchTerm]="searchTerm"
        (search)="onSearch($event)"
        [isGridView]="isGridView"
        (viewToggled)="toggleView()"
      ></app-header>

      
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="!filteredBooks.length && !error">No books found.</div>

      <a [routerLink]="['/add-new-book']" class="add-button">➕ Add New Book</a>

      <div [ngClass]="{ 'book-list-grid': isGridView, 'book-list-list': !isGridView }" *ngIf="filteredBooks.length">
        <app-book-card
          *ngFor="let book of filteredBooks"
          [book]="book"
        ></app-book-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }

    .book-list-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .book-list-list {
      display: block;
    }

    .add-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 1rem;
}


    .error {
      color: red;
    }
  `]
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
}
