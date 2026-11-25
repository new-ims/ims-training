import { Component, signal } from '@angular/core';
import { EMPTY_PRCESS } from './models/process.model';
import { form, FormField, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly data = signal(EMPTY_PRCESS);

  readonly processForm = form(this.data, path => {
    required(path.clerk, {message: 'Clerk is required'});
    required(path.key, {message: 'Key is required'});
  });

  constructor() {

  }
}
