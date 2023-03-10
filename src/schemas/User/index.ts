export enum Types {
  LOGIN = 'LOGIN'
};

export type UserPayload = {
  [Types.LOGIN]: {
    username: string;
    password: string;
  };
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export type UserContextType = {
  userContext: User;
  setUserContext: (value: User) => void;
};

export interface User {
  id: string
  username: string
  password?: string
  name: string
  lastname: string
  dni: number
  cuil: string
  birthday?: string
  address?: {
    street?: string
    number?: number
    floor?: string
    department?: string
    province?: {
      code: string
      description: string
    }
    country?: {
      code: string
      description: string
    }
  }
  position: {
    code: string
    description: string
  }
  startDate: string
  phone?: number
  email?: string
  state: {
    code: string
    description: string
  }
  permissions: string[]
  token?: string
}

export type Permission = {
  code: string,
  description: string,
  category?: string,
  checked?: boolean
}

export interface PermissionCategory {
  category: string
  description: string
  permissions: Permission[]
}
