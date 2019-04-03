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

export default (fbq, currency) => {
    let myDebounce = null

    // Product first time added to cart
    EventBus.$on('cart-before-add', product => {
        
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