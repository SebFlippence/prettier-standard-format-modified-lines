# Prettier Standard - format modified lines

[Prettier Standard](https://github.com/sheerun/prettier-standard) - format modified lines. A [Visual Studio Code](https://code.visualstudio.com) formatter extension.

## Features

Formats modified lines only via the experimental [prettier-standard `--lines` flag](https://github.com/sheerun/prettier-standard#usage) or formats the selected text via prettier-standard.

## Extension Settings

To enable, add the follow to your editors or workspaces `settings.json`.

```js
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "sebflipper.prettier-standard-format-modified-lines"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "sebflipper.prettier-standard-format-modified-lines"
  },
  "[typescript]": {
    "editor.defaultFormatter": "sebflipper.prettier-standard-format-modified-lines"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "sebflipper.prettier-standard-format-modified-lines"
  },
  // If needed, add additional Prettier Standard supported languages here...
}
```

## Known Issues

Currently only works on Mac or Linux.

## Release Notes

See: [CHANGELOG.md](CHANGELOG.md).
