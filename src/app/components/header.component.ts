import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() searchTerm: string = '';
  @Input() isGridView: boolean = true;

  @Output() search = new EventEmitter<string>();
  @Output() viewToggled = new EventEmitter<void>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }

  toggleView() {
    this.viewToggled.emit();
  }
}
