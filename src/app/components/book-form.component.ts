import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  @Output() add = new EventEmitter<Book>();

  book: Book = {
    title: '',
    author: '',
    rating: 1,
    category: '',
    cover: ''
  };

  editMode: boolean = false;
  bookId: string | null = null;
  bookLoaded: boolean = false;

  constructor(
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.bookId = idParam;

      this.bookService.getBookById(this.bookId).subscribe({
        next: (book) => {
          this.book = { ...book };
          this.bookLoaded = true;
        },
        error: () => {
          alert('Failed to load book details.');
          this.router.navigate(['/']);
        }
      });
    } else {
      this.bookLoaded = true; // for add mode
    }
  }

  submitForm() {
    if (
      this.book.title &&
      this.book.author &&
      this.book.rating &&
      this.book.category &&
      this.book.cover
    ) {
      const request = this.editMode && this.bookId !== null
        ? this.bookService.updateBook(this.bookId, this.book)
        : this.bookService.addBook(this.book);

      request.subscribe({
        next: () => {
          if (this.editMode) {
            Swal.fire({
              icon: 'success',
              title: 'Book Updated!',
              text: `"${this.book.title}" has been successfully updated.`,
              confirmButtonColor: '#3085d6'
            }).then(() => {
              this.router.navigate(['/']);
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Book Added!',
              text: `"${this.book.title}" has been successfully added.`,
              confirmButtonColor: '#3085d6'
            }).then(() => {
              this.router.navigate(['/']);
            });
          }
        },
        error: () => {
          alert(this.editMode ? 'Failed to update book.' : 'Failed to add book.');
        }
      });
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
