import prepareProductObject from '../util/prepareProductObject'

export default {
  watch: {
    product: {
      deep: true,
      immediate: true,
      handler (product, oldProduct) {
        if (product.id != oldProduct.id || product.sku != oldProduct.sku) {
          this.fbViewContent(product)
        }
      }
    }
  },
  methods: {
    fbViewContent(product = this.product) {
      fbq('track', 'ViewContent', prepareProductObject(product))
    }
  }
}