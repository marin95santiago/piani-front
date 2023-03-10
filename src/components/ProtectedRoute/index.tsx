import React from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../contexts/User';
import { UserContextType } from '../../schemas/User';

export default function ProtectedRoute(props: any) {

  const { userContext } = React.useContext(
    UserContext
) as UserContextType;

  if (userContext.id) {
    return props.children
  } else {
    return <Navigate to="/loggin" replace />
  }
}
