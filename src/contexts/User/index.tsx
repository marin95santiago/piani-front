import { createContext, ReactNode, useState } from "react";
import { User } from "../../schemas/User";

const Context = createContext({});

interface Props {
  children: ReactNode;
}

const initialState: User = {
  id: '',
  username: '',
  name: '',
  lastname: '',
  dni: 0,
  cuil: '',
  position: {
    code: '',
    description: ''
  },
  startDate: '',
  state: {
    code: '',
    description: ''
  },
  permissions: ['']
}

export function UserContextProvider({ children }: Props) {
  const [userContext, setUserContext] = useState<User>(initialState);
  return (
    <Context.Provider value={{ userContext, setUserContext }}>
      {children}
    </Context.Provider>
  );
}

export default Context;