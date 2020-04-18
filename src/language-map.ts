export const supportedLanguageIds = [
  'javascript',
  'javascriptreact',
  'json',
  'json5',
  'typescript',
  'typescriptreact',
  'css',
  'scss',
  'less',
  'graphql',
  'markdown',
  'mdx',
  'html',
  'vue',
  'yaml',
  'mdx',
  'flow',
  'angular'
];

export const getPrettierParser = (languageId: string) => (['javascript', 'javascriptreact'].includes(languageId)) ? 'babel' : languageId;
