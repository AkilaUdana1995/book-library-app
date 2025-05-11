import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
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

      <div [ngClass]="{ 'book-list-grid': isGridView, 'book-list-list': !isGridView }" *ngIf="filteredBooks.length">
        <div *ngFor="let book of filteredBooks" class="book-card">
          <img [src]="book.cover" alt="{{ book.title }}" class="cover" />
          <div>
            <h3>{{ book.title }}</h3>
            <p>👤 {{ book.author }}</p>
            <p>⭐ {{ book.rating }}</p>
            <p>🏷️ {{ book.category }}</p>
          </div>
        </div>
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

    .book-card {
      width: 180px;
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
    }

    .book-list-list .book-card {
      display: flex;
      gap: 1rem;
      width: 100%;
    }

    .cover {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .book-list-list .cover {
      width: 100px;
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
}
