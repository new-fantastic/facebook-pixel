import rootStore from '@vue-storefront/store'
import { isServer } from '@vue-storefront/core/helpers'

import evInitiateCheckout from '../events/InitiateCheckout'

export function beforeEach (to, from, next) {
    const currency = rootStore.state.storeView.i18n.currencyCode
  
    // Each product's route has in name 'product' phrase!
    //console.log(to.name)
    if(!isServer && to.name) {
        if (to.name.includes('checkout')) {
            evInitiateCheckout(fbq, currency)
        }
    }
    next()
}