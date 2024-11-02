import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { BookService } from './core/services/book.service';
import { Book } from './core/models/book';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  displayedColumns: string[] = ['position', 'title', 'author', 'state', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private _bookService: BookService) {}

  ngOnInit(): void {
    const subBooks = this._bookService.getAllBooks().subscribe({
      next: books => {
        this.dataSource = books;
      },
      error: error => console.error('Error fetching books:', error) 
    });
    this.subs.push(subBooks);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
