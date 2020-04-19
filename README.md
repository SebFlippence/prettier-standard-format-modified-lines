# Prettier Standard - format modified lines

[Prettier Standard](https://github.com/sheerun/prettier-standard) - format modified lines. A [Visual Studio Code](https://code.visualstudio.com) formatter extension.

## Features

Formats modified lines only via the experimental [prettier-standard `--lines` flag](https://github.com/sheerun/prettier-standard#usage) or formats the selected text via prettier-standard.

## Installation

Install through VS Code extensions. Search for `Prettier Standard - format modified lines`

[Visual Studio Marketplace: Prettier Standard - format modified lines](https://marketplace.visualstudio.com/items?itemName=sebflipper.prettier-standard-format-modified-lines)

Can also be installed in VS Code: Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter:  
`ext install sebflipper.prettier-standard-format-modified-lines`

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

* Only works on Mac or Linux.

## Release Notes

See: [CHANGELOG.md](CHANGELOG.md).
