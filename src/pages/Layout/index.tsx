import * as React from 'react';
import { Grid, Container, CssBaseline } from '@mui/material';
import {
    Routes,
    Route
} from "react-router-dom";
import SideMenu from './components/SideMenu';
import Home from './features/Home';
import Providers from './features/Providers';
import Entities from './features/Entities';
import Receipts from './features/Receipts';
import Hall from './features/Hall';
import GlobalProvider from '../../contexts';
import ProtectedRoute from '../../components/ProtectedRoute';
import Users from './features/Users';

export default function Layout() {
    return (

        <React.Fragment>
            <CssBaseline />
            <Container fixed sx={{ background: "#F8F9F9", height: '100vh' }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <SideMenu />
                    </Grid>
                    <Grid item xs={9} sx={{ marginTop: '4vh' }}>
                        {/* <NavBar /> */}

                        <Routes>
                            <Route path='/' element={
                                <ProtectedRoute >
                                    <Home />
                                </ProtectedRoute>
                            } />
                            <Route path="/usuarios" element={
                                <ProtectedRoute>
                                    <Users />
                                </ProtectedRoute>
                            } />
                            <Route path='/proveedores' element={
                                <ProtectedRoute>
                                    <Providers />
                                </ProtectedRoute>
                            } />
                            <Route path='/entidades' element={
                                <ProtectedRoute>
                                    <Entities />
                                </ProtectedRoute>
                            } />
                            <Route path='/recetas' element={
                                <ProtectedRoute>
                                    <Receipts />
                                </ProtectedRoute>
                            } />
                            <Route path="/salon" element={
                                <ProtectedRoute>
                                    <Hall />
                                </ProtectedRoute>
                            } />
                        </Routes>

                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}
