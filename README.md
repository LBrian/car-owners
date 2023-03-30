# Cars

Cars is powered by [Create React App](https://github.com/facebook/create-react-app).

## Tech stacks

- React
- Husky
- Eslint
- lint-staged
- Prettier
- Tailwind CSS
- Tailwind Plugin - daisyUI
- Typescript
- React-hook-form
- Jest (unit test)
- Playwright (e2e)

## Installation

The repo is scaffolded under Node `16.19.1` so ensure you have the right version to avoid package dependency errors during installation. You can simply install the right node version using `nvm`

```
nvm i 16
nvm use 16
```

```
node -v
v16.19.1
```

install `yarn`

```
npm i -g yarn
```

clone the repo

```
git clone git@github.com:LBrian/cars.git
```

install packages

```
cd cars
yarn
```

## Run the application locally

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Run unit test and e2e test

### `yarn test`

Launches the test runner `Jest` in the interactive watch mode.

### `yarn e2e`

Lunches `Playwright` e2e test and local web server to test against it. Test result will be output in the `playwright-report` folder.

## Build the production application

### `yarn run build`

Builds the app for production to the `build` folder.

## Work note

- 10 mins read through requirements and write test cases (TDD)
- 20 mins scaffolding
- 3 hrs implementation + unit test + e2e test
