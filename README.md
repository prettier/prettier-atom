# Prettier for Atom [![Watch on GitHub][github-watch-badge]][github-watch][![Star on GitHub][github-star-badge]][github-star][![Tweet][twitter-badge]][twitter]

<!-- [![Dependencies][dependencyci-badge]][dependencyci] TODO: Add dependency CI! -->

<!-- [![Code of Conduct][coc-badge]][coc] -->

[![Version][version-badge]][package]
[![Downloads][downloads-badge]][package]
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]](#contributors)
[![PRs Welcome][prs-badge]][prs]

Atom package to format your code using [Prettier](https://github.com/prettier/prettier).

![prettier demo](prettier-demo.gif)

## Problems with Latest Release (v0.55.0)?

We have recently switched to deferring most options to Prettier via a .prettierrc (or similar) file instead of specifying your options via the Atom package. This is to accommodate Prettier "plugins" which introduce all sorts of new functionality but can't work with the old paradigm.

However, this requires Prettier **v1.13.4** or greater. If you are not ready to migrate, you can revert prettier-atom like this:

```shell
apm install prettier-atom@0.54.0
```

## Installation

```
apm install prettier-atom
```

Or go to _Settings → Install_ and search for `prettier-atom`.

Make sure to restart Atom after the package is installed.

## How to use

There are two ways to format your code:

- Automatically **format on save** (requires enabling in _Packages → Prettier → Toggle Format on Save_)
- Run the command `Prettier: Format` to invoke Prettier manually
  - Windows/Linux: <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>f</kbd>
  - Mac: <kbd>control</kbd> + <kbd>option</kbd> + <kbd>f</kbd>

Prettier will search up the file tree looking for a [prettier config](https://prettier.io/docs/en/configuration.html) to use. If none is found, Prettier will use its default settings.

Prettier will also respect your `.prettierignore` file.

## What version of Prettier gets used?

By default, we use the prettier instance in your project's `node_modules` directory. We highly recommend adding Prettier to your dependencies so that your team, CI tooling, and any scripts using Prettier all format code exactly the same way.

If Prettier can't be found in your project's node modules, then
we fall back to using the version that comes bundled with the prettier-atom package (version changes are documented in the [CHANGELOG](./CHANGELOG.md)).

## Configuring default rules

Some users may not wish to create a new [Prettier config](https://prettier.io/docs/en/configuration.html) for every project. Because Prettier searches recursively up the filepath, you can place a global prettier config at `~/.prettierrc` to be used as a fallback.

## Using ESLint

![prettier-eslint demo][prettier-eslint-demo]

There are three ways to use ESLint with Prettier and prettier-atom:

### 1. Use ESLint to run Prettier

You can opt not to use prettier-atom and instead configure ESLint to run prettier. ([see details](https://prettier.io/docs/en/eslint.html#use-eslint-to-run-prettier))

### 2. Turn off ESLint's Formatting Rules

You can disable ESLint rules for things that Prettier itself fixes. This allows both tools to run alongside each other without conflicting with one another. ([see details](https://prettier.io/docs/en/eslint.html#turn-off-eslint-s-formatting-rules))

### 3. Use prettier-eslint

The [prettier-eslint][prettier-eslint] package (shipped with prettier-atom) will recursively search up the file tree for your ESLint settings and infer the corresponding Prettier settings to use when formatting. After formatting, prettier-eslint will invoke ESLint to fix remaining issues. Check the "ESLint Integration" checkbox to enable.

> Note: If you are using the [linter-eslint](https://github.com/AtomLinter/linter-eslint) package alongside prettier-atom, please **ensure you have unchecked its "Fix on save" checkbox**. Leaving it enabled will cause a race condition between prettier-atom and linter-eslint. After it has finished formatting your code, **prettier-atom will automatically invoke the linter package's `lint` command for you**.

## Using Stylelint

The [prettier-stylelint](https://github.com/hugomrdias/prettier-stylelint) package (shipped with prettier-atom) derives prettier settings from your [stylelint configuration](https://stylelint.io/user-guide/configuration/) to use when formatting. After formatting, prettier-stylelint will invoke Stylelint to fix remaining issues. Check the "Stylelint Integration" checkbox to enable.

> Note: prettier-atom automatically detects when you are in an Atom scope that stylelint supports and switches to using it instead of normal Prettier when formatting that file.

## Troubleshooting formatting problems

If Prettier is not formatting something properly, please open an issue on the [Prettier repository](https://github.com/prettier/prettier), not this repository.

## Inspiration

This repository was created by [James Long][james-long] to go along with his Prettier project. [Kent C. Dodds][kentcdodds] extended Prettier to add `eslint --fix` integration as [prettier-eslint][prettier-eslint] and forked the original `prettier-atom` plugin to create the `prettier-eslint-atom` plugin. Because it became clear that the plugins were very similar and thus maintenance made easier by combining the two, [Rob Wise][robwise] merged `prettier-eslint-atom` back into `prettier-atom`.

## Maintainers

[Rob Wise][robwise]

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://jlongster.com"><img src="https://avatars.githubusercontent.com/u/17031?v=3?s=100" width="100px;" alt=""/><br /><sub><b>James Long</b></sub></a><br /><a href="#question-jlongster" title="Answering Questions">💬</a> <a href="https://github.com/prettier/prettier-atom/commits?author=jlongster" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=jlongster" title="Documentation">📖</a> <a href="#plugin-jlongster" title="Plugin/utility libraries">🔌</a> <a href="https://github.com/prettier/prettier-atom/pulls?q=is%3Apr+reviewed-by%3Ajlongster" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://robwise.github.io"><img src="https://avatars.githubusercontent.com/u/6173488?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Rob Wise</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=robwise" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=robwise" title="Documentation">📖</a> <a href="#question-robwise" title="Answering Questions">💬</a> <a href="#example-robwise" title="Examples">💡</a> <a href="https://github.com/prettier/prettier-atom/pulls?q=is%3Apr+reviewed-by%3Arobwise" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/prettier/prettier-atom/commits?author=robwise" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/cloud-walker"><img src="https://avatars.githubusercontent.com/u/1144075?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Luca Barone</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/arnarthor"><img src="https://avatars.githubusercontent.com/u/4514159?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Arnar Þór Sveinsson</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=arnarthor" title="Code">💻</a></td>
    <td align="center"><a href="http://www.adammiskiewicz.com/"><img src="https://avatars.githubusercontent.com/u/131916?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Adam Miskiewicz</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=skevy" title="Code">💻</a></td>
    <td align="center"><a href="http://www.orilivni.com"><img src="https://avatars.githubusercontent.com/u/2685242?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Ori Livni</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=oriSomething" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://transcranial.github.io"><img src="https://avatars.githubusercontent.com/u/6182852?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Leon Chen</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=transcranial" title="Code">💻</a></td>
    <td align="center"><a href="http://blog.vjeux.com/"><img src="https://avatars.githubusercontent.com/u/197597?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Christopher Chedeau</b></sub></a><br /><a href="#question-vjeux" title="Answering Questions">💬</a> <a href="https://github.com/prettier/prettier-atom/commits?author=vjeux" title="Code">💻</a> <a href="#plugin-vjeux" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="http://christoph-geschwind.de"><img src="https://avatars.githubusercontent.com/u/646693?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Christoph Geschwind</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=1st8" title="Code">💻</a></td>
    <td align="center"><a href="https://andrewhutchings.com"><img src="https://avatars.githubusercontent.com/u/35026?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Hutchings</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=ahutchings" title="Code">💻</a></td>
    <td align="center"><a href="http://davidschnurr.com"><img src="https://avatars.githubusercontent.com/u/875591?v=3?s=100" width="100px;" alt=""/><br /><sub><b>David Schnurr</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=schnerd" title="Code">💻</a></td>
    <td align="center"><a href="http://rycole.com/"><img src="https://avatars.githubusercontent.com/u/484801?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Ryan Cole</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=ryancole" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/darahak"><img src="https://avatars0.githubusercontent.com/u/11488612?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Dara Hak</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=darahak" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=darahak" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.stephenjohnsorensen.com/"><img src="https://avatars3.githubusercontent.com/u/487068?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Stephen John Sorensen</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=spudly" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lgeiger"><img src="https://avatars2.githubusercontent.com/u/13285808?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Lukas Geiger</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=lgeiger" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=lgeiger" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/charypar"><img src="https://avatars2.githubusercontent.com/u/1517854?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Viktor Charypar</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=charypar" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=charypar" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://mats.hgbrg.se"><img src="https://avatars0.githubusercontent.com/u/1007436?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Mats Högberg</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=mhgbrg" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/RoM4iK"><img src="https://avatars0.githubusercontent.com/u/2602767?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Roman</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=RoM4iK" title="Code">💻</a></td>
    <td align="center"><a href="https://vaibhavchatarkar.com"><img src="https://avatars2.githubusercontent.com/u/1468518?v=3?s=100" width="100px;" alt=""/><br /><sub><b>vaibhav</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=da-vaibhav" title="Code">💻</a></td>
    <td align="center"><a href="https://work.karlhorky.com"><img src="https://avatars1.githubusercontent.com/u/1935696?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Karl Horky</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=karlhorky" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://twitter.com/dan_abramov"><img src="https://avatars3.githubusercontent.com/u/810438?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Dan Abramov</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=gaearon" title="Code">💻</a></td>
    <td align="center"><a href="https://sploding.rocks"><img src="https://avatars3.githubusercontent.com/u/1227109?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Murphy Randle</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=splodingsocks" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/issues?q=author%3Asplodingsocks" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://matthieulemoine.com"><img src="https://avatars3.githubusercontent.com/u/8517072?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Matthieu Lemoine</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=MatthieuLemoine" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rgreenjr"><img src="https://avatars1.githubusercontent.com/u/37242?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ron Green</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=rgreenjr" title="Code">💻</a></td>
    <td align="center"><a href="https://haroldtreen.com"><img src="https://avatars2.githubusercontent.com/u/1745854?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Harold Treen</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/issues?q=author%3Aharoldtreen" title="Bug reports">🐛</a> <a href="https://github.com/prettier/prettier-atom/commits?author=haroldtreen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ferdibiflator"><img src="https://avatars1.githubusercontent.com/u/3447641?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nikita Mashukov</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=ferdibiflator" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SavePointSam"><img src="https://avatars0.githubusercontent.com/u/8203211?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sam Horton</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=SavePointSam" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=SavePointSam" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/olsonpm"><img src="https://avatars2.githubusercontent.com/u/5957709?v=4?s=100" width="100px;" alt=""/><br /><sub><b>olsonpm</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=olsonpm" title="Code">💻</a></td>
    <td align="center"><a href="http://dsingleton.co.uk"><img src="https://avatars2.githubusercontent.com/u/63201?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Singleton</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=dsingleton" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/chrisdrackett"><img src="https://avatars3.githubusercontent.com/u/4378?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Drackett</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=chrisdrackett" title="Code">💻</a> <a href="#design-chrisdrackett" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/lewisl9029"><img src="https://avatars0.githubusercontent.com/u/6934200?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lewis Liu</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=lewisl9029" title="Code">💻</a> <a href="https://github.com/prettier/prettier-atom/commits?author=lewisl9029" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://chancedickson.com"><img src="https://avatars1.githubusercontent.com/u/5004326?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chance Dickson</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/commits?author=chancedickson" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pbardov"><img src="https://avatars.githubusercontent.com/u/6674508?v=4?s=100" width="100px;" alt=""/><br /><sub><b>pbardov</b></sub></a><br /><a href="https://github.com/prettier/prettier-atom/issues?q=author%3Apbardov" title="Bug reports">🐛</a> <a href="https://github.com/prettier/prettier-atom/commits?author=pbardov" title="Code">💻</a> <a href="#design-pbardov" title="Design">🎨</a> <a href="https://github.com/prettier/prettier-atom/commits?author=pbardov" title="Documentation">📖</a> <a href="#example-pbardov" title="Examples">💡</a> <a href="https://github.com/prettier/prettier-atom/pulls?q=is%3Apr+reviewed-by%3Apbardov" title="Reviewed Pull Requests">👀</a> <a href="#security-pbardov" title="Security">🛡️</a> <a href="#talk-pbardov" title="Talks">📢</a> <a href="https://github.com/prettier/prettier-atom/commits?author=pbardov" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification. Contributions of any kind are welcome!

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
[prettier-eslint]: https://github.com/prettier/prettier-eslint
[kentcdodds]: https://github.com/kentcdodds
[james-long]: https://github.com/jlongster
[robwise]: https://github.com/robwise
[prettier-demo]: https://github.com/prettier/prettier-atom/raw/master/prettier-demo.gif
[prettier-eslint-demo]: https://github.com/prettier/prettier-atom/raw/master/prettier-eslint-demo.gif
