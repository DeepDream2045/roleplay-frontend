import { useState } from 'react';
import {
  web3Accounts,
  web3Enable
} from '@polkadot/extension-dapp';
import clsx from 'clsx';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

type TExtensionState = {
  data?: {
    accounts: InjectedAccountWithMeta[],
    defaultAccount: InjectedAccountWithMeta,
  }
  loading: boolean
  error: null | Error
}

const initialExtensionState: TExtensionState = {
  data: undefined,
  loading: false,
  error: null
};

export const Connect = () => {
  const [state, setState] = useState(initialExtensionState);

  const handleConnect = () => {
    setState({ ...initialExtensionState, loading: true });

    web3Enable('polkadot-extension')
      .then((injectedExtensions) => {
        if (!injectedExtensions.length) {
          return alert("Please install Polkadot wallet first to connect");
        }

        return web3Accounts();
      })
      .then((accounts) => {
        if (!accounts.length) {
          return Promise.reject(new Error('NO_ACCOUNTS'));
        }

        setState({
          error: null,
          loading: false,
          data: {
            accounts: accounts,
            defaultAccount: accounts[ 0 ],
          }
        });
      })
      .catch((error) => {
        console.error('Error with connect', error);
        setState({ error, loading: false, data: undefined });
      });
  };

  if (state.error) {
    return (
      <span className="text-red-500 font-bold tracking-tight">
        Error with connect: {state.error.message}
      </span>
    );
  }

  return state.data
    ? <>Hello, {beatifyAddress(state.data.defaultAccount.address)}!</>
    : <button
      disabled={state.loading}
      className={
        clsx(
          'inline-block rounded-lg px-4 py-1.5',
          'text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-amber-600',
          state.loading ? 'cursor-not-allowed bg-amber-400' : 'bg-amber-500 hover:bg-amber-600 hover:ring-amber-600'
        )
      }
      onClick={handleConnect}
    >
      {state.loading ? 'Connecting...' : 'Polkadot'}
    </button>;
};

function beatifyAddress(address: string) {
  return `${address.slice(0, 3)}...${address.slice(-3)}`;
}