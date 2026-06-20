import { useBooks } from './hooks/useBooks'
import BookCard from './components/BookCard'

function App() {
  const { books, loading, error } = useBooks()

  function handleAddToCart(book) {
    console.log('Adding to cart:', book.title)
  }

  if (loading) return <p className="text-center mt-20 text-gray-400">Loading books...</p>
  if (error) return <p className="text-center mt-20 text-red-400">Error: {error}</p>

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Bookstore</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map(book => (
            <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App