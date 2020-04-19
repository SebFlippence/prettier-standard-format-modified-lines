import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';

import { workspace, window, Range, TextEdit, TextDocument } from 'vscode';
// @ts-ignore
import { format, resolveConfig } from 'prettier-standard';

import { getPrettierParser } from './language-map';

function fullDocumentRange(document: TextDocument) {
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

  getConfigPath(document: TextDocument) {
    if (!document.isUntitled) {
      return document.fileName;
    };
    return this.getBasePath();
  }

  getConfig(document: TextDocument) {
    const opts = { editorconfig: true, useCache: false };
    const path = this.getConfigPath(document);
    const config = (path && resolveConfig.sync(path, opts)) || {};
    config.filepath = '(stdin)';
    config.parser = getPrettierParser(document.languageId);
    return config;
  }

  provideDocumentRangeFormattingEdits(document: TextDocument, range: Range) {
    try {
      const text = range ? document.getText(range) : document.getText();
      const newText = format(text, this.getConfig(document));
      return [TextEdit.replace(range || fullDocumentRange(document), newText)];
    } catch (e) {
      console.error(e);
      window.showErrorMessage(e.message);
      return [];
    }
  }

  async provideDocumentFormattingEdits(document: TextDocument): Promise<TextEdit[]> {
    try {
      const basePath = this.getBasePath();
      const docRelativePath = basePath && document.fileName.replace(basePath, '').substring(1);
      var name = path.basename(document.fileName);

      childProcess.execSync(`cp -f ${document.fileName} /tmp/${name}.bak`);
      fs.writeFileSync(document.fileName, document.getText(), 'utf8');
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
};
