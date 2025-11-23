import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import AuthForm from './components/AuthForm'
import Home from './pages/Home'
import ClassPage from './pages/ClassPage'
import AdminPanel from './pages/AdminPanel'
import api from './api/axiosInstance'

export default function App(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      api.get('/auth/me').then(r=> setUser(r.data.user)).catch(()=>{ localStorage.removeItem('token') })
    }
  },[])

  function handleLogout(){
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold">StudyHub</Link>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span>{user.username}</span>
                {user.role === 'admin' && <Link to="/admin" className="px-3 py-1 bg-indigo-600 text-white rounded">Admin</Link>}
                <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
              </>
            ) : (
              <Link to="/auth" className="px-3 py-1 bg-indigo-600 text-white rounded">Login</Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<AuthForm onAuth={(u)=>setUser(u)}/>} />
          <Route path="/class/:id" element={<ClassPage user={user}/>} />
          <Route path="/admin" element={<AdminPanel user={user}/>} />
        </Routes>
      </main>
    </div>
  )
}
