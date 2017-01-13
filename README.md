# Prettier formatter for Atom

Atom package to format your Javascript using [Prettier](https://github.com/jlongster/prettier).

### Usage

#### Keybindings

Use `ctrl-alt-f` to format the current Javascript file. If a text selection is made, only the selected text will be formatted.

#### Format On Save

Automatically format your Javascript file on save by enabling the *Format On Save* package setting.  This is off by default.

#### Menu

*Packages > prettier > Format*

### Settings

#### formatOnSave (default: false)

Format Javascript files when saving.

#### Print Width (default: 80)

Fit code within this line limit

#### Tab Width (default: 2)

Number of spaces it should use per tab

#### Single Quote (default: false)

If true, will use single instead of double quotes

#### Trailing Comma (default: false)

Controls the printing of trailing commas wherever possible

### Bracket Spacing (default: true)

Controls the printing of spaces inside array and objects

#### Use Flow Parser (default: false)

Use the [flow](https://github.com/facebook/flow) parser instead of [babylon](https://github.com/babel/babylon).
