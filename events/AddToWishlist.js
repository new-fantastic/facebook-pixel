import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'

export default (fbq, currency) => {
    EventBus.$on('wishlist-add-item', product => {
      const pr = product
      fbq('track', 'AddToWishlist', {
        content_ids: pr.sku,
        content_name: pr.name,
        value: pr.priceInclTax * pr.qty,
        currency,
        content_type: 'product'
      })
    })
}