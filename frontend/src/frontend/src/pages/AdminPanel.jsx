import React, { useState } from 'react'
import api from '../api/axiosInstance'

export default function AdminPanel({ user }){
  const [cls, setCls] = useState(6)
  const [type, setType] = useState('books')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  if(!user || user.role !== 'admin') return <div className="p-4 bg-yellow-50">Admin only</div>

  async function submit(e){
    e.preventDefault()
    try{
      if(type === 'books'){
        const form = new FormData()
        form.append('title', title)
        form.append('description', description)
        if(file) form.append('file', file)
        const res = await api.post(`/classes/${cls}/books`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
        alert('Added')
      } else {
        await api.post(`/classes/${cls}/${type}`, { title, description })
        alert('Added')
      }
    }catch(err){ alert('Failed') }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Admin Panel</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <div className="grid grid-cols-3 gap-2 mb-2">
          <select value={cls} onChange={e=>setCls(e.target.value)} className="border p-2 rounded">
            {[6,7,8,9,10].map(i => <option key={i} value={i}>Class {i}</option>)}
          </select>
          <select value={type} onChange={e=>setType(e.target.value)} className="border p-2 rounded">
            <option value="books">Books</option>
            <option value="notes">Notes</option>
            <option value="suggestions">Suggestions</option>
            <option value="formulas">Formulas</option>
          </select>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" />
        </div>

        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description / link" className="w-full border p-2 rounded mb-2" />
        {type === 'books' && <input type="file" onChange={e=>setFile(e.target.files[0])} className="mb-2" />}
        <button className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
      </form>
    </div>
  )
}
