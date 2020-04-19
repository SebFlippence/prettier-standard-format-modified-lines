import gitP, { SimpleGit } from 'simple-git/promise';
import parseDiff from 'parse-diff';

export const getModifiedLines = async (document, basePath) => {
  try {
    console.log('base path', basePath);
    const git: SimpleGit = gitP(basePath);
    const isRepo = await git.checkIsRepo();
    console.log('is repo', isRepo);

    if (isRepo) {
      const diff = parseDiff(await git.diff(['-U0', '--', document.fileName]));
      console.log(diff);

      const ranges = [];
      if (diff && diff.length > 0) {
        diff[0].chunks.map(chunk => {
          const hasChanges = chunk.changes.filter(change => change.type !== 'del').length > 0;
          if (hasChanges) {
            const endLine = chunk.newStart + chunk.newLines - (chunk.newLines > 0 ? 1 : 0);
            ranges.push({ startLine: chunk.newStart, endLine });
          }
        });
      }

      if (ranges.length > 0) {
        console.log('Ranges:' + JSON.stringify(ranges));
      }
      else {
        console.log('No differences found?');
      }
      return ranges;
    }
  } catch (e) {
    console.error(e);
  }
};
