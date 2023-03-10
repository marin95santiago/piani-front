import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Layout/features/Home';

export default function FreeRoutes() {
    return (
        <Routes>
            <Route path="/loggin" element={<Home />} />
            <Route path="*" element={
                <ProtectedRoute />
            } />
        </Routes>
    )
}
