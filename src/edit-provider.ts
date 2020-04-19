import { workspace, window, Range, TextEdit } from 'vscode';
import { format, resolveConfig } from 'prettier';

import { getPrettierParser } from './language-map';
import { getModifiedLines } from './diffs';

function fullDocumentRange(document) {
  const lastLineId = document.lineCount - 1;
  return new Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}

export default class PrettierEditProvider {
  getBasePath(document) {
    const { uri } = (workspace.workspaceFolders || [])[0] || {};
    if (uri && uri.scheme === 'file') {
      return uri.fsPath;
    };
  }

  getConfigPath(document) {
    if (!document.isUntitled) {
      return document.fileName;
    };
    return this.getBasePath(document);
  }

  getConfig(document) {
    const opts = { editorconfig: true, useCache: false };
    const path = this.getConfigPath(document);
    const config = (path && resolveConfig.sync(path, opts)) || {};
    config.filepath = '(stdin)';
    config.parser = getPrettierParser(document.languageId);
    config.singleQuote = true;
    return config;
  }

  format(document, range) {
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

  provideDocumentRangeFormattingEdits(document, range) {
    return this.format(document, range);
  }

  async provideDocumentFormattingEdits(document) {
    await getModifiedLines(document, this.getBasePath(document));
    return this.format(document);
  }
};
