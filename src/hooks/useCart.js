import { useState, useEffect } from 'react'

export function useCart() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addToCart(book) {
    setItems(prev => {
      const existing = prev.find(item => item.id === book.id)

      if (existing) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...book, quantity: 1 }]
    })
  }

  function removeFromCart(bookId) {
    setItems(prev => prev.filter(item => item.id !== bookId))
  }

  function updateQuantity(bookId, quantity) {
    if (quantity < 1) return
    setItems(prev =>
      prev.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      )
    )
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return { items, addToCart, removeFromCart, updateQuantity, total, itemCount }
}