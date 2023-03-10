import * as React from 'react';
import { UserContextProvider } from './User';

export default function GlobalProvider(props: any) {
  return (
    <UserContextProvider>
      {props.children}
    </UserContextProvider>
  )
}