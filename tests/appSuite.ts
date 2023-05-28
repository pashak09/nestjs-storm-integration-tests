import { suite as uvuSuite, uvu } from 'uvu';
import { TransactionDealer } from '@tests/core/servises/TransactionDealer';

export const appSuite = <T = Record<string, unknown>>(
  title?: string,
  context?: T,
): uvu.Test<T> => {
  const suite = uvuSuite(title, context);

  suite.before.each(async (): Promise<void> => {
    await TransactionDealer.startTransaction();
  });

  suite.after.each(async (): Promise<void> => {
    await TransactionDealer.rollbackTransaction();
  });

  return suite;
};
