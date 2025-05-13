import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { BookFormComponent } from './components/book-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-new-book', component: BookFormComponent },
     { path: 'edit-book/:id', component: BookFormComponent } //edit route
];
