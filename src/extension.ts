import * as vscode from 'vscode';

import EditProvider from './edit-provider';
import { supportedLanguageIds } from './language-map';

const langs = [
  ...supportedLanguageIds.map(language => ({ scheme: 'file', language })),
  ...supportedLanguageIds.map(language => ({ scheme: 'untitled', language }))
];

export function activate(context: vscode.ExtensionContext) {
  const editProvider = new EditProvider();
  context.subscriptions.push(
    vscode.languages.registerDocumentRangeFormattingEditProvider(langs, editProvider)
  );
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(langs, editProvider)
  );
}

export function deactivate() {}
