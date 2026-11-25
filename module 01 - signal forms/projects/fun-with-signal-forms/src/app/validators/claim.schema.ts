import { max, min, schema, validateTree } from "@angular/forms/signals";
import { Claim } from "../models/process.model";

export const claimSchema = schema<Claim>(path => {
    min(path.claimNum, 5);
    max(path.claimNum, 10);

    validateTree(path, (ctx) => {
      const startDate = Date.parse(ctx.valueOf(path.startDate));
      const endDate = Date.parse(ctx.valueOf(path.endDate));
      if (startDate > endDate) {
        return [
          {
            kind: 'endDateBeforeStartDate',
            fieldTree: ctx.fieldTreeOf(path.endDate),
            message: 'End date must be after start date',
          },
          {
            kind: 'startDateAfterEndDate',
            fieldTree: ctx.fieldTreeOf(path.startDate),
            message: 'Start date must be before end date',
          },
        ];
      }

      return null;
    });

})