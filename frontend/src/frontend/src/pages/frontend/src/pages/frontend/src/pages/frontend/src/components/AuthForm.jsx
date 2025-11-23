
import React, { useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

export default function AuthForm({ onAuth }){
  const [mode,setMode] = useState('login')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [msg,setMsg] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const url = mode === 'login' ? '/auth/login' : '/auth/register'
      const res = await api.post(url, { username, password })
      localStorage.setItem('token', res.data.token)
      onAuth(res.data.user)
      navigate('/')
    }catch(err){ setMsg(err.response?.data?.message || 'Failed') }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <div className="flex gap-2 mb-4">
        <button onClick={()=>{setMode('login'); setMsg('')}} className={`flex-1 py-2 ${mode==='login'? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Login</button>
        <button onClick={()=>{setMode('register'); setMsg('')}} className={`flex-1 py-2 ${mode==='register'? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Register</button>
      </div>
      <form onSubmit={submit}>
        <input className="w-full p-2 border rounded mb-2" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input type="password" className="w-full p-2 border rounded mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        {msg && <div className="text-red-600 mb-2">{msg}</div>}
        <button className="w-full py-2 bg-indigo-600 text-white rounded">{mode==='login'? 'Login' : 'Register'}</button>
      </form>
    </div>
  )
}
