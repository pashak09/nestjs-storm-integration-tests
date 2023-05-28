import fs from 'fs/promises';

import { resolve } from 'path';

const generator = async (
  count: number,
  testFileName: string,
): Promise<void> => {
  const outputDir = resolve(__dirname, 'resolvers', '__generated__');
  const testFile = resolve(__dirname, 'resolvers', testFileName);

  try {
    await fs.access(outputDir);
  } catch (error) {
    await fs.mkdir(outputDir);
  }

  const result = new Array(count);

  for (let i = 1; i <= count; i++) {
    result[i] = fs.cp(testFile, `${outputDir}/GeneratedTestFile-${i}.Spec.ts`);
  }

  await Promise.all(result);
};

const DEFAULT_TESTS_COUNT = 2999;
const DEFAULT_TEST_FILE_NAME = 'EmployeeResolver.Spec.ts';

(async (): Promise<void> => {
  const testsCount =
    process.argv[2] !== undefined
      ? parseInt(process.argv[2])
      : DEFAULT_TESTS_COUNT;

  await generator(testsCount, DEFAULT_TEST_FILE_NAME);
})();
