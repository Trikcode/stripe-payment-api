const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeController = async (req, res) => {
  const { cartItems } = req.body
  let total = 0

  const calculateOrderAmount = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.amount, 0)
  }

  total = calculateOrderAmount(cartItems)

  total = total * 100

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'GBP',
  })

  res.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController
