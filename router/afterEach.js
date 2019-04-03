import rootStore from '@vue-storefront/store'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function afterEach(to, from) {
  const currency = rootStore.state.storeView.i18n.currencyCode

  // Each product's route has in name 'product' phrase!
  if(to.name.match(/product/)) {
    // View content
    

    if(!isServer) {
      const currentProduct = rootStore.state.product.current
      fbq('track', 'ViewContent', {
        content_ids: currentProduct.sku,
        content_name: currentProduct.name,
        content_type: currentProduct.type_id,
        currency,
        value: currentProduct.priceInclTax
      })
    }
  }

  if(!isServer) {
    let myDebounce = null
    let justAdded = false

    // It gets trigerred after refresh!
    EventBus.$on('cart-before-add', product => {

      // Event is triggered like 5 times
      // I used debounce, so it will send 
      // event only once in 1000ms period
      if(!myDebounce) {
        myDebounce = debounce(() => {
          const pr = product.product
          fbq('track', 'AddToCart', {
            content_ids: pr.sku,
            content_name: pr.name,
            value: pr.priceInclTax * pr.qty,
            currency,
            content_type: 'product'
          })
        }, 1000)
      }
      myDebounce()
    })

    EventBus.$on('cart-before-itemchanged', product => {

      if(!myDebounce) {
        myDebounce = debounce(() => {
          const pr = product.item
          fbq('track', 'AddToCart', {
            content_ids: pr.sku,
            content_name: pr.name,
            value: pr.priceInclTax * pr.qty,
            currency,
            content_type: 'product'
          })
        }, 1000)
      }
      if(myDebounce && product.item.qty > 1 && product.item.prev_qty < product.item.qty) {
        myDebounce()
      }
    })
  }
}