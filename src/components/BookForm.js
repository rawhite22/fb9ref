import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
// firebase imports
import { db } from '../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

export default function BookForm() {
  const { user } = useAuthContext()
  const [newBook, setNewBook] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, 'books'), {
      title: newBook,
      uid: user.uid,
    })

    setNewBook('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input
          required
          type='text'
          onChange={(e) => setNewBook(e.target.value)}
          value={newBook}
        />
      </label>
      <button>Add</button>
    </form>
  )
}
