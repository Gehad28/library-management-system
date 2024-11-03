import { Component, OnDestroy } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import { Subscription } from 'rxjs';
import { Book } from '../../core/models/book';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent implements OnDestroy{
  title = {
    text: '',
    valid: true
  };
  author = {
    text: '',
    valid: true
  };
  subs: Subscription[] = [];
  errorMessage = '';

  constructor(
    private _dialogRef: MatDialogRef<AddBookComponent>,
    private _bookService: BookService
  ) {}

  onSubmit() {
    if(!this.title.text) {
      this.title.valid = false;
      console.log(this.title.valid)
    }
    if(!this.author.text) {
      this.author.valid = false;
    }
    if (this.title.text && this.author.text) {
      this.title.valid = true;
      this.author.valid = true;
      const book = {
        title: this.title.text,
        author: this.author.text
      };
      this._dialogRef.close(book);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
