import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function SuccessPage({ onClearCart }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const orderId = searchParams.get('order')

  useEffect(() => {
    onClearCart()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-sm w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Payment successful!</h1>
        <p className="text-gray-400 text-sm mb-1">Your order has been placed.</p>
        {orderId && (
          <p className="text-xs text-gray-300 mb-6 font-mono">Order: {orderId.slice(0, 8)}...</p>
        )}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl font-medium transition"
        >
          Back to store
        </button>
      </div>
    </div>
  )
}

export default SuccessPage