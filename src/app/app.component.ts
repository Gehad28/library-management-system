import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BookService } from './core/services/book.service';
import { Book } from './core/models/book';
import { Subscription } from 'rxjs';
import { AddBookComponent } from './components/add-book/add-book.component';

// Angular Material
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatIconModule,
    MatPaginator, MatPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  subs: Subscription[] = [];
  displayedColumns: string[] = ['position', 'title', 'author', 'state', 'action', 'delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _bookService: BookService,
    private _matDialog: MatDialog
  ) {}

  getBooks() {
    const subBooks = this._bookService.getAllBooks().subscribe({
      next: books => {
        this.dataSource = new MatTableDataSource(books.reverse());
        this.dataSource.paginator = this.paginator;
      },
      error: error => console.error('Error fetching books:', error) 
    });
    this.subs.push(subBooks);
  }

  getBook(id: string, book: Book) {
    const sub = this._bookService.getBook(id).subscribe({
      next: b => {
        book = b;
      },
      error: error => console.error('Error fetching books:', error) 
    });
    this.subs.push(sub);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.paginator) {
      this.dataSource.paginator?.firstPage();
    }
  }

  addBook() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "50%";
    matDialogConfig.height = "50%";
    const dialogRef = this._matDialog.open(AddBookComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (book) => {
        this._bookService.addBook(book).subscribe({
          next: (res) => {
            const data = [ ...this.dataSource.data.reverse(), {...book, isbn:res.isbn, borrowed: false}];
            this.dataSource.data = data.reverse();
          }
        });
      }
    });
  }

  handleBorrowing(event: MouseEvent, book: Book) {
    const button = event.target as HTMLButtonElement;
    const buttonText = button.innerHTML.trim();
    let sub;
    if (buttonText === "Return") {
      sub = this._bookService.returnBook(book.isbn).subscribe({
        next: () => book.borrowed = false
      });
    } else {
      sub = this._bookService.borrowBook(book.isbn).subscribe({
        next: () => book.borrowed = true
      });
    }
    this.subs.push(sub);
  }

  deleteBook(book: Book) {
    const sub = this._bookService.deleteBook(book.isbn).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((b: Book) => b.isbn != book.isbn);
      }
    });
    this.subs.push(sub);
  }
}
