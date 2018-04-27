import { combineReducers } from 'redux';
import web3 from './web3';
import contract from './contract';
import account from './accounts';
import validNetwork from './network';

export const web3Reducer = combineReducers({ web3, contract, account, validNetwork });

export * from './web3';
export * from './contract';
export * from './accounts';
export * from './network';
