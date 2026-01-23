import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CreatorDashboard } from './pages/CreatorDashboard'
import { BusinessDashboard } from './pages/BusinessDashboard'

function App() {

    const defaultCreatorUsername = 'creator_demo'
    const defaultBusinessUsername = 'brandx'

    return (
        <BrowserRouter>
            <Routes>
                { }
                <Route path="/" element={<Navigate to="/creator/demo_user" replace />} />

                { }
                <Route path="/creator/:username" element={<CreatorDashboard />} />

                { }
                <Route path="/business/:username" element={<BusinessDashboard />} />

                { }
                <Route path="*" element={<Navigate to="/creator/demo_user" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
