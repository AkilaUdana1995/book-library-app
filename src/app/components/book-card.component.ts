import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book!: Book;
}
