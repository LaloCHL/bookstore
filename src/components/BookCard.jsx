function BookCard({ book, onAddToCart }) {
  const outOfStock = book.stock === 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
      <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
        <img
          src={book.cover_url}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1">
          {book.title}
        </h3>
        <p className="text-gray-400 text-xs mb-3">{book.author}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">${book.price}</span>
          {outOfStock ? (
            <span className="text-xs text-red-400 font-medium">Out of stock</span>
          ) : (
            <button
              onClick={() => onAddToCart(book)}
              className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookCard