# Mobile App Modernization Project

## Hybrid Framework - [React Native](https://reactnative.dev)

To maximize compatibility across platforms, use typescript in React Native for most things.

Everything in `src/` should be stored in **exactly one** folder. Examples documented below. This ensures code has a consistent import path, and makes future packaging easier.

TODO: Document exceptions / additions here.
TODO: Add diagram of modules.

## User Interface / Shared Components

Shared components compliant with Subaru's style guide are located in `src/component`. To distinguish between MySubaru components and React Native components, the components are prefixed with My. the Components may move to a separate package in the future.

Larger items (logical screens) are in `src/pages`.  

Assets are in folders like `assets/fonts`. Integration with iOS and Android projects is handled by (React Native Asset)[https://www.npmjs.com/package/react-native-asset] since `react-native link` has been moved out of the base library.

TODO: Long term, anything in pages will have a URL (for routing with react-native-web) and will be connected to react-navigation.

## State Management - useState, useItem, Redux

From the [Redux documenation](https://redux.js.org/faq/general#when-should-i-use-redux):

    Don't use Redux until you have problems with vanilla React.

For Subaru's use case the amount of data managed is relatively small, and the data has multiple storage locations (keychain, localStorage, in-memory), Redux's proposed single unified store is probably not a good fit for the application.

Instead of Redux, lightweight wrappers around data stores are implemented in `src/stores`.

## Network / Mocking

Network requests are stored in `src/net`. When making requests a response is returned either by hitting a server, or reading from a file in `content/mocks`. Network code does not return internal details such as HTTP status codes. 

Instead of awaiting responses, most UI code can listen for changes on an appropriate store.

## Business Logic and Unit Testing - Jest

Business logic should be disconnected from UI and network concerns. 

Locally runnable business logic is stored in `src/model`. Functions in this folder use the naming convention `checkModelName`, and corresponding tests go into `__test__` to be run locally and as part of CI. Failing tests are ok on development branches but should be fixed before pushing to main.

Both local and service errors are identified by a string or numeric code. Integrate these errors into return an array of localized strings in functions named `validateModelName`. These can be bundled with appropriate visual components / screens.

## Translation

At the top of any component or page needing translated text use the following statement:

    const i18n: Language = useLanguage();

TODO: Scripts will be added later to audit text usage, and find missing translations. Use existing text where practical.

## Project Management - Jira

*TODO*

## Documentation - Confluence

*TODO*

## UI Testing - Appium

*TODO*

## CMS - Sanity.io

*TODO*

## Push Notifications - Firebase

*TODO*

## Analytics - Adobe, AppCenter

Connectors to Adobe Analytics and other tracking tools are located in `src/analytics`. AppCenter be will installed on the native side of the codebase and exposed to React Native via a simple shim.

## Apple Watch Integration

*TODO*

