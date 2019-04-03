export default (fbq, product, currency) => {
    fbq('track', 'ViewContent', {
        content_ids: product.sku,
        content_name: product.name,
        content_type: 'product',
        currency,
        value: product.priceInclTax
    })
}