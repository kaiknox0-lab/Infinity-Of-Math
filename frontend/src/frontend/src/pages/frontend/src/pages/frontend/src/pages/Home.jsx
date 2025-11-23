
import React, { useEffect, useState } from 'react'
import api from '../api/axiosInstance'
import { Link } from 'react-router-dom'

export default function Home(){
  const [classes, setClasses] = useState([])
  useEffect(()=>{
    // fetch class 6-10 metadata (we'll call each class endpoint)
    Promise.all([6,7,8,9,10].map(i=>api.get(`/classes/${i}`).then(r=>r.data))).then(setClasses).catch(()=>{})
  },[])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Classes 6–10</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {classes.map(c=> (
          <div key={c.classNumber} className="p-4 bg-white rounded shadow">
            <h3>Class {c.classNumber}</h3>
            <p className="text-sm text-gray-500">Books: {c.books.length} · Notes: {c.notes.length}</p>
            <Link to={`/class/${c.classNumber}`} className="mt-2 inline-block px-3 py-1 bg-indigo-600 text-white rounded">Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
