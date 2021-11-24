import { useState } from 'react'
import { auth } from '../firebase/config'
import { collection } from '@firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { db } from '../firebase/config'
import { setDoc, doc } from '@firebase/firestore'
// .then chaining
/*
export const useSignup = () => {
  const { dispatch } = useAuthContext()
  const [error, setError] = useState(null)
  const signup = (email, password) => {
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user })
      })
      .catch((err) => {
        setError(err.message)
      })
  }
  return { error, signup }
}
*/

// async await

export const useSignup = () => {
  // dispatch for the auth context reducer
  const { dispatch } = useAuthContext()
  // error state
  const [error, setError] = useState(null)
  // sign up function
  const signup = async (email, password) => {
    // sets error to null incase of previous error
    setError(null)
    // initial sign up
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (!res) {
        throw new Error('Could not complete sign up.')
      }
      // create a user collection and add user when they sign up
      await setDoc(doc(db, 'users', res.user.uid), { id: email, role: 'user' })
      dispatch({ type: 'LOGIN', payload: res.user })
    } catch (error) {
      console.log(error)
    }
  }
  return { error, signup }
}
