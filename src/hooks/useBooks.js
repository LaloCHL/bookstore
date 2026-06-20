import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function useBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('title', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setBooks(data)
      }
      setLoading(false)
    }

    fetchBooks()
  }, [])

  return { books, loading, error }
}