import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useBooks } from './hooks/useBooks'
import { useCart } from './hooks/useCart'
import { useCheckout } from './hooks/useCheckout'
import BookCard from './components/BookCard'
import CartDrawer from './components/CartDrawer'
import SuccessPage from './pages/SuccessPage'

function StorePage({ cart, onCheckout }) {
  const { books, loading, error } = useBooks()
  const [cartOpen, setCartOpen] = useState(false)

  if (loading) return <p className="text-center mt-20 text-gray-400">Loading books...</p>
  if (error) return <p className="text-center mt-20 text-red-400">Error: {error}</p>

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bookstore</h1>
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium hover:border-blue-300 transition"
          >
            🛒 Cart
            {cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map(book => (
            <BookCard key={book.id} book={book} onAddToCart={cart.addToCart} />
          ))}
        </div>
      </div>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onCheckout={onCheckout}
      />
    </div>
  )
}

function App() {
  const cart = useCart()
  const { checkout } = useCheckout()

  async function handleCheckout() {
    await checkout(cart.items, cart.total)
  }

  return (
    <Routes>
      <Route path="/" element={<StorePage cart={cart} onCheckout={handleCheckout} />} />
      <Route path="/success" element={<SuccessPage onClearCart={cart.clearCart} />} />
    </Routes>
  )
}

export default App