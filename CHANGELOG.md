

### [2.0.1](https://github.com/MorevM/equal-heights/compare/v2.0.0...v2.0.1) (2024-05-24)

No notable changes in this release.

## [2.0.0](https://github.com/MorevM/equal-heights/compare/v1.0.0...v2.0.0) (2024-05-24)


### ⚠ BREAKING CHANGES

* The library is no longer transpiled and minified.
Transform to suit your needs and minify on your side.

### Chores

* Mark the package as side-effects free ([ab9f5da](https://github.com/MorevM/equal-heights/commit/ab9f5dab757a2001655433ca302ef99f99f1b7d7))
* Remove babel & terser plugins ([86a66a5](https://github.com/MorevM/equal-heights/commit/86a66a55cde2399062af1337ce457e1d81432bd7))
* Replace legacy `@morev/helpers` dependency with `@morev/utils` ([005c2ed](https://github.com/MorevM/equal-heights/commit/005c2edfde9778f3865933c3e6e3679557303282))


### CI improvements

* Inject latest changelog entry into GH release ([37212fc](https://github.com/MorevM/equal-heights/commit/37212fc91c44a212105358d5fc0d6858b489075a))
* Run actions using Node 20 ([5a84b00](https://github.com/MorevM/equal-heights/commit/5a84b00d3756a7ba0bc1acb506468654c3ede538))

## [1.0.0](https://github.com/MorevM/equal-heights/compare/v0.1.7...v1.0.0) (2024-01-12)


### ⚠ BREAKING CHANGES

* As updated `@morev/helpers` package includes `ohash` dependency, an additional transpile option may be required.

### Chores

* Upgrade `@morev/helpers` package to latest ([e290cd3](https://github.com/MorevM/equal-heights/commit/e290cd3f77edbac85e5c8615620fd0b8a75ef168))

### [0.1.7](https://github.com/MorevM/equal-heights/compare/v0.1.6...v0.1.7) (2022-11-03)


### Bug fixes

* Use correct return values using updated `@morev/helpers` ([a232396](https://github.com/MorevM/equal-heights/commit/a232396a8c30b0b6e9b094d5ed835d7fc12d013f))

### [0.1.6](https://github.com/MorevM/equal-heights/compare/v0.1.5...v0.1.6) (2022-11-02)


### Bug fixes

* Remove nullish coalescing operator from the code ([93caf87](https://github.com/MorevM/equal-heights/commit/93caf878c69046d8a1538b87f4496de32cfab818))

### [0.1.5](https://github.com/MorevM/equal-heights/compare/v0.1.4...v0.1.5) (2022-11-02)


### Chores

* Upgrade all deps to latest ([7754ad2](https://github.com/MorevM/equal-heights/commit/7754ad2efb01f1642799f43c9a540a3be47dc730))


### Bug fixes

* Round element offset while calculating with `byRows` option ([d6293a1](https://github.com/MorevM/equal-heights/commit/d6293a17d2066582e2d56573c3fff91856fec8fe))

### [0.1.4](https://github.com/MorevM/equal-heights/compare/v0.1.3...v0.1.4) (2022-04-11)


### Refactoring

* Move utility functions to shared helpers library ([760a893](https://github.com/MorevM/equal-heights/commit/760a89300bc533b5beeb7bad41fd3047fdecede8))
* Union vue-related things to single file ([517791f](https://github.com/MorevM/equal-heights/commit/517791fc6fac075ec7a94434c466efa346bad0de))### [0.1.3](https://github.com/MorevM/equal-heights/compare/v0.1.2...v0.1.3) (2022-04-10)


### Bug fixes

* Correct `checkNode` in mutation observer ([851e9b2](https://github.com/MorevM/equal-heights/commit/851e9b28831298b15a1f2eb345b2c17c66bd3228))
* Observe with ResizeObserver for elements added via MutationObserver ([1b62b8f](https://github.com/MorevM/equal-heights/commit/1b62b8f67f45ed3fd0ae415e9a30f7beada3ff82))### [0.1.2](https://github.com/MorevM/equal-heights/compare/v0.1.1...v0.1.2) (2022-04-10)


### Bug fixes

* Correct filename for `postinstall` script ([f00ea48](https://github.com/MorevM/equal-heights/commit/f00ea4827f396ba842d14141c72d5ed05a505292))### [0.1.1](https://github.com/MorevM/equal-heights/compare/v0.1.0...v0.1.1) (2022-04-10)


### CI improvements

* Explicit `registry-url` ([29b2451](https://github.com/MorevM/equal-heights/commit/29b245119c7cfe0ca3862642f5214d07740da876))## 0.1.0 (2022-04-10)


### Features

* Add separate vue2/3 exports ([290f210](https://github.com/MorevM/equal-heights/commit/290f2103311f55bb6ab5577da6da0cfdd383e2c3))
* Add universal `/vue` export field and CLI to switch ([3151511](https://github.com/MorevM/equal-heights/commit/315151189d8bd9b6125486479dfbae1a1cc17d1b))
* Allow `> *` selector ([c1c58b9](https://github.com/MorevM/equal-heights/commit/c1c58b9ac0d6a8a1eeaaef66e783be404e1c465a))
* **vue:** Allow to pass directive options different ways ([5989cae](https://github.com/MorevM/equal-heights/commit/5989cae98b49f95e38fa7ed7baac91cf6e600fc1))


### Chores

* Deps update ([3996db1](https://github.com/MorevM/equal-heights/commit/3996db1345e498b8087c700ea9286c6509d9b8af))
* Make the package public ([bb95f50](https://github.com/MorevM/equal-heights/commit/bb95f50fdb19f408bae74ab396c1df9099f6ed9d))
* Rename the package ([ce67e95](https://github.com/MorevM/equal-heights/commit/ce67e9575ea37fdb104a90a010cf438c9f2028be))
* **vscode:** Let VSCode validate `json` files ([04bd7e5](https://github.com/MorevM/equal-heights/commit/04bd7e571eff3088c344486d90630e2a05544a15))


### Bug fixes

* Export Vue directive as named `directive` ([5c13b17](https://github.com/MorevM/equal-heights/commit/5c13b17cab3d32b3d035065470cee7f58cac26d5))
* Local import in Vue module ([a2e71ef](https://github.com/MorevM/equal-heights/commit/a2e71ef799ecc9055c152f7cf47a49485381b8c3))
* Prevent Vue SSR erros ([c5b1b97](https://github.com/MorevM/equal-heights/commit/c5b1b97c4eaeca938d4a74de4919f7cd579ecd25))


### Refactoring

* Drop IE11 support ([ec6d132](https://github.com/MorevM/equal-heights/commit/ec6d13260432448ca953d4f4579d7acee0dc6859))
* Make `defaults` static variable ([d9ec436](https://github.com/MorevM/equal-heights/commit/d9ec436d2333c38c8412daa8464828afb1d3ac25))
* Move `debounce` helper to shared library ([ec1a90f](https://github.com/MorevM/equal-heights/commit/ec1a90f32c4226648465c36b2818012c412c524d))
* Remove unnecessary helper `isDescendantOf` ([1156ab5](https://github.com/MorevM/equal-heights/commit/1156ab573d0aef48d86bda98add337f04796a189))


### Documentation

* Add note about missing export ([d63a4be](https://github.com/MorevM/equal-heights/commit/d63a4be1f30ecb2f3c28481a2862d6f044592f7a))
* Update `README.md` ([e0f3386](https://github.com/MorevM/equal-heights/commit/e0f3386a6f14b4581499067be8f7e5bc9d3e3d30))


### CI improvements

* Fix publish config ([407d2e1](https://github.com/MorevM/equal-heights/commit/407d2e1b1ddb0d67112c77e543fcec69f630c422))
