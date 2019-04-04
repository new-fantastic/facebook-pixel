import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'

export default (fbq, currency) => {
    const isInt = n => Number(n) === n && n % 1 === 0

    EventBus.$on('order-after-placed', payload => {
        const order = payload.order

        const content_ids = []
        const contents = []
        let value = 0
        let num_items = 0

        order.products.forEach(item => {
          content_ids.push(item.sku)
          contents.push({
            'id': item.sku,
            'quantity': item.qty,
            'item_price': item.priceInclTax
          })
          const thePrice = (isInt(item.price) ? item.price : item.priceInclTax) * item.qty
          num_items += Number(item.qty)
          value += thePrice
        })

        fbq('track', 'Purchase', {
          value,
          currency,
          content_ids,
          content_type: 'product',
          contents,
          num_items
        })
    })
}