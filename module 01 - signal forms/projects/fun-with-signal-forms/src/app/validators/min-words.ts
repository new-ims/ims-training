import { LogicFn, SchemaPath, validate } from '@angular/forms/signals';

export function minWords(path: SchemaPath<string>, min: number | LogicFn<string, number>) {
  validate(path, (ctx) => {
    const val = ctx.value();
    const threshold = typeof min === 'function' ? min(ctx) : min;

    // count the number of words where empty strings are ignored
    const wordCount = val
      .trim()
      .split(/\s+/)
      .filter((word) => word.trim().length > 0).length;
    if (wordCount < threshold) {
      return {
        kind: 'min-words',
        message: `Description must have at least ${threshold} words but has ${wordCount}`,
      };
    }
    return null;
  });
}
