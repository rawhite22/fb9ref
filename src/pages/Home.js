import { useState } from 'react'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import { useCollection } from '../hooks/useCollection'
import { useAuthContext } from '../hooks/useAuthContext'
export default function Home() {
  const { user } = useAuthContext()
  const { documents: books } = useCollection('books', ['uid', '==', user.uid])

  /* --- gets data once not in real time --- */
  // useEffect(() => {
  //   const ref = collection(db, 'books')
  //   getDocs(ref).then((snanpshot) => {
  //     let results = []
  //     snanpshot.docs.forEach((doc) => {
  //       results.push({ id: doc.id, ...doc.data() })
  //     })
  //     setBooks(results)
  //   })
  //   return () => {}
  // }, [db])

  return (
    <div className='App'>
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  )
}
