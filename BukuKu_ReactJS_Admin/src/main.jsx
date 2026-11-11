import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Team from './pages/Team.jsx'
import Contact from './pages/Contact.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import Dashboard from './admin/pages/Dashboard.jsx'
import Genres from './admin/pages/Genres.jsx'
import Authors from './admin/pages/Authors.jsx'
import { AdminDataProvider } from './admin/AdminDataContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="admin" element={<AdminDataProvider><AdminLayout /></AdminDataProvider>}>
          <Route index element={<Dashboard />} />
          <Route path="genres" element={<Genres />} />
          <Route path="authors" element={<Authors />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
