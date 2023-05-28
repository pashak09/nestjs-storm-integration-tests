import { join } from 'path';

import { uvuConfig } from '@tests/uvuConfig';
import { Argv, parse } from 'uvu/parse';
import { run as uvu } from 'uvu/run';

export const runUvu = async (): Promise<boolean> => {
  const argvs: readonly Argv[] = await Promise.all(
    uvuConfig.filePaths.map(async (filePath: string): Promise<Argv> => {
      return parse(join(process.cwd(), filePath), uvuConfig.filePattern);
    }),
  );

  const suites = argvs.flatMap((argv: Argv) => argv.suites);

  try {
    await uvu(suites, { bail: false });

    return false;
  } catch (err) {
    return true;
  }
};
