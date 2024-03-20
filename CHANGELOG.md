## [3.4.1](https://github.com/dasprid/mui-rhf-integration/compare/v3.4.0...v3.4.1) (2024-03-20)


### Bug Fixes

* **RhfAutocomplete:** do not map value to option while loading ([a3a7995](https://github.com/dasprid/mui-rhf-integration/commit/a3a799533756a57e169ddeebce27d79718a74677))

# [3.4.0](https://github.com/dasprid/mui-rhf-integration/compare/v3.3.0...v3.4.0) (2023-10-28)


### Features

* allow ReactNode as label for checkbox and radio group ([cba22f7](https://github.com/dasprid/mui-rhf-integration/commit/cba22f7f38f34a410e8b4059fcc02d9cc2a133da))

# [3.3.0](https://github.com/dasprid/mui-rhf-integration/compare/v3.2.0...v3.3.0) (2023-07-23)


### Features

* **date-picker:** forward slot props ([d330c56](https://github.com/dasprid/mui-rhf-integration/commit/d330c5683442f5a60af98e10d6019115ccc8f710))

# [3.2.0](https://github.com/dasprid/mui-rhf-integration/compare/v3.1.0...v3.2.0) (2023-04-27)


### Features

* export prop types ([ce0ec09](https://github.com/dasprid/mui-rhf-integration/commit/ce0ec098abcb643bd0b5c1e84cd2b91ba0e04495))

# [3.1.0](https://github.com/dasprid/mui-rhf-integration/compare/v3.0.2...v3.1.0) (2023-04-25)


### Features

* **RhfTextField:** pass name property to inner TextField ([aa88709](https://github.com/dasprid/mui-rhf-integration/commit/aa887097c5c53e76ec73cf813ad80ce9853ebcb8))

## [3.0.2](https://github.com/dasprid/mui-rhf-integration/compare/v3.0.1...v3.0.2) (2023-04-18)


### Bug Fixes

* pack all exports in root directory and include CJS files ([186fbaa](https://github.com/dasprid/mui-rhf-integration/commit/186fbaa0d80c2f64414348c9e5d66f3af57c613b))

## [3.0.1](https://github.com/dasprid/mui-rhf-integration/compare/v3.0.0...v3.0.1) (2023-04-17)


### Bug Fixes

* add module type and more explicit exports ([4a73494](https://github.com/dasprid/mui-rhf-integration/commit/4a734946c8927c8721d63f70f3b782805353bee2))

# [3.0.0](https://github.com/dasprid/mui-rhf-integration/compare/v2.1.0...v3.0.0) (2023-04-17)


### Features

* migrate to @mui/x-date-pickers V6 ([2bc5427](https://github.com/dasprid/mui-rhf-integration/commit/2bc5427dcd48e9723aca2b9382a2712577c2b635))


### BREAKING CHANGES

* mui-rhf-integration now requires V6 of @mui/x-date-pickers.
Additionally, the date pickers are now exported as
`mui-rhf-integration/date-picker`

# [2.1.0](https://github.com/dasprid/mui-rhf-integration/compare/v2.0.3...v2.1.0) (2023-03-03)


### Features

* **RhfTextField:** add character counter ([4080b4f](https://github.com/dasprid/mui-rhf-integration/commit/4080b4ffd22b84178c8af88f773e4df8fd58fc0e))

## [2.0.3](https://github.com/dasprid/mui-rhf-integration/compare/v2.0.2...v2.0.3) (2023-03-02)


### Bug Fixes

* export date-picker.js ([234591f](https://github.com/dasprid/mui-rhf-integration/commit/234591f8c50f256a14a87f003684e24aa7da4d8d))

## [2.0.2](https://github.com/dasprid/mui-rhf-integration/compare/v2.0.1...v2.0.2) (2023-01-13)


### Bug Fixes

* move date and time pickers to separate export file ([a00d0e8](https://github.com/dasprid/mui-rhf-integration/commit/a00d0e81919ae1864ecfa05642d580988fe581b7))

## [2.0.1](https://github.com/dasprid/mui-rhf-integration/compare/v2.0.0...v2.0.1) (2023-01-13)


### Bug Fixes

* add catch statement to lazy date and time pickers ([629848b](https://github.com/dasprid/mui-rhf-integration/commit/629848b37bd39b06fd409b04f9979784d87412f2))

# [2.0.0](https://github.com/dasprid/mui-rhf-integration/compare/v1.1.0...v2.0.0) (2023-01-13)


### Features

* update to newer dependencies ([c5948a9](https://github.com/dasprid/mui-rhf-integration/commit/c5948a939505dbddebec3ee1da5a17186316d3eb))


### BREAKING CHANGES

* The react dependency has been raised to version 18.2.

# [1.1.0](https://github.com/dasprid/mui-rhf-integration/compare/v1.0.1...v1.1.0) (2022-06-25)


### Features

* **RhfAutocomplete:** allow transforming between options and form values ([2458a17](https://github.com/dasprid/mui-rhf-integration/commit/2458a17786d056ca8524364570f39926566a2ffd))

## [1.0.1](https://github.com/dasprid/mui-rhf-integration/compare/v1.0.0...v1.0.1) (2022-06-13)


### Bug Fixes

* **date-pickers:** assign input ref to both the field and the date pickers ([166b11e](https://github.com/dasprid/mui-rhf-integration/commit/166b11e7abbc82f06c63a5473c707216c01753c1))
* remove ChipComponent from AutocompleteProps ([d5e5f6b](https://github.com/dasprid/mui-rhf-integration/commit/d5e5f6b2cd2a88349905a72faed6eebd64f6f414))
* replace deprecated fieldState.invalid ([3458a55](https://github.com/dasprid/mui-rhf-integration/commit/3458a555192ed8cfd8e075d22eb3a8cfb0eab705))
* update date and timer picker prop generic declaration to latest version ([eb3997e](https://github.com/dasprid/mui-rhf-integration/commit/eb3997e2494c6ece58e11e9a847cbb5d7c7a3514))

# 1.0.0 (2022-04-25)


### Features

* initial commit ([0a84ee3](https://github.com/dasprid/mui-rhf-integration/commit/0a84ee3b14cb08d09bb342d61cdbd92e1386bdfa))
