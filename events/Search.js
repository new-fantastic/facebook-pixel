import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'

export default (fbq) => {
    let myDebounce = null

    EventBus.$on('product-after-list', payload => {
        if(payload.query._searchText.length > 0) {
            if(!myDebounce) {
                myDebounce = debounce(function(){
                    fbq('track', 'Search', arguments[0])
                }, 1000)
            }

            myDebounce({
                search_string: payload.query._searchText
            })
        }
    })
}