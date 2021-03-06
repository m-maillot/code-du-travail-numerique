# Gherkin E2E tests

The end to end tests are written in Gherkin.  
You can find them in the [features](./features) folder.

## [Codecept runners](https://codecept.io/bdd/#gherkin)

You can run the Gherkin tests with through the different [Codecept](https://codecept.io) runners.  
Each of them are individual packages that should be separately install and run (see each `README.md`).

### [Puppeteer Runner](./.runners/puppeteer/README.md)

## Adding a new test

> As example, we are going to add a test for the ``

1.  Create a `.feature` file
1.  Write your Gherkin
1.  Run `yarn codeceptjs gherkin:snippets` in each codeceptjs runners
1.  Implement the missing snippets
1.  Remove unnecessary comments
1.  Test in both headed and headless mode.

    ```sh
    $ yarn test && CODECEPT_HEADED=1 yarn test
    ```

### [Gherkin in french](https://cucumber.io/docs/gherkin/reference/#spoken-languages)

As the website is native french, the Gherkin tests are native french too.  
We use the `#language: fr` to tell Codecept that the file has french Gherkin syntax in it.
To ensure that Codecept is compatible with the french syntax, we added a local `step_definitions/_fr.js` with what is needed to be translated.

## HOW-TO

> How can I run only tests that match a string pattern ?

```sh
yarn test --grep "propos"
```

will only run tests which name match "propos"

> How can I run test using my localhost server

```sh
$ CODECEPT_BASEURL=http://localhost:3000 yarn test
```

> How can I debug my failing test

```sh
$ yarn test --verbose --steps
```
