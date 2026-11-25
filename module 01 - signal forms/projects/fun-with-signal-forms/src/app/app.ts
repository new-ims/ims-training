import { Component, signal } from '@angular/core';
import { EMPTY_PRCESS, SAMPLE_PROCESS } from './models/process.model';
import {
  apply,
  applyEach,
  disabled,
  form,
  FormField,
  FormRoot,
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
  imports: [JsonPipe, FormField, FormRoot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly data = signal(SAMPLE_PROCESS);

  readonly processForm = form(this.data, (path) => {
    disabled(path, {
      when: ctx => ctx.state.submitting()
    });

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
  }, {
    submission: {
      action: async (fieldTree) => {
        const val = fieldTree().value();
        console.log('Submitting', val);
        await new Promise(res => setTimeout(res, 5000));

        if (val.key === '1234567890') {
          return [
            {
              kind: 'key-already-taken', 
              message: 'The key is already taken', 
              fieldTree: fieldTree.key
            }
          ]
        }

        return null;
      },
      onInvalid: (fieldTree) => {
        console.log('Form is invalid');
        const errors = fieldTree().errorSummary();
        const firstError = errors[0];
        if (firstError) {
          firstError.fieldTree().focusBoundControl();
        }

      } 
    }
  });

  constructor() {}
}
