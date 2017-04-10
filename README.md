# Prettier for Atom [![Watch on GitHub][github-watch-badge]][github-watch][![Star on GitHub][github-star-badge]][github-star][![Tweet][twitter-badge]][twitter]

<!-- [![Dependencies][dependencyci-badge]][dependencyci] TODO: Add dependency CI! -->
<!-- [![Code of Conduct][coc-badge]][coc] -->

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][package]
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![MIT License][license-badge]][LICENSE]
[![All Contributors][all-contributors-badge]](#contributors)
[![PRs Welcome][prs-badge]][prs]

Atom package to format your JavaScript using Prettier. Comes with powerful optional ESlint integration.

## Demo
![prettier demo][prettier-demo]

## Installation

```
apm install prettier-atom
```

Or, Settings → Install → Search for `prettier-atom`

Make sure to restart Atom app after package installation.

## Usage

Use two ways:

- Invoke manually using the keyboard shortcut (if no selection, whole file is formatted): <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>f</kbd>
- Automatically format on save (requires enabling in Package → `prettier-atom` → Format)

If you use ESlint, check the "ESLint Integration" checkbox and poof, everything should work (we use Kent Dodds's [`prettier-eslint`][prettier-eslint] plugin under the hood). We will recursively search up the file tree for your package.json and eslint settings and use them when formatting.

![prettier-eslint demo][prettier-eslint-demo]

More detailed descriptions of each option can be found in the Atom settings for this plugin.

Please open a pull request or file an issue if you notice bugs or something doesn't work as it should!

## Inspiration

This repository was created by [James Long][james-long] to go along with his Prettier project. [Kent C. Dodds][kentcdodds] extended Prettier to add `eslint --fix` integration as [prettier-eslint][prettier-eslint] and forked the original prettier-atom plugin to create the prettier-eslint-atom plugin. Because it became clear that the plugins were very similar and thus maintenance made easier by combining the two, prettier-eslint-atom, [Rob Wise][robwise] merged prettier-eslint back into prettier-atom.

## Maintainers
[Rob Wise][robwise]

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/17031?v=3" width="100px;"/><br /><sub>James Long</sub>](http://jlongster.com)<br />💬 [💻](https://github.com/prettier/prettier-atom/commits?author=jlongster) [📖](https://github.com/prettier/prettier-atom/commits?author=jlongster) 🔌 👀 | [<img src="https://avatars.githubusercontent.com/u/6173488?v=3" width="100px;"/><br /><sub>Rob Wise</sub>](https://robwise.github.io)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=robwise) [📖](https://github.com/prettier/prettier-atom/commits?author=robwise) 💬 💡 👀 [⚠️](https://github.com/prettier/prettier-atom/commits?author=robwise) | [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;"/><br /><sub>Kent C. Dodds</sub>](https://kentcdodds.com)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=kentcdodds) [📖](https://github.com/prettier/prettier-atom/commits?author=kentcdodds) 🚇 | [<img src="https://avatars.githubusercontent.com/u/1144075?v=3" width="100px;"/><br /><sub>Luca Barone</sub>](https://github.com/cloud-walker)<br /> | [<img src="https://avatars.githubusercontent.com/u/4514159?v=3" width="100px;"/><br /><sub>Arnar Þór Sveinsson</sub>](https://github.com/arnarthor)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=arnarthor) | [<img src="https://avatars.githubusercontent.com/u/131916?v=3" width="100px;"/><br /><sub>Adam Miskiewicz</sub>](http://www.adammiskiewicz.com/)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=skevy) | [<img src="https://avatars.githubusercontent.com/u/2685242?v=3" width="100px;"/><br /><sub>Ori Livni</sub>](http://www.orilivni.com)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=oriSomething) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars.githubusercontent.com/u/6182852?v=3" width="100px;"/><br /><sub>Leon Chen</sub>](https://transcranial.github.io)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=transcranial) | [<img src="https://avatars.githubusercontent.com/u/197597?v=3" width="100px;"/><br /><sub>Christopher Chedeau</sub>](http://blog.vjeux.com/)<br />💬 [💻](https://github.com/prettier/prettier-atom/commits?author=vjeux) 🔌 | [<img src="https://avatars.githubusercontent.com/u/646693?v=3" width="100px;"/><br /><sub>Christoph Geschwind</sub>](http://christoph-geschwind.de)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=1st8) | [<img src="https://avatars.githubusercontent.com/u/35026?v=3" width="100px;"/><br /><sub>Andrew Hutchings</sub>](https://andrewhutchings.com)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=ahutchings) | [<img src="https://avatars.githubusercontent.com/u/875591?v=3" width="100px;"/><br /><sub>David Schnurr</sub>](http://davidschnurr.com)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=schnerd) | [<img src="https://avatars.githubusercontent.com/u/484801?v=3" width="100px;"/><br /><sub>Ryan Cole</sub>](http://rycole.com/)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=ryancole) | [<img src="https://avatars0.githubusercontent.com/u/11488612?v=3" width="100px;"/><br /><sub>Dara Hak</sub>](https://github.com/darahak)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=darahak) |
| [<img src="https://avatars3.githubusercontent.com/u/487068?v=3" width="100px;"/><br /><sub>Stephen John Sorensen</sub>](http://www.stephenjohnsorensen.com/)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=spudly) | [<img src="https://avatars2.githubusercontent.com/u/13285808?v=3" width="100px;"/><br /><sub>Lukas Geiger</sub>](https://github.com/lgeiger)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=lgeiger) | [<img src="https://avatars2.githubusercontent.com/u/1517854?v=3" width="100px;"/><br /><sub>Viktor Charypar</sub>](https://github.com/charypar)<br />[💻](https://github.com/prettier/prettier-atom/commits?author=charypar) [⚠️](https://github.com/prettier/prettier-atom/commits?author=charypar) |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification. Contributions of any kind welcome!

## LICENSE

[MIT](./LICENSE.md)

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/prettier/prettier-atom.svg?style=flat-square
[build]: https://travis-ci.org/prettier/prettier-atom
[coverage-badge]: https://img.shields.io/codecov/c/github/prettier/prettier-atom.svg?style=flat-square
[coverage]: https://codecov.io/github/prettier/prettier-atom
[dependencyci-badge]: https://dependencyci.com/github/prettier/prettier-atom/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/prettier/prettier-atom
[version-badge]: https://img.shields.io/apm/v/prettier-atom.svg?style=flat-square
[package]: https://atom.io/packages/prettier-atom
[downloads-badge]: https://img.shields.io/apm/dm/prettier-atom.svg?style=flat-square
[license-badge]: https://img.shields.io/apm/l/prettier-atom.svg?style=flat-square
[license]: https://github.com/prettier/prettier-atom/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/prettier/prettier-atom/blob/master/other/CODE_OF_CONDUCT.md
[roadmap-badge]: https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square
[roadmap]: https://github.com/prettier/prettier-atom/blob/master/other/ROADMAP.md
[github-watch-badge]: https://img.shields.io/github/watchers/prettier/prettier-atom.svg?style=social
[github-watch]: https://github.com/prettier/prettier-atom/watchers
[github-star-badge]: https://img.shields.io/github/stars/prettier/prettier-atom.svg?style=social
[github-star]: https://github.com/prettier/prettier-atom/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20prettier-atom!%20https://github.com/prettier/prettier-atom%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/prettier/prettier-atom.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[all-contributors-badge]: https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
[prettier-eslint]: https://github.com/prettier/prettier-atom
[kentcdodds]: https://github.com/kentcdodds
[james-long]: https://github.com/jlongster
[robwise]: https://github.com/robwise
[prettier-demo]: https://github.com/prettier/prettier-atom/raw/master/prettier-demo.gif
[prettier-eslint-demo]: https://github.com/prettier/prettier-atom/raw/master/prettier-eslint-demo.gif
