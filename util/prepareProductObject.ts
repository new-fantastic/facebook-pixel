import config from 'config'
import getCurrency from './getCurrency'

interface FBPixelProduct {
  content_ids: string,
  content_name: string,
  content_type: string,
  value: number,
  currency: string
}

export default (product: any): FBPixelProduct => {
  return {
    content_ids: config.facebookPixel.useParentSku && product.parentSku
      ? product.parentSku
      : product.sku,
    content_name: product.name,
    content_type: 'product',
    value: 'final_price' in product && typeof product.final_price === 'number'
      ? product.final_price * (product.qty || 1)
      : product.priceInclTax * (product.qty || 1),
    currency: getCurrency()
  }
}