View on github: https://github.com/Schwartz10/web3manager/

The web3-state-manager does exactly what it's named - it syncs your application's front-end state with the state of web3 through the redux store.

It's also capable of placing a single smart contract in your redux store. Find configuration instructions below.

### The Challenge:
Managing the front end application state with web3 can get tricky - especially when users switch between networks and accounts on MetaMask.

### Configuration:
`npm install web3-state-manager`

Wherever you define your redux store:

_example of redux config *before* adding web3 state manager:_
```js
import user from './user' // a reducer from a previous file
import { createStore, combineReducers } from 'redux'

// uses combine reducers to split up reducer logic
const reducer = combineReducers({ user });
const store = createStore(reducer);
export default store;

combineReducers({user, web3, validNetwork, account, contract})
```
_example of redux config *after* adding web3 state manager:_
```js
import user from './user' // a reducer from a previous file
import { createStore, combineReducers } from 'redux'
// import reducers from web3-state-manager
import {web3, validNetwork, account, contract} from 'web3-state-manager'

// simply add the web3-state-manager custom reducers (one ore more) to combine reducers
const reducer = combineReducers({user, web3, validNetwork, account, contract})
const store = createStore(reducer);
export default store;
```

Then, on your front end using React, simply render the Web3StateManager component anywhere in your app, as long as its rendered _after_ the redux Provider Component:

```js
import { Web3StateManager } from 'web3-state-manager';

render(){
  return(
    <div>
      {...} { /* other JSX in a high up component */ }
      <Web3StateManager />
    </div>
  )
}
```

_Note: For performance reasons, it's recommended to render Web3StateManager as high up in your render tree as possible - rerendering the Web3StateManager component could cause weird bugs._


#### Passing props to the Web3StateManager Component:

Web3StateManager takes props. All props are optional.

| Prop      | Value        | Description                      |
|:----------|:-------------|:---------------------------------|
| `interval` | Number (ms)  | How often Web3StateManager should re-ping web3 for updates |
| `requiredNetwork` | Number (1 => Mainnet, 2 => Morden, 3 => Ropsten, 4 => Rinkby) | Sets `validNetwork` prop in redux store to `false` if the user is not on the requiredNetwork |
| `localProvider` | URI (localhost:8545) | Instructs the web manager to construct the web3 object from a local provider instead of using one injected from the browser. Do not use this prop in addition to using MetaMask or another web3 injection extension. The localProvider will always take precedent |
| `contract` | compiled smart contract from Truffle | will put the compiled and deployed smart contract on the redux store. The compiled contract must also be migrated to the same network that the user is on. See below for further instructions |





view on npm: https://www.npmjs.com/package/web3-state-manager
