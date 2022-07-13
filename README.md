# Mobile App Modernization Project

## Hybrid Framework - [React Native](https://reactnative.dev)

To maximize compatibility across platforms, use typescript in React Native for most things.

Everything in `src/` should be stored in **exactly one** folder. Examples documented below. This ensures code has a consistent import path (../area/file), and makes future packaging easier.

TODO: Document exceptions / additions here.

## Shared Components

Shared components compliant with Subaru's style guide are located in `src/component`. To distinguish between MySubaru components and React Native components, the components are prefixed with My. the Components may move to a separate package in the future.

Larger items (logical screens) are in `src/pages`.  *TODO Long term, anything in pages will have a URL (for routing with react-native-web) and will be connected to react-navigation.*

## State Management - useState, useItem, Redux

From the [Redux documenation](https://redux.js.org/faq/general#when-should-i-use-redux):

    Don't use Redux until you have problems with vanilla React.

For Subaru's use case the amount of data managed is relatively small, and the data has multiple storage locations (keychain, localStorage, in-memory), Redux's proposed single unified store is probably not a good fit for the application.

Instead of Redux, lightweight wrappers around data stores are implemented in `src/stores`.

## Network / Mocking

Network requests are stored in `src/net`. When making requests

## Business Logic and Unit Testing - Jest
Business logic should be disconnected from UI and network concerns. Logic is stored in `src/model`

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

