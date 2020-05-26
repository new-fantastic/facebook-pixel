import prepareProductObject from '../util/prepareProductObject'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  watch: {
    product: {
      deep: true,
      immediate: true,
      handler (product, oldProduct) {
        if (isServer) {
          return
        }
        if (!oldProduct || (product && (product.id !== oldProduct.id || product.sku !== oldProduct.sku))) {
          this.fbViewContent(product)
        }
      }
    }
  },
  methods: {
    fbViewContent (product = this.product) {
      fbq('track', 'ViewContent', prepareProductObject(product))
    }
  }
}