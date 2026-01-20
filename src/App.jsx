import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CreatorDashboard } from './pages/CreatorDashboard'
import { BusinessDashboard } from './pages/BusinessDashboard'

function App() {
    
    const defaultCreatorUsername = 'creator_demo'
    const defaultBusinessUsername = 'business_demo'

    return (
        <BrowserRouter>
            <Routes>
                {}
                <Route path="/" element={<Navigate to={`/${defaultCreatorUsername}/creator-dashboard`} replace />} />

                {}
                <Route path="/:username/creator-dashboard" element={<CreatorDashboard />} />

                {}
                <Route path="/:username/business-dashboard" element={<BusinessDashboard />} />

                {}
                <Route path="/:username/dashboard" element={<Navigate to={`/${defaultCreatorUsername}/creator-dashboard`} replace />} />

                {}
                <Route path="*" element={<Navigate to={`/${defaultCreatorUsername}/creator-dashboard`} replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

