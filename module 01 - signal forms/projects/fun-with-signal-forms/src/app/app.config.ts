import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSignalFormsConfig({
      classes: {
        'invalid': ctx => ctx.state().touched() && ctx.state().invalid(), 
        'hidden': ctx => ctx.state().hidden()
      }
    })
  ]
};
