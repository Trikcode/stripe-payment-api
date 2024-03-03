const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeController = async (req, res) => {
  const { cartItems } = req.body

  const calculateOrderAmount = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.amount, 0)
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cartItems),
    currency: 'usd',
  })

  res.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController
