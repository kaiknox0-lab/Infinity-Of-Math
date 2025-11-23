
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function ClassPage({ user }){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('books')

  useEffect(()=>{
    api.get(`/classes/${id}`).then(r=>setData(r.data)).catch(()=>{})
  },[id])

  if(!data) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-lg font-semibold">Class {data.classNumber}</h2>
      <div className="mt-3">
        <div className="flex gap-2 mb-4">
          <button onClick={()=>setTab('books')} className={`px-3 py-1 rounded ${tab==='books'? 'bg-indigo-600 text-white':'bg-gray-100'}`}>Books</button>
          <button onClick={()=>setTab('notes')} className={`px-3 py-1 rounded ${tab==='notes'? 'bg-indigo-600 text-white':'bg-gray-100'}`}>Notes</button>
          <button onClick={()=>setTab('suggestions')} className={`px-3 py-1 rounded ${tab==='suggestions'? 'bg-indigo-600 text-white':'bg-gray-100'}`}>Suggestions</button>
          <button onClick={()=>setTab('formulas')} className={`px-3 py-1 rounded ${tab==='formulas'? 'bg-indigo-600 text-white':'bg-gray-100'}`}>Formulas</button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          {(data[tab]||[]).length === 0 ? <div className="text-sm text-gray-500">No items</div> : (
            <ul className="space-y-2">
              {data[tab].map(it => (
                <li key={it._id||it.title} className="p-3 border rounded">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-gray-600">{it.description}</div>
                  {it.fileURL && <a href={it.fileURL} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm">Open file</a>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
