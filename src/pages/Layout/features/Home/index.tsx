import { Container, CssBaseline } from '@mui/material';
import * as React from 'react';
import UserContext from '../../../../contexts/User/index';
import { UserContextType } from '../../../../schemas/User';

export default function Home() {

    const { userContext } = React.useContext(
        UserContext
    ) as UserContextType;

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <h1>Home {userContext.name}</h1>
            </Container>
        </React.Fragment>
    );
}
