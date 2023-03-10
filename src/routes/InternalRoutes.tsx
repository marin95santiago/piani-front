import React from 'react';
import {
    Routes,
    Route
  } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';
import Entities from '../pages/Layout/features/Entities';
import Hall from '../pages/Layout/features/Hall';
import Home from '../pages/Layout/features/Home';
import Providers from '../pages/Layout/features/Providers';
import Receipts from '../pages/Layout/features/Receipts';

export default function InternalRoutes() {
    return (
        <Routes>
            <Route path='/' element={
                <ProtectedRoute >
                    <Home />
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
    )
}
