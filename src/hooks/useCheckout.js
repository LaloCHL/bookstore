import { supabase } from '../supabaseClient'

export function useCheckout() {
  async function checkout(items, total) {
    try {
      // Step 1: save order in Supabase
      const { data: order, error } = await supabase
        .from('orders')
        .insert({ items, total, status: 'pending' })
        .select()
        .single()

      if (error) throw new Error(error.message)

      // Step 2: call Edge Function to create Stripe session
      const { data, error: fnError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: { items, orderId: order.id }
        }
      )

      if (fnError) throw new Error(fnError.message)

      // Step 3: redirect to Stripe
      window.location.href = data.url

    } catch (err) {
      console.error('Checkout error:', err.message)
      alert('Something went wrong. Please try again.')
    }
  }

  return { checkout }
}