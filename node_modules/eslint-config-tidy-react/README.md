# eslint-config-tidy-react [![Build status for ESLint Config Tidy React](https://img.shields.io/circleci/project/sholladay/eslint-config-tidy-react/master.svg "Build Status")](https://circleci.com/gh/sholladay/eslint-config-tidy-react "Builds")

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for [React](https://facebook.github.io/react/) with Tidy style

Note that this only enables rules related to React. You probably want to compose this with other configs, such as [eslint-config-tidy](https://github.com/sholladay/eslint-config-tidy) (as shown below), to make your perfect setup.

## Why?

 - Consistency.
 - Clarity.
 - Simplicity.

## Install

```sh
npm install eslint-config-tidy eslint-config-tidy-react eslint-plugin-react --save-dev
```

## Usage

All you have to do is tell your linter to use this config.

### Use with [XO](https://github.com/sindresorhus/xo) (recommended)

Add some XO config to your package.json:

```json
{
    "name": "my-awesome-project",
    "xo": {
        "extend": ["tidy", "tidy-react"]
    }
}
```

### Alternatively, use with [ESLint](https://github.com/eslint/eslint)

Add some ESLint config to your package.json:

```json
{
    "name": "my-awesome-project",
    "eslintConfig": {
        "extends": ["tidy", "tidy-react"]
    }
}
```

## Related

- [eslint-config-tidy](https://github.com/sholladay/eslint-config-tidy) - ESLint shareable config for Tidy style
- [XO](https://github.com/sindresorhus/xo) - Linter based on ESLint

## Contributing

See our [contributing guidelines](https://github.com/sholladay/eslint-config-tidy-react/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/eslint-config-tidy-react/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/eslint-config-tidy-react/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/eslint-config-tidy-react/blob/master/LICENSE "License for eslint-config-tidy-react") © [Seth Holladay](https://seth-holladay.com "Author of eslint-config-tidy-react")

Go make something, dang it.
