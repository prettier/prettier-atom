# [0.59.0](https://github.com/prettier/prettier-atom/compare/v0.58.2...v0.59.0) (2020-04-14)


### Features

* **prettier:** bump to version 2.0.2 ([1cab45e](https://github.com/prettier/prettier-atom/commit/1cab45e3b9d29239ae2a45a8bf5954af531df829))



## [0.58.2](https://github.com/prettier/prettier-atom/compare/v0.58.1...v0.58.2) (2019-11-06)


### Bug Fixes

* search and replace 'prettier-eslint' to custom fork ([801d39a](https://github.com/prettier/prettier-atom/commit/801d39a1195667d31816e319eef228621bc8a771)), closes [#565](https://github.com/prettier/prettier-atom/issues/565)



## [0.58.1](https://github.com/prettier/prettier-atom/compare/v0.58.0...v0.58.1) (2019-11-04)


### Bug Fixes

* Use fork of prettier-eslint with cwd fix ([2e0b684](https://github.com/prettier/prettier-atom/commit/2e0b6843fb9b9cce8efba4daaebf1d2e8e1c25be)), closes [#505](https://github.com/prettier/prettier-atom/issues/505)



# [0.58.0](https://github.com/prettier/prettier-atom/compare/v0.57.3...v0.58.0) (2019-10-18)


### Features

* Add option to use configuration from `.editorconfig`, enabled by default ([2ab8011](https://github.com/prettier/prettier-atom/commit/2ab80118435f8d344d82d1369672b1930180f2a0)), closes [#514](https://github.com/prettier/prettier-atom/issues/514)


### BREAKING CHANGES

* If the user has a `.editorconfig` file, with `max_line_length` then that value will
be used instead of Prettier's `printWidth`. This is the default behaviour of prettier when run on
the command line, but was not the default behaviour of prettier-atom (but it should be, and now is)



## [0.57.3](https://github.com/prettier/prettier-atom/compare/v0.57.2...v0.57.3) (2019-10-04)



## [0.57.2](https://github.com/prettier/prettier-atom/compare/v0.57.1...v0.57.2) (2019-07-25)


### Bug Fixes

* **deps:** correctly use new pkg-up, fixup f5a0b18, [#507](https://github.com/prettier/prettier-atom/issues/507) ([88285be](https://github.com/prettier/prettier-atom/commit/88285beef5aa9e4570fd8b44fd9124bdd6855c1a)), closes [#510](https://github.com/prettier/prettier-atom/issues/510)



## [0.57.1](https://github.com/prettier/prettier-atom/compare/v0.57.0...v0.57.1) (2019-07-19)


### Bug Fixes

* **debug:** read-pkg-up@6 BC break, renamed pkg to package ([114cfb1](https://github.com/prettier/prettier-atom/commit/114cfb1ffdfa1dc633a2f2d7a2ff19c7c5987d37))



# [0.57.0](https://github.com/prettier/prettier-atom/compare/v0.56.6...v0.57.0) (2019-07-10)


### Features

* **prettier:** bump to version 1.18.2 ([16ecb0d](https://github.com/prettier/prettier-atom/commit/16ecb0d48343379b217c64fef401ecc344927695))
* **prettier-eslint:** bump to version 9.0.0 ([3019316](https://github.com/prettier/prettier-atom/commit/3019316f60a898890034d81954acd94346136786))



## [0.56.6](https://github.com/prettier/prettier-atom/compare/v0.56.5...v0.56.6) (2019-05-21)


### Bug Fixes

* **prettierignore:** Revert mistake with path passed to prettier.getFileInfo ([850d639](https://github.com/prettier/prettier-atom/commit/850d639570505c32b331c3df36274c245ffeac0e))



## [0.56.5](https://github.com/prettier/prettier-atom/compare/v0.56.4...v0.56.5) (2019-05-16)


### Bug Fixes

* **prettierignore:** Pass relative instead of absolute path to prettier.getFileInfo ([f045749](https://github.com/prettier/prettier-atom/commit/f045749011ae8cd9de1d06def52f473b8ae412a5))


### Features

* Add option to enable format-on-save for files in node_modules ([6e8a506](https://github.com/prettier/prettier-atom/commit/6e8a50681dd8fd4e3853bf55f6df2442a3f65656))



## [0.56.4](https://github.com/prettier/prettier-atom/compare/v0.56.3...v0.56.4) (2019-02-20)


### Performance Improvements

* **startup:** Remove lazy loading code. ([fab3baf](https://github.com/prettier/prettier-atom/commit/fab3bafa1e65ae4d8be18abedb52dc367ac0c7f1))



## [0.56.3](https://github.com/prettier/prettier-atom/compare/v0.56.2...v0.56.3) (2019-02-15)


### Performance Improvements

* **startup:** defer activating the package until the window is loaded ([fd658ef](https://github.com/prettier/prettier-atom/commit/fd658ef5c1616c07f03af7ad6612e4e7555e9a20))



## [0.56.2](https://github.com/prettier/prettier-atom/compare/v0.56.1...v0.56.2) (2018-12-06)


### Bug Fixes

* ensure we always pass a relative path to `ignore` pkg ([477d6aa](https://github.com/prettier/prettier-atom/commit/477d6aa82476292ac6154125000133f4d11789ac)), closes [#473](https://github.com/prettier/prettier-atom/issues/473)



## [0.56.1](https://github.com/prettier/prettier-atom/compare/v0.56.0...v0.56.1) (2018-12-03)


### Bug Fixes

* properly format HTML and VUE files ([b91ea02](https://github.com/prettier/prettier-atom/commit/b91ea02435e7833b089ac3f9f4d7ed398383c960)), closes [#467](https://github.com/prettier/prettier-atom/issues/467)



# [0.56.0](https://github.com/prettier/prettier-atom/compare/v0.55.2...v0.56.0) (2018-11-19)


### Bug Fixes

* **ignores:** ensure we always pass a relative string to the ignores package ([c6ad510](https://github.com/prettier/prettier-atom/commit/c6ad510591819cf1fa8c471142bc80145c11d787))


### Features

* **prettier:** bump to version 1.15.2 ([c3ff578](https://github.com/prettier/prettier-atom/commit/c3ff578ddb1d3723e489220ec1339c69ca8b9a50))
* **prettier-eslint:** bump to version 8.8.2 ([de77987](https://github.com/prettier/prettier-atom/commit/de77987c2b2ce0872228669c43e5489f182e1e2b))



## [0.55.2](https://github.com/prettier/prettier-atom/compare/v0.55.1...v0.55.2) (2018-08-23)


### Bug Fixes

* **prettierignore:** properly ignore files again ([dd4c849](https://github.com/prettier/prettier-atom/commit/dd4c849352151412d423662c9b1759397de5472d)), closes [#404](https://github.com/prettier/prettier-atom/issues/404) [#446](https://github.com/prettier/prettier-atom/issues/446)



## [0.55.1](https://github.com/prettier/prettier-atom/compare/v0.55.0...v0.55.1) (2018-08-21)


### Bug Fixes

* properly use prettier config when formatting ([fef2441](https://github.com/prettier/prettier-atom/commit/fef2441ae23cef893d26bc76a9b5b331933cfd7e)), closes [#441](https://github.com/prettier/prettier-atom/issues/441)



# [0.55.0](https://github.com/prettier/prettier-atom/compare/v0.54.0...v0.55.0) (2018-08-20)


### Bug Fixes

* **styles:** status color will now match theme ([cf2ef16](https://github.com/prettier/prettier-atom/commit/cf2ef16ffbcbc0e36e1f85d2bb106732c56fc2f7))


### Features

* **errors:** do not display a popup for "undefined" error messages ([d6a25f5](https://github.com/prettier/prettier-atom/commit/d6a25f5960527241b920a1a0a551bc8e12f98c2d))
* **prettier:** use Prettier to determine whether a file is formattable ([03275d1](https://github.com/prettier/prettier-atom/commit/03275d1edce97378bbf06278df4766d428039e26))
* **settings:** simplify settings by relying on users setting their prettierrc files ([27d3012](https://github.com/prettier/prettier-atom/commit/27d3012b1b0f0422a79619e094d37ebcf9d03d07))


### BREAKING CHANGES

* **prettier:** Because prettier-atom now relies on the new `getFileInfo` method recently added to
Prettier, if you are having prettier-atom use a local version of Prettier instead of the version
that is packaged with the plugin, you will need to manually update your project's local Prettier
version.



# [0.54.0](https://github.com/prettier/prettier-atom/compare/v0.53.0...v0.54.0) (2018-06-05)


### Bug Fixes

* **.babelrc:** Fix usage of babel-preset-env. ([78c10e3](https://github.com/prettier/prettier-atom/commit/78c10e353991347729d61d956cc6d7c7d042c8df))
* **dist/:** Rebuild dist to properly target electron@1.4.0 ([831f086](https://github.com/prettier/prettier-atom/commit/831f086040115a819cd535fc553ace317d34ae69))


### Features

* **prettier:** bump to 1.13.4 ([1c7c30d](https://github.com/prettier/prettier-atom/commit/1c7c30dbe5965d47e87a50b533aee0654a491472))
* **prettier:** bump to version 1.12.1 ([b6638d2](https://github.com/prettier/prettier-atom/commit/b6638d2f5ef1ccec4d83e1939f065af69145754c))



# [0.53.0](https://github.com/prettier/prettier-atom/compare/v0.52.0...v0.53.0) (2018-03-24)


### Bug Fixes

* **eslintignore:** respect eslintignore setting ([59a1828](https://github.com/prettier/prettier-atom/commit/59a1828bf45d3149c03d249365e566b38ca3e383)), closes [#347](https://github.com/prettier/prettier-atom/issues/347)


### Features

* **prettier:** Fallback to globally installed prettier (via npm or yarn) before falling back to a bundled one ([3ed996c](https://github.com/prettier/prettier-atom/commit/3ed996cf6fc98ffe46ef6f8b6d6357aa3f01bf9b))



# [0.52.0](https://github.com/prettier/prettier-atom/compare/v0.51.0...v0.52.0) (2018-03-14)


### Features

* **prettier:** bump prettier to 1.11.1 and prettier-eslint to 8.8.1 ([4e8d85e](https://github.com/prettier/prettier-atom/commit/4e8d85e1cbab7e66706216dc2e092a1ddf2a47a0))



# [0.51.0](https://github.com/prettier/prettier-atom/compare/v0.50.0...v0.51.0) (2018-02-14)


### Bug Fixes

* Fix asynchronous saves ([be1bd05](https://github.com/prettier/prettier-atom/commit/be1bd05379174b2b12bad19e936be0a79fd5d81f))
* **buildPrettierOptions.js:** Allow EditorConfig with prettier-atom settings ([dedc690](https://github.com/prettier/prettier-atom/commit/dedc69049033dc99764c416088c86ccf5beb9746)), closes [#377](https://github.com/prettier/prettier-atom/issues/377)


### Code Refactoring

* **buildEditorConfigOptions.js:** Use editorconfig-to-prettier ([e262f50](https://github.com/prettier/prettier-atom/commit/e262f5041a2aff34ffb0bd71f30add55eff3384f))


### BREAKING CHANGES

* **buildEditorConfigOptions.js:** Derives prettier config options from editorconfig differently



# [0.50.0](https://github.com/prettier/prettier-atom/compare/v0.49.2...v0.50.0) (2018-02-09)


### Code Refactoring

* **buildPrettierOptions.js:** Exclusively use local config or plugin settings ([1141b2c](https://github.com/prettier/prettier-atom/commit/1141b2c2708cca1856d896c4dc2f48ce33db520c)), closes [#370](https://github.com/prettier/prettier-atom/issues/370) [#218](https://github.com/prettier/prettier-atom/issues/218)


### BREAKING CHANGES

* **buildPrettierOptions.js:** The formatting configuration is now built according to different rules



## [0.49.2](https://github.com/prettier/prettier-atom/compare/v0.49.1...v0.49.2) (2018-02-03)


### Bug Fixes

* **executePrettier:** adjust for API inconsistencies + add type coverage ([800c0e2](https://github.com/prettier/prettier-atom/commit/800c0e2b2b4eeca959bb9c90047727b5c300771b))



## [0.49.1](https://github.com/prettier/prettier-atom/compare/v0.49.0...v0.49.1) (2018-02-02)


### Bug Fixes

* **executePrettier:** fallback to `format` when `formatWithCursor` fails ([105f9e1](https://github.com/prettier/prettier-atom/commit/105f9e1c6b3e70a4e7ae48d058d9d25f3c132555))



# [0.49.0](https://github.com/prettier/prettier-atom/compare/v0.48.1...v0.49.0) (2018-01-30)


### Features

* **executePrettier:** Maintain cursor position on format ([159b2b2](https://github.com/prettier/prettier-atom/commit/159b2b2dbd09716e176e95185b0bbacaa45100b4))



## [0.48.1](https://github.com/prettier/prettier-atom/compare/v0.48.0...v0.48.1) (2018-01-25)


### Bug Fixes

* **editorInterface:** use File.getpath over reading the path directly ([3b89260](https://github.com/prettier/prettier-atom/commit/3b892608b48bead060bd992c582d0b833121f9d2))



# [0.48.0](https://github.com/prettier/prettier-atom/compare/v0.47.2...v0.48.0) (2018-01-17)


### Features

* **prettier-eslint:** bump to 8.7.6 ([332c6f4](https://github.com/prettier/prettier-atom/commit/332c6f4e944a3f8927dc2d36ce67d47bd3f13640)), closes [#334](https://github.com/prettier/prettier-atom/issues/334)



## [0.47.2](https://github.com/prettier/prettier-atom/compare/v0.47.1...v0.47.2) (2018-01-17)


### Bug Fixes

* **prettier-eslint:** lock version to 8.4.0 ([1a3e885](https://github.com/prettier/prettier-atom/commit/1a3e8857b47ea6c48b368129820301e49487f35c))



## [0.47.1](https://github.com/prettier/prettier-atom/compare/v0.47.0...v0.47.1) (2018-01-17)


### Bug Fixes

* **prettier-eslint:** lock to 8.6.2 to avoid regression ([e9d2a85](https://github.com/prettier/prettier-atom/commit/e9d2a8505800b9d7bbfd9f9b5f7eb35e75909f51))



# [0.47.0](https://github.com/prettier/prettier-atom/compare/v0.46.0...v0.47.0) (2018-01-15)


### Features

* **scopes:** Support Vue Single File Components ([707e107](https://github.com/prettier/prettier-atom/commit/707e10786a3b934977e144948f8db3d2c8213ee9)), closes [#327](https://github.com/prettier/prettier-atom/issues/327)



# [0.46.0](https://github.com/prettier/prettier-atom/compare/v0.45.0...v0.46.0) (2018-01-05)


### Features

* **options:** add arrow-parens prettier option ([805f183](https://github.com/prettier/prettier-atom/commit/805f183cab32f184f987377003a38fce57e103f5))



# [0.45.0](https://github.com/prettier/prettier-atom/compare/v0.44.0...v0.45.0) (2017-12-31)


### Bug Fixes

* **manual-format:** fix bug from forgetting to rebuild dist ([2121038](https://github.com/prettier/prettier-atom/commit/2121038ac3c5fab3f44333bd9e4256bb0d7ca954)), closes [#336](https://github.com/prettier/prettier-atom/issues/336)


### Performance Improvements

* **statusTile:** faster array creation and lodash lazy loading ([5f90f45](https://github.com/prettier/prettier-atom/commit/5f90f458bf0e869d299c78b9ace6b5f852cd3f87)), closes [#330](https://github.com/prettier/prettier-atom/issues/330)



# [0.44.0](https://github.com/prettier/prettier-atom/compare/v0.43.1...v0.44.0) (2017-12-31)


### Bug Fixes

* **set-text-via-diff:** base use on option instead of flaky buffer range comparison ([378b6bd](https://github.com/prettier/prettier-atom/commit/378b6bd7bae1f4e061a6d7ff15ba9497b86779cb))


### Features

* **prettier:** bump to 1.9.2 ([3186833](https://github.com/prettier/prettier-atom/commit/31868337b6e6605dd2658a7834e9a921d0188b9d))
* **prettier-eslint:** bump to 8.7.0 ([c59b768](https://github.com/prettier/prettier-atom/commit/c59b768f9e4a67ba7c5cf4d6d3e5824b35ec13f2))



## [0.43.1](https://github.com/prettier/prettier-atom/compare/v0.43.0...v0.43.1) (2017-12-10)


### Bug Fixes

* **async-polyfill:** switch from babel-polyfill to babel-runtime ([61ea645](https://github.com/prettier/prettier-atom/commit/61ea64549dd486b47d5a1d59d24a4a34eb4a224d)), closes [#315](https://github.com/prettier/prettier-atom/issues/315)
* **linter:** resolve issue with linter not showing error messages properly ([2550a8f](https://github.com/prettier/prettier-atom/commit/2550a8fdeb2e986ad4e8c64cd8e5c0d312ae9986)), closes [#318](https://github.com/prettier/prettier-atom/issues/318) [#298](https://github.com/prettier/prettier-atom/issues/298)



# [0.43.0](https://github.com/prettier/prettier-atom/compare/v0.41.0...v0.43.0) (2017-12-05)


### Bug Fixes

* **config-schema:** add `text.md` to default markdown scopes ([aa7ecd1](https://github.com/prettier/prettier-atom/commit/aa7ecd19a57e125a25136722342e9ad9cada9511))


### Features

* **prettier-stylelint:** Add support for prettier-stylelint ([a34dc24](https://github.com/prettier/prettier-atom/commit/a34dc243f9fe6260b74bb53c4d439fc1c7f17557)), closes [#288](https://github.com/prettier/prettier-atom/issues/288)


### Performance Improvements

* **formatOnSave:** Use setTextViaDiff when updating entire buffer ([c899aaa](https://github.com/prettier/prettier-atom/commit/c899aaad7dae8d8b2ea0e719e2820afe16c88aa0))



# [0.41.0](https://github.com/prettier/prettier-atom/compare/v0.40.0...v0.41.0) (2017-11-13)


### Features

* **css-parser-scopes:** add postcss ([972c6b9](https://github.com/prettier/prettier-atom/commit/972c6b9bb5f96482dbde9f2c2948e816ce650126))
* **markdown:** add markdown support ([8d08bc1](https://github.com/prettier/prettier-atom/commit/8d08bc1929058a08d90292245bbac4a759177cfa)), closes [#303](https://github.com/prettier/prettier-atom/issues/303)
* **prettier:** bump to 1.7.4 ([8cab72f](https://github.com/prettier/prettier-atom/commit/8cab72fac7830dff30a80eb868d279807fe52af5))
* **prettier:** bump to v1.7.3 ([3ebf25c](https://github.com/prettier/prettier-atom/commit/3ebf25c0b63457835aae00b8f54e13aecbc5fb38))
* **prettier-eslint:** bump to 8.2.1 ([4ecae83](https://github.com/prettier/prettier-atom/commit/4ecae83fcb8be12e96e86b758711429340528b07))
* **prettier-eslint:** bump to v8.2.0 ([8f4d33d](https://github.com/prettier/prettier-atom/commit/8f4d33dddde577b58822549e2fed05220733e48a))



# [0.40.0](https://github.com/prettier/prettier-atom/compare/v0.39.0...v0.40.0) (2017-09-20)


### Bug Fixes

* **config:** Update tabWidth's type to be integer first or string ([6f8fe9b](https://github.com/prettier/prettier-atom/commit/6f8fe9bbbdf03f9588e7bb554b206788e3f6c112)), closes [#241](https://github.com/prettier/prettier-atom/issues/241)
* **prettier-eslint:** gracefully handle resolveConfig.sync error ([97ed081](https://github.com/prettier/prettier-atom/commit/97ed081c509584a1560c5a1ba940f2bbe395cc25)), closes [#267](https://github.com/prettier/prettier-atom/issues/267)


### Features

* **error-logging:** log errors to Atom's developer tools ([eddc7bc](https://github.com/prettier/prettier-atom/commit/eddc7bc49800b8668c45476a6860b2fadac841f7))



# [0.39.0](https://github.com/prettier/prettier-atom/compare/v0.38.0...v0.39.0) (2017-09-15)


### Features

* **prettier:** bump bundled version to 1.7.0 ([20281be](https://github.com/prettier/prettier-atom/commit/20281bef02601713bb43f42993671b7744d53b42))
* **prettier-config:** use options from prettier-config if present ([881bd09](https://github.com/prettier/prettier-atom/commit/881bd09d34021bc1d5bf64f81a4df71acb0609ab))
* **prettier-eslint:** bump bundled version to 8.1.0 ([142de95](https://github.com/prettier/prettier-atom/commit/142de95ac9b79dc49665a5bd467a4f7e70e9012e))
* **settings:** add ability not to format on save if a prettier config is not present ([97bdf8e](https://github.com/prettier/prettier-atom/commit/97bdf8e675323f93dae274340dd9617f838ff017))



# [0.38.0](https://github.com/prettier/prettier-atom/compare/v0.37.0...v0.38.0) (2017-08-27)


### Bug Fixes

* **display-of-errors:** show syntax errors for unsaved files ([cc402c9](https://github.com/prettier/prettier-atom/commit/cc402c94e51f510ac2390b8b51fcb5d96a6820bf)), closes [#235](https://github.com/prettier/prettier-atom/issues/235)
* **statusTile:** Fix style scope ([1e563b6](https://github.com/prettier/prettier-atom/commit/1e563b68b64f5f5431fa16adf07d74ed9b711c84))


### Features

* **formatOnSave:** Added 'eslint-plugin-prettier' to list of packages to look for ([#247](https://github.com/prettier/prettier-atom/issues/247)) ([b3a6838](https://github.com/prettier/prettier-atom/commit/b3a6838427bed0f4858e047cd1767af67ff6716c))
* **prettier-eslint:** bump to 4.2.1 ([89bed30](https://github.com/prettier/prettier-atom/commit/89bed301f48113327fdb753b5a62d8007d27117f))



# [0.37.0](https://github.com/prettier/prettier-atom/compare/v0.36.1...v0.37.0) (2017-07-22)


### Bug Fixes

* **errors:** handle errors that aren't syntax errors ([c3d02b0](https://github.com/prettier/prettier-atom/commit/c3d02b037375aabc3f2dcc6e432d4245c7de3866)), closes [#231](https://github.com/prettier/prettier-atom/issues/231)


### Features

* **graphql:** add GraphQl query support (requires language-graphql) ([c3672ca](https://github.com/prettier/prettier-atom/commit/c3672ca9986722b59442e357844cce92701cbc55)), closes [#237](https://github.com/prettier/prettier-atom/issues/237)
* **prettier:** update to 1.5.3 ([85b3d68](https://github.com/prettier/prettier-atom/commit/85b3d68cfd3a70b2422f8e73969fb2f1f5f10195))



## [0.36.1](https://github.com/prettier/prettier-atom/compare/v0.36.0...v0.36.1) (2017-07-07)


### Bug Fixes

* **handleError:** properly handle alternative loc in Prettier errors ([e2dce36](https://github.com/prettier/prettier-atom/commit/e2dce36b53e0ae23a3b244cd9da45e3ed2b40a57)), closes [#229](https://github.com/prettier/prettier-atom/issues/229)



# [0.36.0](https://github.com/prettier/prettier-atom/compare/v0.35.0...v0.36.0) (2017-07-06)


### Bug Fixes

* **debug:** Fix usage of readPkgUp to fetch package info ([4c2561d](https://github.com/prettier/prettier-atom/commit/4c2561dea4b73c00e152b5d601b2996c83a08d4a)), closes [#217](https://github.com/prettier/prettier-atom/issues/217)
* **formatOnSave:** don't prevent user from saving if uncaught error ([8f3bfd9](https://github.com/prettier/prettier-atom/commit/8f3bfd9284f9daa1a6e02bd9d2b00b348e51e87e)), closes [#190](https://github.com/prettier/prettier-atom/issues/190)
* **main:** Subscribe to onDidChangeActivePaneItem when onDidChangeActiveTextEditor is not available ([2efe713](https://github.com/prettier/prettier-atom/commit/2efe7137f9cb43c74b1b168dbc782c03f33e9708)), closes [#205](https://github.com/prettier/prettier-atom/issues/205)
* **prettierOptions:** Always disable trailingComma option for JSON ([600cbc0](https://github.com/prettier/prettier-atom/commit/600cbc0d846d0e3f378ffcf44114d74cec7c0b08)), closes [#212](https://github.com/prettier/prettier-atom/issues/212)


### Features

* **errors:** use linter to display errors ([fc20a8c](https://github.com/prettier/prettier-atom/commit/fc20a8c50c9f4cae9963d1d7dabe1158cb8da919)), closes [#146](https://github.com/prettier/prettier-atom/issues/146)



# [0.35.0](https://github.com/prettier/prettier-atom/compare/v0.34.0...v0.35.0) (2017-06-29)


### Features

* **json:** add JSON support ([112f58a](https://github.com/prettier/prettier-atom/commit/112f58ad6a2e27d1369feacbff16a8c8bcd48a22))
* **prettier:** bump to 1.5.2 ([3519fab](https://github.com/prettier/prettier-atom/commit/3519fabe1763f80c2806632697112d7083518111))



# [0.34.0](https://github.com/prettier/prettier-atom/compare/v0.33.0...v0.34.0) (2017-06-22)


### Bug Fixes

* **save:** On save, use editor provided by observer ([b93ec93](https://github.com/prettier/prettier-atom/commit/b93ec93fcf1a241f6c04ef5bccb115a2fc03e5f3)), closes [#96](https://github.com/prettier/prettier-atom/issues/96)


### Features

* **css:** Add LESS and SCSS to default scopes for CSS files ([d41a008](https://github.com/prettier/prettier-atom/commit/d41a0087b161de68723015175af1bb76ff1a3aae)), closes [#195](https://github.com/prettier/prettier-atom/issues/195)
* **statusTile:** Display status bar tile only if active file matches one of the scopes (file extens ([56467b9](https://github.com/prettier/prettier-atom/commit/56467b9d48b5228b9d4ea20eff73f22d597256d6)), closes [#170](https://github.com/prettier/prettier-atom/issues/170)



# [0.33.0](https://github.com/prettier/prettier-atom/compare/v0.32.0...v0.33.0) (2017-06-08)


### Bug Fixes

* **Settings:** Add missing parser options to settings screen ([7d9f22c](https://github.com/prettier/prettier-atom/commit/7d9f22c73d0875238f55c972787c35034a6b2dad))


### Features

* **format-on-save:** add option to not format on save if prettier not in dependencies ([1a32d47](https://github.com/prettier/prettier-atom/commit/1a32d47a857ece47ee70dc793cc22d88c5e0d516)), closes [#43](https://github.com/prettier/prettier-atom/issues/43)
* **parsers:** add typescript and CSS support ([9882a0b](https://github.com/prettier/prettier-atom/commit/9882a0be05949e880622fdcffd562e8b122e7e6e)), closes [#183](https://github.com/prettier/prettier-atom/issues/183) [#184](https://github.com/prettier/prettier-atom/issues/184)
* **prettier:** bump to 1.4.4 ([aa701a0](https://github.com/prettier/prettier-atom/commit/aa701a0d153b1e5b251b91f0ff29a11e057ff208))
* **prettier-eslint:** bump to 6.3.0 ([103ca8b](https://github.com/prettier/prettier-atom/commit/103ca8b6634cb15a989344e508af0bd3292f723d))



# [0.32.0](https://github.com/prettier/prettier-atom/compare/v0.31.1...v0.32.0) (2017-06-02)


### Bug Fixes

* **warnings:** Check if linter-eslint is actually active instead of reading user config ([88114c6](https://github.com/prettier/prettier-atom/commit/88114c676762dd1d04eb27e541c6ea709db2d977)), closes [#168](https://github.com/prettier/prettier-atom/issues/168)


### Features

* **prettier:** bump to 0.4.1 ([1791886](https://github.com/prettier/prettier-atom/commit/17918864f9dc4948408db18f75447aa8fd17e2f8))



## [0.31.1](https://github.com/prettier/prettier-atom/compare/v0.31.0...v0.31.1) (2017-05-17)


### Bug Fixes

* **debugCommand:** Provide package's absolute path to read package.json ([824dd47](https://github.com/prettier/prettier-atom/commit/824dd479fce86c61f28d91730a1f28123c2267cc)), closes [#156](https://github.com/prettier/prettier-atom/issues/156)



# [0.31.0](https://github.com/prettier/prettier-atom/compare/v0.30.0...v0.31.0) (2017-05-14)


### Bug Fixes

* **statusBar:** Avoid attaching the status bar tile in activate() ([54eb696](https://github.com/prettier/prettier-atom/commit/54eb69695d6693cb7c77aa33175af429b7d23366))


### Features

* **config:** add .editorconfig support ([e2aff36](https://github.com/prettier/prettier-atom/commit/e2aff360436cb6a24fecabd03a834cca0ebdd863))
* **options:** add editorconfig option to package settings ([ad47fae](https://github.com/prettier/prettier-atom/commit/ad47faea64c70547429a452f89c89b38453f6e45))
* **statusBar:** Add an option to show/hide formatOnSave's state in the status bar ([1abded3](https://github.com/prettier/prettier-atom/commit/1abded3d07b46d5bea07f2910cda9904427cf5dd)), closes [#153](https://github.com/prettier/prettier-atom/issues/153)
* **statusBar:** Added click handler to toggle formatOnSave ([2710924](https://github.com/prettier/prettier-atom/commit/2710924d3a587e1b638c8fb43699b4136364717a))



# [0.30.0](https://github.com/prettier/prettier-atom/compare/v0.29.0...v0.30.0) (2017-05-03)


### Features

* **command:** Add a command to toggle "Format on Save" ([bc112c6](https://github.com/prettier/prettier-atom/commit/bc112c60d7ad7aa35853287bfc16efabc8f28eed)), closes [#117](https://github.com/prettier/prettier-atom/issues/117)
* **eslint-fallbacks:** fallback to user's prettier settings if cannot be inferred from eslint confi ([f4520ac](https://github.com/prettier/prettier-atom/commit/f4520ac1a4ae98223f42813e41d475bf7142e421))
* **statusBar:** Add status bar tile to show enabled/disabled state ([f36478b](https://github.com/prettier/prettier-atom/commit/f36478ba8b81adc31d6c80bdcfda8d08b963ec3f))



# [0.29.0](https://github.com/prettier/prettier-atom/compare/v0.28.0...v0.29.0) (2017-04-22)


### Bug Fixes

* **contextMenu:** Enable context menu entry for JSX files ([06e9945](https://github.com/prettier/prettier-atom/commit/06e99452861158940efc9bf709ac8cd958815d01))
* **contextMenu:** Uppercase P for Prettier in context menu entries ([3376665](https://github.com/prettier/prettier-atom/commit/3376665c6e57a36f73e74219c45665465def9fdb))
* **embedded-scripts:** skip single-line script tags in html files ([4f5d1c6](https://github.com/prettier/prettier-atom/commit/4f5d1c65075a6a440cbb3e7e594bd391864831c7))
* **formatOnSave:** Don't format if file is saved for the first time ([2a7c0cd](https://github.com/prettier/prettier-atom/commit/2a7c0cd1df438e95d40e88867922eee48d1df1c2))
* **ignore-globs:** switch to using node-ignore instead of minimatch globs ([5122823](https://github.com/prettier/prettier-atom/commit/5122823572ec3b81b6b4216e21504766042f932b)), closes [#133](https://github.com/prettier/prettier-atom/issues/133)


### Features

* **command:** Add a debug command ([63c91d1](https://github.com/prettier/prettier-atom/commit/63c91d1739f2ed7014df0a65103a827a16b02946))


### Performance Improvements

* **main:** Lazy load displayDebugInfo() ([cac4403](https://github.com/prettier/prettier-atom/commit/cac44030547675f804b075b8aa11b4598a8c10dd))


### BREAKING CHANGES

* **ignore-globs:** Some files that were previously ignored may now no longer be ignored, and vice
versa.



# [0.28.0](https://github.com/prettier/prettier-atom/compare/v0.27.0...v0.28.0) (2017-04-15)


### Features

* **config:** Added config options for the Prettier options 'useTabs' and 'semi' ([b920be7](https://github.com/prettier/prettier-atom/commit/b920be742f854f9fbe9a3e22d99cc521364a4d45))
* **deps:** upgrade to latest prettier(-eslint) ([a13a732](https://github.com/prettier/prettier-atom/commit/a13a7324cfcd7c992812f863ce0801077bf403d1))



# [0.27.0](https://github.com/prettier/prettier-atom/compare/v0.26.0...v0.27.0) (2017-04-13)


### Features

* **deps:** upgrade to the latest prettier-eslint ([f3a0b7f](https://github.com/prettier/prettier-atom/commit/f3a0b7f349e880ad76e58a9a91ebe2d9fe674522))
* **useLocalPrettier:** Prefer local prettier over bundled ([98e2ea9](https://github.com/prettier/prettier-atom/commit/98e2ea90f4b3c63055139e2759d388c653ca16a6))



# [0.26.0](https://github.com/prettier/prettier-atom/compare/v0.25.0...v0.26.0) (2017-04-02)


### Features

* **error:** Cleanup error notification ([95ced9d](https://github.com/prettier/prettier-atom/commit/95ced9de1957e476f754962405900da83fafbac0))



# [0.25.0](https://github.com/prettier/prettier-atom/compare/v0.24.0...v0.25.0) (2017-04-02)


### Bug Fixes

* **config:** Updated description for bracketSpacing option ([9d7051a](https://github.com/prettier/prettier-atom/commit/9d7051abb307cb9559dcab453c2a20660530f67d)), closes [#106](https://github.com/prettier/prettier-atom/issues/106)
* **prettier:** Don't alter text buffer if file is already pretty ([613f28e](https://github.com/prettier/prettier-atom/commit/613f28ec70290e494530d7d00ffc0e0a6435e6b8))


### Features

* **options:** add prettierLast option for prettier-eslint ([0f2714d](https://github.com/prettier/prettier-atom/commit/0f2714dec2c33a7948bc5d3096f10ab35252d3a3))



# [0.24.0](https://github.com/prettier/prettier-atom/compare/v0.23.1...v0.24.0) (2017-03-25)


### Features

* **prettier-eslint:** bump to 4.3.2 ([f5fbb5d](https://github.com/prettier/prettier-atom/commit/f5fbb5d51a87f3d053dd966513fd1199d4e531b3))



## [0.23.1](https://github.com/prettier/prettier-atom/compare/v0.23.0...v0.23.1) (2017-03-15)


### Bug Fixes

* **formatOnSave:** do not format on save after plugin is disabled ([1c7cd9b](https://github.com/prettier/prettier-atom/commit/1c7cd9bedf16b84aff775f5e21e63b64fbf2b077)), closes [#84](https://github.com/prettier/prettier-atom/issues/84)
* **linter:** refresh linter highlighting after format ([9a538e1](https://github.com/prettier/prettier-atom/commit/9a538e135a8c9e8c356ae736964815cbc6317984)), closes [#86](https://github.com/prettier/prettier-atom/issues/86)



# [0.23.0](https://github.com/prettier/prettier-atom/compare/v0.22.0...v0.23.0) (2017-03-09)


### Features

* **whitelist:** force whitelist if provided ([c2a7054](https://github.com/prettier/prettier-atom/commit/c2a70546f913b108cf2aa8f6b972f29c78c73f67))



# [0.22.0](https://github.com/prettier/prettier-atom/compare/v0.21.3...v0.22.0) (2017-03-07)


### Bug Fixes

* **formatOnSave:** don't error when saving a new file ([19b4d04](https://github.com/prettier/prettier-atom/commit/19b4d0462668cc2ba6e7c8049a20dde5f3ece8f4)), closes [#79](https://github.com/prettier/prettier-atom/issues/79)


### Features

* **whitelist-globs:** add ability to whitelist globs ([2369c44](https://github.com/prettier/prettier-atom/commit/2369c449bf73a3efc02640f72e0385925d739464)), closes [#62](https://github.com/prettier/prettier-atom/issues/62)



## [0.21.3](https://github.com/prettier/prettier-atom/compare/v0.21.2...v0.21.3) (2017-03-06)


### Bug Fixes

* **$config:** Unset old config options causing errors ([5f221d5](https://github.com/prettier/prettier-atom/commit/5f221d5bff76fb67ff58850ff8a02a0719ad2564)), closes [#72](https://github.com/prettier/prettier-atom/issues/72)
* **excludedGlobs:** Respect excluded globs when formatting on save ([a178813](https://github.com/prettier/prettier-atom/commit/a1788130e328c9afbe8239b2d144e3c798462f46)), closes [#73](https://github.com/prettier/prettier-atom/issues/73)



## [0.21.2](https://github.com/prettier/prettier-atom/compare/v0.21.1...v0.21.2) (2017-03-06)


### Bug Fixes

* **$formatOnSave:** Fix error when no .eslintignore is found ([94d7750](https://github.com/prettier/prettier-atom/commit/94d775024aa23c9e346bbc30c8f0eec85044a5c1)), closes [#67](https://github.com/prettier/prettier-atom/issues/67)



## [0.21.1](https://github.com/prettier/prettier-atom/compare/v0.21.0...v0.21.1) (2017-03-05)


### Bug Fixes

* **$formatOnSave:** Handle null filePath ([2eb398c](https://github.com/prettier/prettier-atom/commit/2eb398ccb440f893f082971bb6edaac34a448a99)), closes [#67](https://github.com/prettier/prettier-atom/issues/67)



# [0.21.0](https://github.com/prettier/prettier-atom/compare/v0.20.0...v0.21.0) (2017-03-05)


### Features

* **$linter-eslint:** Warn about linter-eslint "Format on Save" ([ac9b1d0](https://github.com/prettier/prettier-atom/commit/ac9b1d0ae1c21813df3aa8eb44e0e7d0a40210d1)), closes [#63](https://github.com/prettier/prettier-atom/issues/63)



# [0.20.0](https://github.com/prettier/prettier-atom/compare/v0.19.1...v0.20.0) (2017-03-05)



## [0.19.1](https://github.com/prettier/prettier-atom/compare/v0.19.0...v0.19.1) (2017-03-05)


### Features

* **$prettier-eslint:** Integrate prettier-eslint ([002c2a7](https://github.com/prettier/prettier-atom/commit/002c2a70f09590c9c85ddd4e652e6a1c5d0f1c1a)), closes [#57](https://github.com/prettier/prettier-atom/issues/57)



# [0.19.0](https://github.com/prettier/prettier-atom/compare/v0.18.1...v0.19.0) (2017-02-24)



## [0.18.1](https://github.com/prettier/prettier-atom/compare/v0.18.0...v0.18.1) (2017-02-21)



# [0.18.0](https://github.com/prettier/prettier-atom/compare/v0.17.0...v0.18.0) (2017-02-17)



# [0.17.0](https://github.com/prettier/prettier-atom/compare/v0.16.0...v0.17.0) (2017-02-14)



# [0.16.0](https://github.com/prettier/prettier-atom/compare/v0.15.0...v0.16.0) (2017-02-06)



# [0.15.0](https://github.com/prettier/prettier-atom/compare/v0.11.0...v0.15.0) (2017-02-03)



# [0.11.0](https://github.com/prettier/prettier-atom/compare/v0.0.10...v0.11.0) (2017-01-24)



## [0.0.10](https://github.com/prettier/prettier-atom/compare/v0.0.9...v0.0.10) (2017-01-20)



## [0.0.9](https://github.com/prettier/prettier-atom/compare/v0.0.8...v0.0.9) (2017-01-19)



## [0.0.8](https://github.com/prettier/prettier-atom/compare/v0.0.7...v0.0.8) (2017-01-17)



## [0.0.7](https://github.com/prettier/prettier-atom/compare/v0.0.6...v0.0.7) (2017-01-15)



## [0.0.6](https://github.com/prettier/prettier-atom/compare/v0.0.5...v0.0.6) (2017-01-13)



## [0.0.5](https://github.com/prettier/prettier-atom/compare/v0.0.4...v0.0.5) (2017-01-11)



## [0.0.4](https://github.com/prettier/prettier-atom/compare/v0.0.3...v0.0.4) (2017-01-11)



## 0.0.3 (2017-01-10)



