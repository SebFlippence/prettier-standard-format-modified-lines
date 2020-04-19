import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';

import { workspace, window, Range, TextEdit } from 'vscode';

function fullDocumentRange(document) {
  const lastLineId = document.lineCount - 1;
  return new Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

export default class PrettierEditProvider {
  getBasePath() {
    const { uri } = (workspace.workspaceFolders || [])[0] || {};
    if (uri && uri.scheme === 'file') {
      return uri.fsPath;
    };
  }

  format(document) {
    try {
      const basePath = this.getBasePath(document);
      const docRelativePath = document.fileName.replace(basePath, '').substring(1);
      var name = path.basename(document.fileName);

      childProcess.execSync(`cp -f ${document.fileName} /tmp/${name}.bak`);
      childProcess.execSync(`${__dirname}/../node_modules/.bin/prettier-standard --lines ${docRelativePath}`, { cwd: basePath });
      const newText = fs.readFileSync(document.fileName, 'utf8');
      childProcess.execSync(`mv -f /tmp/${name}.bak ${document.fileName}`);

      return [TextEdit.replace(fullDocumentRange(document), newText)];
    } catch (e) {
      console.error(e);
      window.showErrorMessage(e.message);
      return [];
    }
  }

  provideDocumentRangeFormattingEdits(document, range) {
    return this.format(document);
  }

  async provideDocumentFormattingEdits(document) {
    return this.format(document);
  }
};
