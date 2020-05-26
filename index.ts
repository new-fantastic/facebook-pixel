import { CartItem } from '@vue-storefront/core/modules/cart/types/CartItem';
import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { Route } from "vue-router";
import prepareProductObject from './util/prepareProductObject';
import Vue from 'vue'
import getCurrency from './util/getCurrency';

declare const fbq;

const facebookPixelSnippet = function(f, b, e, v, callback) {
  let n, t, s;
  if (f.fbq) return;
  n = f.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
  t.onload = callback;
};

export const FacebookPixel: StorefrontModule = function ({ router, store, appConfig }) {
  if (!isServer) {
    if (!appConfig.facebookPixel || !appConfig.facebookPixel.id) {
      console.log('[FBP] Check FBPixel configuration! ID not prvodied')
    } else {
      facebookPixelSnippet(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
        () => {
          fbq("init", appConfig.facebookPixel.id);
          fbq("track", "PageView");
  
          router.afterEach((to: Route, from: Route) => {
            fbq("track", "PageView");
          
            // Each product's route has in name 'product' phrase!
            // Better to prepare mixin for that
            // if (!isServer) {
            //   if (to.name.match(/product/)) {
            //     // ViewContent event
            //     evViewContent(fbq, rootStore.state.product.current, currency);
            //   }
            // }
          })

          store.subscribe(({ type, payload }) => {
            // Adding a Product to the Shopping Cart
            if (type === 'cart/cart/ADD') {
              fbq("track", "AddToCart", prepareProductObject(payload.product));
            }
            // Adding a Product to the Wishlist
            if (type.includes('wishlist/ADD')) {
              fbq("track", "AddToWishlist", prepareProductObject(payload.product));
            }
          })
        
          Vue.prototype.$on("checkout-after-created", async data => {
            const content_ids: Array<string | number> = [];
            const contents: CartItem[] = [];
            let num_items: number = 0;
            for (let item of store.state.cart.cartItems) {
              content_ids.push(
                appConfig.facebookPixel.useParentSku && item.parentSku
                  ? item.parentSku
                  : item.sku
              );
              contents.push({
                id: appConfig.facebookPixel.useParentSku && item.parentSku
                  ? item.parentSku
                  : item.sku,
                quantity: item.qty,
                item_price: item.priceInclTax
              });
              num_items += Number(item.qty);
            }

            const totals = store.getters["cart/totals"]
            const fullPrice = totals.find(total => total.code == 'grand_total')
        
            fbq("track", "InitiateCheckout", {
              content_category: "product",
              content_type: "product",
              content_ids,
              contents,
              currency: getCurrency(),
              num_items,
              value:
                fullPrice && fullPrice.value 
                ? fullPrice.value 
                : (store.getters["cart/totals"][
                    store.getters["cart/totals"].length - 1
                  ].value)
            });
          });
        }
      )
    }
  }
  // StorageManager.init('wishlist')
  // store.registerModule('wishlist', {
  //   ...wishlistStore,
  //   actions
  // })
  // store.subscribe(whishListPersistPlugin)

  // once('__VUE_WISHLIST__', () => {
  //   EventBus.$on('user-after-loggedin', () => {
  //     store.dispatch('wishlist/load', { force: true })
  //   })
  // })
}
