import { useBooks } from './hooks/useBooks'

function App() {
  const { books, loading, error } = useBooks()

  if (loading) return <p>Loading books...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Bookstore</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} — {book.author} — ${book.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App