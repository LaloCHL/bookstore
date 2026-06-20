function CartDrawer({ isOpen, onClose, cart }) {
  const { items, removeFromCart, updateQuantity, total } = cart

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-xl transition-transform duration-300 flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-10">Your cart is empty</p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.cover_url}
                    alt={item.title}
                    className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mb-2">${item.price}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-gray-500 hover:border-gray-400 transition text-xs"
                      >
                        −
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-gray-500 hover:border-gray-400 transition text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-xs text-red-400 hover:text-red-500 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100">
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl font-medium transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer