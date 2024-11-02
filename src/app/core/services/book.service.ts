import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private _http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this._http.get<Book[]>("/api/get-all-books");
  }

  getBook(id: string): Observable<any> {
    return this._http.get<Book>(`/api/get-book/${id}`).pipe(map(book => ({
      ...book,
      borrowed: book.borrowed === 1 ? true : book.borrowed === 0 ? false : book.borrowed
    })));
  }

  deleteBook(id: string): Observable<any> {
    return this._http.delete(`/api/delete-book/${id}`);
  }

  addBook(book: any): Observable<any> {
    return this._http.post("/api/add-book", book);
  }

  borrowBook(id: string): Observable<any> {
    return this._http.put(`/api/borrow-book/${id}`, null);
  }

  returnBook(id: string): Observable<any> {
    return this._http.put(`/api/return-book/${id}`, null);
  }
}
