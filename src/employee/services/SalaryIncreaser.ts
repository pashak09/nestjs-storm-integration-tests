import { Injectable } from '@nestjs/common';

type Args = {
  readonly percentage: number;
  readonly value: string;
};

@Injectable()
export class SalaryIncreaser {
  increase({ value, percentage }: Args): string {
    return (Number(value) * (1 + percentage / 100)).toFixed(4);
  }
}
