import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="book-card">
      <img [src]="book.cover" alt="{{ book.title }}" class="cover" />
      <div>
        <h3>{{ book.title }}</h3>
        <p>👤 {{ book.author }}</p>
        <p>⭐ {{ book.rating }}</p>
        <p>🏷️ {{ book.category }}</p>
      </div>
    </div>
  `,
  styles: [`
    .book-card {
      width: 180px;
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
    }

    .cover {
      width: 100%;
      height: auto;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
  `]
})
export class BookCardComponent {
  @Input() book!: Book;
}
