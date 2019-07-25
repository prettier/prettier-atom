## [0.57.2](https://github.com/prettier/prettier-atom/compare/v0.57.1...v0.57.2) (2019-07-25)


### Bug Fixes

* **deps:** correctly use new pkg-up, fixup f5a0b18, [#507](https://github.com/prettier/prettier-atom/issues/507) ([88285be](https://github.com/prettier/prettier-atom/commit/88285be)), closes [#510](https://github.com/prettier/prettier-atom/issues/510)



## [0.57.1](https://github.com/prettier/prettier-atom/compare/v0.57.0...v0.57.1) (2019-07-19)


### Bug Fixes

* **debug:** read-pkg-up@6 BC break, renamed pkg to package ([114cfb1](https://github.com/prettier/prettier-atom/commit/114cfb1))



# [0.57.0](https://github.com/prettier/prettier-atom/compare/v0.56.6...v0.57.0) (2019-07-10)


### Features

* **prettier:** bump to version 1.18.2 ([16ecb0d](https://github.com/prettier/prettier-atom/commit/16ecb0d))
* **prettier-eslint:** bump to version 9.0.0 ([3019316](https://github.com/prettier/prettier-atom/commit/3019316))



## [0.56.6](https://github.com/prettier/prettier-atom/compare/v0.56.5...v0.56.6) (2019-05-21)


### Bug Fixes

* **prettierignore:** Revert mistake with path passed to prettier.getFileInfo ([850d639](https://github.com/prettier/prettier-atom/commit/850d639))



## [0.56.5](https://github.com/prettier/prettier-atom/compare/v0.56.4...v0.56.5) (2019-05-16)


### Bug Fixes

* **prettierignore:** Pass relative instead of absolute path to prettier.getFileInfo ([f045749](https://github.com/prettier/prettier-atom/commit/f045749))


### Features

* Add option to enable format-on-save for files in node_modules ([6e8a506](https://github.com/prettier/prettier-atom/commit/6e8a506))



## [0.56.4](https://github.com/prettier/prettier-atom/compare/v0.56.3...v0.56.4) (2019-02-20)


### Performance Improvements

* **startup:** Remove lazy loading code. ([fab3baf](https://github.com/prettier/prettier-atom/commit/fab3baf))



## [0.56.3](https://github.com/prettier/prettier-atom/compare/v0.56.2...v0.56.3) (2019-02-15)


### Performance Improvements

* **startup:** defer activating the package until the window is loaded ([fd658ef](https://github.com/prettier/prettier-atom/commit/fd658ef))



## [0.56.2](https://github.com/prettier/prettier-atom/compare/v0.56.1...v0.56.2) (2018-12-06)


### Bug Fixes

* ensure we always pass a relative path to `ignore` pkg ([477d6aa](https://github.com/prettier/prettier-atom/commit/477d6aa)), closes [#473](https://github.com/prettier/prettier-atom/issues/473)



## [0.56.1](https://github.com/prettier/prettier-atom/compare/v0.56.0...v0.56.1) (2018-12-03)


### Bug Fixes

* properly format HTML and VUE files ([b91ea02](https://github.com/prettier/prettier-atom/commit/b91ea02)), closes [#467](https://github.com/prettier/prettier-atom/issues/467)



# [0.56.0](https://github.com/prettier/prettier-atom/compare/v0.55.2...v0.56.0) (2018-11-19)


### Bug Fixes

* **ignores:** ensure we always pass a relative string to the ignores package ([c6ad510](https://github.com/prettier/prettier-atom/commit/c6ad510))


### Features

* **prettier:** bump to version 1.15.2 ([c3ff578](https://github.com/prettier/prettier-atom/commit/c3ff578))
* **prettier-eslint:** bump to version 8.8.2 ([de77987](https://github.com/prettier/prettier-atom/commit/de77987))



## [0.55.2](https://github.com/prettier/prettier-atom/compare/v0.55.1...v0.55.2) (2018-08-23)


### Bug Fixes

* **prettierignore:** properly ignore files again ([dd4c849](https://github.com/prettier/prettier-atom/commit/dd4c849)), closes [#404](https://github.com/prettier/prettier-atom/issues/404) [#446](https://github.com/prettier/prettier-atom/issues/446)



## [0.55.1](https://github.com/prettier/prettier-atom/compare/v0.55.0...v0.55.1) (2018-08-21)


### Bug Fixes

* properly use prettier config when formatting ([fef2441](https://github.com/prettier/prettier-atom/commit/fef2441)), closes [#441](https://github.com/prettier/prettier-atom/issues/441)



# [0.55.0](https://github.com/prettier/prettier-atom/compare/v0.54.0...v0.55.0) (2018-08-20)


### Bug Fixes

* **styles:** status color will now match theme ([cf2ef16](https://github.com/prettier/prettier-atom/commit/cf2ef16))


### Features

* **errors:** do not display a popup for "undefined" error messages ([d6a25f5](https://github.com/prettier/prettier-atom/commit/d6a25f5))
* **prettier:** use Prettier to determine whether a file is formattable ([03275d1](https://github.com/prettier/prettier-atom/commit/03275d1))
* **settings:** simplify settings by relying on users setting their prettierrc files ([27d3012](https://github.com/prettier/prettier-atom/commit/27d3012))


### BREAKING CHANGES

* **prettier:** Because prettier-atom now relies on the new `getFileInfo` method recently added to
Prettier, if you are having prettier-atom use a local version of Prettier instead of the version
that is packaged with the plugin, you will need to manually update your project's local Prettier
version.



# [0.54.0](https://github.com/prettier/prettier-atom/compare/v0.53.0...v0.54.0) (2018-06-05)


### Bug Fixes

* **.babelrc:** Fix usage of babel-preset-env. ([78c10e3](https://github.com/prettier/prettier-atom/commit/78c10e3))
* **dist/:** Rebuild dist to properly target electron@1.4.0 ([831f086](https://github.com/prettier/prettier-atom/commit/831f086))


### Features

* **prettier:** bump to 1.13.4 ([1c7c30d](https://github.com/prettier/prettier-atom/commit/1c7c30d))
* **prettier:** bump to version 1.12.1 ([b6638d2](https://github.com/prettier/prettier-atom/commit/b6638d2))



# [0.53.0](https://github.com/prettier/prettier-atom/compare/v0.52.0...v0.53.0) (2018-03-24)


### Bug Fixes

* **eslintignore:** respect eslintignore setting ([59a1828](https://github.com/prettier/prettier-atom/commit/59a1828)), closes [#347](https://github.com/prettier/prettier-atom/issues/347)


### Features

* **prettier:** Fallback to globally installed prettier (via npm or yarn) before falling back to a bundled one ([3ed996c](https://github.com/prettier/prettier-atom/commit/3ed996c))



# [0.52.0](https://github.com/prettier/prettier-atom/compare/v0.51.0...v0.52.0) (2018-03-14)


### Features

* **prettier:** bump prettier to 1.11.1 and prettier-eslint to 8.8.1 ([4e8d85e](https://github.com/prettier/prettier-atom/commit/4e8d85e))



# [0.51.0](https://github.com/prettier/prettier-atom/compare/v0.50.0...v0.51.0) (2018-02-14)


### Bug Fixes

* Fix asynchronous saves ([be1bd05](https://github.com/prettier/prettier-atom/commit/be1bd05))
* **buildPrettierOptions.js:** Allow EditorConfig with prettier-atom settings ([dedc690](https://github.com/prettier/prettier-atom/commit/dedc690)), closes [#377](https://github.com/prettier/prettier-atom/issues/377)


### Code Refactoring

* **buildEditorConfigOptions.js:** Use editorconfig-to-prettier ([e262f50](https://github.com/prettier/prettier-atom/commit/e262f50))


### BREAKING CHANGES

* **buildEditorConfigOptions.js:** Derives prettier config options from editorconfig differently



# [0.50.0](https://github.com/prettier/prettier-atom/compare/v0.49.2...v0.50.0) (2018-02-09)


### Code Refactoring

* **buildPrettierOptions.js:** Exclusively use local config or plugin settings ([1141b2c](https://github.com/prettier/prettier-atom/commit/1141b2c)), closes [#370](https://github.com/prettier/prettier-atom/issues/370) [#218](https://github.com/prettier/prettier-atom/issues/218)


### BREAKING CHANGES

* **buildPrettierOptions.js:** The formatting configuration is now built according to different rules



## [0.49.2](https://github.com/prettier/prettier-atom/compare/v0.49.1...v0.49.2) (2018-02-03)


### Bug Fixes

* **executePrettier:** adjust for API inconsistencies + add type coverage ([800c0e2](https://github.com/prettier/prettier-atom/commit/800c0e2))



## [0.49.1](https://github.com/prettier/prettier-atom/compare/v0.49.0...v0.49.1) (2018-02-02)


### Bug Fixes

* **executePrettier:** fallback to `format` when `formatWithCursor` fails ([105f9e1](https://github.com/prettier/prettier-atom/commit/105f9e1))



# [0.49.0](https://github.com/prettier/prettier-atom/compare/v0.48.1...v0.49.0) (2018-01-30)


### Features

* **executePrettier:** Maintain cursor position on format ([159b2b2](https://github.com/prettier/prettier-atom/commit/159b2b2))



## [0.48.1](https://github.com/prettier/prettier-atom/compare/v0.48.0...v0.48.1) (2018-01-25)


### Bug Fixes

* **editorInterface:** use File.getpath over reading the path directly ([3b89260](https://github.com/prettier/prettier-atom/commit/3b89260))



# [0.48.0](https://github.com/prettier/prettier-atom/compare/v0.47.2...v0.48.0) (2018-01-17)


### Features

* **prettier-eslint:** bump to 8.7.6 ([332c6f4](https://github.com/prettier/prettier-atom/commit/332c6f4)), closes [#334](https://github.com/prettier/prettier-atom/issues/334)



## [0.47.2](https://github.com/prettier/prettier-atom/compare/v0.47.1...v0.47.2) (2018-01-17)


### Bug Fixes

* **prettier-eslint:** lock version to 8.4.0 ([1a3e885](https://github.com/prettier/prettier-atom/commit/1a3e885))



## [0.47.1](https://github.com/prettier/prettier-atom/compare/v0.47.0...v0.47.1) (2018-01-17)


### Bug Fixes

* **prettier-eslint:** lock to 8.6.2 to avoid regression ([e9d2a85](https://github.com/prettier/prettier-atom/commit/e9d2a85))



# [0.47.0](https://github.com/prettier/prettier-atom/compare/v0.46.0...v0.47.0) (2018-01-15)


### Features

* **scopes:** Support Vue Single File Components ([707e107](https://github.com/prettier/prettier-atom/commit/707e107)), closes [#327](https://github.com/prettier/prettier-atom/issues/327)



# [0.46.0](https://github.com/prettier/prettier-atom/compare/v0.45.0...v0.46.0) (2018-01-05)


### Features

* **options:** add arrow-parens prettier option ([805f183](https://github.com/prettier/prettier-atom/commit/805f183))



# [0.45.0](https://github.com/prettier/prettier-atom/compare/v0.44.0...v0.45.0) (2017-12-31)


### Bug Fixes

* **manual-format:** fix bug from forgetting to rebuild dist ([2121038](https://github.com/prettier/prettier-atom/commit/2121038)), closes [#336](https://github.com/prettier/prettier-atom/issues/336)


### Performance Improvements

* **statusTile:** faster array creation and lodash lazy loading ([5f90f45](https://github.com/prettier/prettier-atom/commit/5f90f45)), closes [#330](https://github.com/prettier/prettier-atom/issues/330)



# [0.44.0](https://github.com/prettier/prettier-atom/compare/v0.43.1...v0.44.0) (2017-12-31)


### Bug Fixes

* **set-text-via-diff:** base use on option instead of flaky buffer range comparison ([378b6bd](https://github.com/prettier/prettier-atom/commit/378b6bd))


### Features

* **prettier:** bump to 1.9.2 ([3186833](https://github.com/prettier/prettier-atom/commit/3186833))
* **prettier-eslint:** bump to 8.7.0 ([c59b768](https://github.com/prettier/prettier-atom/commit/c59b768))



## [0.43.1](https://github.com/prettier/prettier-atom/compare/v0.43.0...v0.43.1) (2017-12-10)


### Bug Fixes

* **async-polyfill:** switch from babel-polyfill to babel-runtime ([61ea645](https://github.com/prettier/prettier-atom/commit/61ea645)), closes [#315](https://github.com/prettier/prettier-atom/issues/315)
* **linter:** resolve issue with linter not showing error messages properly ([2550a8f](https://github.com/prettier/prettier-atom/commit/2550a8f)), closes [#318](https://github.com/prettier/prettier-atom/issues/318) [#298](https://github.com/prettier/prettier-atom/issues/298)



# [0.43.0](https://github.com/prettier/prettier-atom/compare/v0.41.0...v0.43.0) (2017-12-05)


### Bug Fixes

* **config-schema:** add `text.md` to default markdown scopes ([aa7ecd1](https://github.com/prettier/prettier-atom/commit/aa7ecd1))


### Features

* **prettier-stylelint:** Add support for prettier-stylelint ([a34dc24](https://github.com/prettier/prettier-atom/commit/a34dc24)), closes [#288](https://github.com/prettier/prettier-atom/issues/288)


### Performance Improvements

* **formatOnSave:** Use setTextViaDiff when updating entire buffer ([c899aaa](https://github.com/prettier/prettier-atom/commit/c899aaa))



# [0.41.0](https://github.com/prettier/prettier-atom/compare/v0.40.0...v0.41.0) (2017-11-13)


### Features

* **css-parser-scopes:** add postcss ([972c6b9](https://github.com/prettier/prettier-atom/commit/972c6b9))
* **markdown:** add markdown support ([8d08bc1](https://github.com/prettier/prettier-atom/commit/8d08bc1)), closes [#303](https://github.com/prettier/prettier-atom/issues/303)
* **prettier:** bump to 1.7.4 ([8cab72f](https://github.com/prettier/prettier-atom/commit/8cab72f))
* **prettier:** bump to v1.7.3 ([3ebf25c](https://github.com/prettier/prettier-atom/commit/3ebf25c))
* **prettier-eslint:** bump to 8.2.1 ([4ecae83](https://github.com/prettier/prettier-atom/commit/4ecae83))
* **prettier-eslint:** bump to v8.2.0 ([8f4d33d](https://github.com/prettier/prettier-atom/commit/8f4d33d))



# [0.40.0](https://github.com/prettier/prettier-atom/compare/v0.39.0...v0.40.0) (2017-09-20)


### Bug Fixes

* **config:** Update tabWidth's type to be integer first or string ([6f8fe9b](https://github.com/prettier/prettier-atom/commit/6f8fe9b)), closes [#241](https://github.com/prettier/prettier-atom/issues/241)
* **prettier-eslint:** gracefully handle resolveConfig.sync error ([97ed081](https://github.com/prettier/prettier-atom/commit/97ed081)), closes [#267](https://github.com/prettier/prettier-atom/issues/267)


### Features

* **error-logging:** log errors to Atom's developer tools ([eddc7bc](https://github.com/prettier/prettier-atom/commit/eddc7bc))



# [0.39.0](https://github.com/prettier/prettier-atom/compare/v0.38.0...v0.39.0) (2017-09-15)


### Features

* **prettier:** bump bundled version to 1.7.0 ([20281be](https://github.com/prettier/prettier-atom/commit/20281be))
* **prettier-config:** use options from prettier-config if present ([881bd09](https://github.com/prettier/prettier-atom/commit/881bd09))
* **prettier-eslint:** bump bundled version to 8.1.0 ([142de95](https://github.com/prettier/prettier-atom/commit/142de95))
* **settings:** add ability not to format on save if a prettier config is not present ([97bdf8e](https://github.com/prettier/prettier-atom/commit/97bdf8e))



# [0.38.0](https://github.com/prettier/prettier-atom/compare/v0.37.0...v0.38.0) (2017-08-27)


### Bug Fixes

* **display-of-errors:** show syntax errors for unsaved files ([cc402c9](https://github.com/prettier/prettier-atom/commit/cc402c9)), closes [#235](https://github.com/prettier/prettier-atom/issues/235)
* **statusTile:** Fix style scope ([1e563b6](https://github.com/prettier/prettier-atom/commit/1e563b6))


### Features

* **formatOnSave:** Added 'eslint-plugin-prettier' to list of packages to look for ([#247](https://github.com/prettier/prettier-atom/issues/247)) ([b3a6838](https://github.com/prettier/prettier-atom/commit/b3a6838))
* **prettier-eslint:** bump to 4.2.1 ([89bed30](https://github.com/prettier/prettier-atom/commit/89bed30))



# [0.37.0](https://github.com/prettier/prettier-atom/compare/v0.36.1...v0.37.0) (2017-07-22)


### Bug Fixes

* **errors:** handle errors that aren't syntax errors ([c3d02b0](https://github.com/prettier/prettier-atom/commit/c3d02b0)), closes [#231](https://github.com/prettier/prettier-atom/issues/231)


### Features

* **graphql:** add GraphQl query support (requires language-graphql) ([c3672ca](https://github.com/prettier/prettier-atom/commit/c3672ca)), closes [#237](https://github.com/prettier/prettier-atom/issues/237)
* **prettier:** update to 1.5.3 ([85b3d68](https://github.com/prettier/prettier-atom/commit/85b3d68))



## [0.36.1](https://github.com/prettier/prettier-atom/compare/v0.36.0...v0.36.1) (2017-07-07)


### Bug Fixes

* **handleError:** properly handle alternative loc in Prettier errors ([e2dce36](https://github.com/prettier/prettier-atom/commit/e2dce36)), closes [#229](https://github.com/prettier/prettier-atom/issues/229)



# [0.36.0](https://github.com/prettier/prettier-atom/compare/v0.35.0...v0.36.0) (2017-07-06)


### Bug Fixes

* **debug:** Fix usage of readPkgUp to fetch package info ([4c2561d](https://github.com/prettier/prettier-atom/commit/4c2561d)), closes [#217](https://github.com/prettier/prettier-atom/issues/217)
* **formatOnSave:** don't prevent user from saving if uncaught error ([8f3bfd9](https://github.com/prettier/prettier-atom/commit/8f3bfd9)), closes [#190](https://github.com/prettier/prettier-atom/issues/190)
* **main:** Subscribe to onDidChangeActivePaneItem when onDidChangeActiveTextEditor is not available ([2efe713](https://github.com/prettier/prettier-atom/commit/2efe713)), closes [#205](https://github.com/prettier/prettier-atom/issues/205)
* **prettierOptions:** Always disable trailingComma option for JSON ([600cbc0](https://github.com/prettier/prettier-atom/commit/600cbc0)), closes [#212](https://github.com/prettier/prettier-atom/issues/212)


### Features

* **errors:** use linter to display errors ([fc20a8c](https://github.com/prettier/prettier-atom/commit/fc20a8c)), closes [#146](https://github.com/prettier/prettier-atom/issues/146)



# [0.35.0](https://github.com/prettier/prettier-atom/compare/v0.34.0...v0.35.0) (2017-06-29)


### Features

* **json:** add JSON support ([112f58a](https://github.com/prettier/prettier-atom/commit/112f58a))
* **prettier:** bump to 1.5.2 ([3519fab](https://github.com/prettier/prettier-atom/commit/3519fab))



# [0.34.0](https://github.com/prettier/prettier-atom/compare/v0.33.0...v0.34.0) (2017-06-22)


### Bug Fixes

* **save:** On save, use editor provided by observer ([b93ec93](https://github.com/prettier/prettier-atom/commit/b93ec93)), closes [#96](https://github.com/prettier/prettier-atom/issues/96)


### Features

* **css:** Add LESS and SCSS to default scopes for CSS files ([d41a008](https://github.com/prettier/prettier-atom/commit/d41a008)), closes [#195](https://github.com/prettier/prettier-atom/issues/195)
* **statusTile:** Display status bar tile only if active file matches one of the scopes (file extens ([56467b9](https://github.com/prettier/prettier-atom/commit/56467b9)), closes [#170](https://github.com/prettier/prettier-atom/issues/170)



# [0.33.0](https://github.com/prettier/prettier-atom/compare/v0.32.0...v0.33.0) (2017-06-08)


### Bug Fixes

* **Settings:** Add missing parser options to settings screen ([7d9f22c](https://github.com/prettier/prettier-atom/commit/7d9f22c))


### Features

* **format-on-save:** add option to not format on save if prettier not in dependencies ([1a32d47](https://github.com/prettier/prettier-atom/commit/1a32d47)), closes [#43](https://github.com/prettier/prettier-atom/issues/43)
* **parsers:** add typescript and CSS support ([9882a0b](https://github.com/prettier/prettier-atom/commit/9882a0b)), closes [#183](https://github.com/prettier/prettier-atom/issues/183) [#184](https://github.com/prettier/prettier-atom/issues/184)
* **prettier:** bump to 1.4.4 ([aa701a0](https://github.com/prettier/prettier-atom/commit/aa701a0))
* **prettier-eslint:** bump to 6.3.0 ([103ca8b](https://github.com/prettier/prettier-atom/commit/103ca8b))



# [0.32.0](https://github.com/prettier/prettier-atom/compare/v0.31.1...v0.32.0) (2017-06-02)


### Bug Fixes

* **warnings:** Check if linter-eslint is actually active instead of reading user config ([88114c6](https://github.com/prettier/prettier-atom/commit/88114c6)), closes [#168](https://github.com/prettier/prettier-atom/issues/168)


### Features

* **prettier:** bump to 0.4.1 ([1791886](https://github.com/prettier/prettier-atom/commit/1791886))



## [0.31.1](https://github.com/prettier/prettier-atom/compare/v0.31.0...v0.31.1) (2017-05-17)


### Bug Fixes

* **debugCommand:** Provide package's absolute path to read package.json ([824dd47](https://github.com/prettier/prettier-atom/commit/824dd47)), closes [#156](https://github.com/prettier/prettier-atom/issues/156)



# [0.31.0](https://github.com/prettier/prettier-atom/compare/v0.30.0...v0.31.0) (2017-05-14)


### Bug Fixes

* **statusBar:** Avoid attaching the status bar tile in activate() ([54eb696](https://github.com/prettier/prettier-atom/commit/54eb696))


### Features

* **options:** add editorconfig option to package settings ([ad47fae](https://github.com/prettier/prettier-atom/commit/ad47fae))
* **statusBar:** Add an option to show/hide formatOnSave's state in the status bar ([1abded3](https://github.com/prettier/prettier-atom/commit/1abded3)), closes [#153](https://github.com/prettier/prettier-atom/issues/153)
* **statusBar:** Added click handler to toggle formatOnSave ([2710924](https://github.com/prettier/prettier-atom/commit/2710924))



# [0.30.0](https://github.com/prettier/prettier-atom/compare/v0.29.0...v0.30.0) (2017-05-03)


### Features

* **command:** Add a command to toggle "Format on Save" ([bc112c6](https://github.com/prettier/prettier-atom/commit/bc112c6)), closes [#117](https://github.com/prettier/prettier-atom/issues/117)
* **config:** add .editorconfig support ([e2aff36](https://github.com/prettier/prettier-atom/commit/e2aff36))
* **eslint-fallbacks:** fallback to user's prettier settings if cannot be inferred from eslint confi ([f4520ac](https://github.com/prettier/prettier-atom/commit/f4520ac))
* **statusBar:** Add status bar tile to show enabled/disabled state ([f36478b](https://github.com/prettier/prettier-atom/commit/f36478b))



# [0.29.0](https://github.com/prettier/prettier-atom/compare/v0.28.0...v0.29.0) (2017-04-22)


### Bug Fixes

* **contextMenu:** Enable context menu entry for JSX files ([06e9945](https://github.com/prettier/prettier-atom/commit/06e9945))
* **contextMenu:** Uppercase P for Prettier in context menu entries ([3376665](https://github.com/prettier/prettier-atom/commit/3376665))
* **embedded-scripts:** skip single-line script tags in html files ([4f5d1c6](https://github.com/prettier/prettier-atom/commit/4f5d1c6))
* **formatOnSave:** Don't format if file is saved for the first time ([2a7c0cd](https://github.com/prettier/prettier-atom/commit/2a7c0cd))
* **ignore-globs:** switch to using node-ignore instead of minimatch globs ([5122823](https://github.com/prettier/prettier-atom/commit/5122823)), closes [#133](https://github.com/prettier/prettier-atom/issues/133)


### Features

* **command:** Add a debug command ([63c91d1](https://github.com/prettier/prettier-atom/commit/63c91d1))


### Performance Improvements

* **main:** Lazy load displayDebugInfo() ([cac4403](https://github.com/prettier/prettier-atom/commit/cac4403))


### BREAKING CHANGES

* **ignore-globs:** Some files that were previously ignored may now no longer be ignored, and vice
versa.



# [0.28.0](https://github.com/prettier/prettier-atom/compare/v0.27.0...v0.28.0) (2017-04-15)


### Features

* **config:** Added config options for the Prettier options 'useTabs' and 'semi' ([b920be7](https://github.com/prettier/prettier-atom/commit/b920be7))
* **deps:** upgrade to latest prettier(-eslint) ([a13a732](https://github.com/prettier/prettier-atom/commit/a13a732))



# [0.27.0](https://github.com/prettier/prettier-atom/compare/v0.26.0...v0.27.0) (2017-04-13)


### Features

* **deps:** upgrade to the latest prettier-eslint ([f3a0b7f](https://github.com/prettier/prettier-atom/commit/f3a0b7f))
* **useLocalPrettier:** Prefer local prettier over bundled ([98e2ea9](https://github.com/prettier/prettier-atom/commit/98e2ea9))



# [0.26.0](https://github.com/prettier/prettier-atom/compare/v0.25.0...v0.26.0) (2017-04-02)


### Features

* **error:** Cleanup error notification ([95ced9d](https://github.com/prettier/prettier-atom/commit/95ced9d))



# [0.25.0](https://github.com/prettier/prettier-atom/compare/v0.24.0...v0.25.0) (2017-04-02)


### Bug Fixes

* **config:** Updated description for bracketSpacing option ([9d7051a](https://github.com/prettier/prettier-atom/commit/9d7051a)), closes [#106](https://github.com/prettier/prettier-atom/issues/106)
* **prettier:** Don't alter text buffer if file is already pretty ([613f28e](https://github.com/prettier/prettier-atom/commit/613f28e))


### Features

* **options:** add prettierLast option for prettier-eslint ([0f2714d](https://github.com/prettier/prettier-atom/commit/0f2714d))



# [0.24.0](https://github.com/prettier/prettier-atom/compare/v0.23.1...v0.24.0) (2017-03-25)


### Features

* **prettier-eslint:** bump to 4.3.2 ([f5fbb5d](https://github.com/prettier/prettier-atom/commit/f5fbb5d))



## [0.23.1](https://github.com/prettier/prettier-atom/compare/v0.23.0...v0.23.1) (2017-03-15)


### Bug Fixes

* **formatOnSave:** do not format on save after plugin is disabled ([1c7cd9b](https://github.com/prettier/prettier-atom/commit/1c7cd9b)), closes [#84](https://github.com/prettier/prettier-atom/issues/84)
* **linter:** refresh linter highlighting after format ([9a538e1](https://github.com/prettier/prettier-atom/commit/9a538e1)), closes [#86](https://github.com/prettier/prettier-atom/issues/86)



# [0.23.0](https://github.com/prettier/prettier-atom/compare/v0.22.0...v0.23.0) (2017-03-09)


### Features

* **whitelist:** force whitelist if provided ([c2a7054](https://github.com/prettier/prettier-atom/commit/c2a7054))



# [0.22.0](https://github.com/prettier/prettier-atom/compare/v0.21.3...v0.22.0) (2017-03-07)


### Bug Fixes

* **formatOnSave:** don't error when saving a new file ([19b4d04](https://github.com/prettier/prettier-atom/commit/19b4d04)), closes [#79](https://github.com/prettier/prettier-atom/issues/79)


### Features

* **whitelist-globs:** add ability to whitelist globs ([2369c44](https://github.com/prettier/prettier-atom/commit/2369c44)), closes [#62](https://github.com/prettier/prettier-atom/issues/62)



## [0.21.3](https://github.com/prettier/prettier-atom/compare/v0.21.2...v0.21.3) (2017-03-06)


### Bug Fixes

* **$config:** Unset old config options causing errors ([5f221d5](https://github.com/prettier/prettier-atom/commit/5f221d5)), closes [#72](https://github.com/prettier/prettier-atom/issues/72)
* **excludedGlobs:** Respect excluded globs when formatting on save ([a178813](https://github.com/prettier/prettier-atom/commit/a178813)), closes [#73](https://github.com/prettier/prettier-atom/issues/73)



## [0.21.2](https://github.com/prettier/prettier-atom/compare/v0.21.1...v0.21.2) (2017-03-06)


### Bug Fixes

* **$formatOnSave:** Fix error when no .eslintignore is found ([94d7750](https://github.com/prettier/prettier-atom/commit/94d7750)), closes [#67](https://github.com/prettier/prettier-atom/issues/67)



## [0.21.1](https://github.com/prettier/prettier-atom/compare/v0.21.0...v0.21.1) (2017-03-05)


### Bug Fixes

* **$formatOnSave:** Handle null filePath ([2eb398c](https://github.com/prettier/prettier-atom/commit/2eb398c)), closes [#67](https://github.com/prettier/prettier-atom/issues/67)



# [0.21.0](https://github.com/prettier/prettier-atom/compare/v0.20.0...v0.21.0) (2017-03-05)


### Features

* **$linter-eslint:** Warn about linter-eslint "Format on Save" ([ac9b1d0](https://github.com/prettier/prettier-atom/commit/ac9b1d0)), closes [#63](https://github.com/prettier/prettier-atom/issues/63)



# [0.20.0](https://github.com/prettier/prettier-atom/compare/v0.19.1...v0.20.0) (2017-03-05)



## [0.19.1](https://github.com/prettier/prettier-atom/compare/v0.19.0...v0.19.1) (2017-03-05)


### Features

* **$prettier-eslint:** Integrate prettier-eslint ([002c2a7](https://github.com/prettier/prettier-atom/commit/002c2a7)), closes [#57](https://github.com/prettier/prettier-atom/issues/57)



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



