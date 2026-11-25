import { Component, signal } from '@angular/core';
import { EMPTY_PRCESS } from './models/process.model';
import {
  apply,
  applyEach,
  disabled,
  form,
  FormField,
  hidden,
  max,
  min,
  minLength,
  readonly,
  required,
  validate,
  validateTree,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { minWords } from './validators/min-words';
import { claimSchema } from './validators/claim.schema';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormField],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly data = signal(EMPTY_PRCESS);

  readonly processForm = form(this.data, (path) => {
    required(path.clerk, { message: 'Clerk is required' });
    required(path.key, {
      message: 'Key is required',
      when: (ctx) => ctx.valueOf(path.type) === 'holiday',
    });
    minLength(path.key, (ctx) => (ctx.valueOf(path.type) === 'holiday' ? 5 : 10), {
      message: (ctx) =>
        `Key must be at least ${ctx.valueOf(path.type) === 'holiday' ? 5 : 10} characters long`,
    });

    hidden(path.clerk, {
      when: (ctx) => ctx.stateOf(path.key).invalid(),
    });

    minWords(path.description, (ctx) => (ctx.valueOf(path.type) === 'holiday' ? 10 : 8));
    minWords(path.summary, 5);

    apply(path.primaryClaim, claimSchema);
    apply(path.secondaryClaim, claimSchema);
    applyEach(path.history, claimSchema);
  });

  constructor() {}
}
