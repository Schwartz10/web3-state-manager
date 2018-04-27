The web3-state-manager does exactly what it's named - it syncs your application's front-end state with the state of web3 through the redux store.

It's also capable of placing a single smart contract in your redux store too. Find configuration instructions below.

###The Challenge:
Managing the front end application state with web3 can get tricky - especially when users switch between networks and accounts on MetaMask.

###Configuration:
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
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Web3StateManager />
      <Routes />
    </div>
  </Provider>,
  document.getElementById('app')
)
```

_Note: For performance reasons, it's recommended to render Web3StateManager as high up in your render tree as possible - rerendering the Web3StateManager component could cause weird bugs._


####Passing props to the Web3StateManager Component:

Web3StateManager takes props:
| Prop      | Value        | Description                      |
|:----------|:-------------|:---------------------------------|
| `interval`  | Number (ms)  | How often Web3StateManager should re-ping web3 for updates |


view on npm: https://www.npmjs.com/package/web3-state-manager
