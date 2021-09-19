# Check Engine - Veriff

This project was bootstrapped with [Provided-Boilerplate](https://codesandbox.io/s/veriff-assignment-9lvph). `Check Engine` is a simple web application developed by `React` and `TypeScript`. \*_Thank you in advance for reviewing this repository and your time._:heart:\*

## Project structure and design solutions

During development of this app, future changes, further features and maintenance have been considered and tried to implement different parts modular and reusable. Having in mind to keep everything simple, the infrastructure of some further possible features implemented. Such as:

- i18n - Internationalization
- Common components like, inputs, form elements, button , etc...
- Custom hooks for `fetch` and `submit`
- Services, helpers and parsers
- ...

## Libraries, Packages and Linters

Because of the nature of being an assignment in this project, I have tried to use third party libraries as less as possible and not making configurations complicated

1.  **TypeScript** - For all the benefits :)
2.  **Prettier** - As a great formatter
3.  **Commitlint** - A great linter for conventional commiting.
4.  **Husky** - For pre-commit hooks

## Important Features

1.  Navigation with keyboard has been implemented
2.  Submit permission handled by described conditions
3.  Fetching and submitting implemented with handled `loading` and `error` states.
4.  Success page after submit with reset possibility implemented
5.  Unit tests have been written and our utilities are tested completely.
6.  etc

## Solutions

I tried to develop a clean code base in order to be self documented. But for some situations that my code may be unclear, I have added some descriptions here for some parts.
`SectionLoader` is a component which handles `loading` and `error` statements in itself to make this part clean and DRY.
**Navigation by Keyboard** has been implemented by `refs` and `KeyboardEvents`. A `SwitchInput` component can handle all this logic itself and just receives list of checks and answers from parent.
`react-router-dom` could be used in this project but because of the nature of task and being light-weight I have implemented navigation between different situations with `state.`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
