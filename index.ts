import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { Route } from "vue-router";
import prepareProductObject from './util/prepareProductObject';
import prepareCheckoutObject from './util/prepareCheckoutObject';
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
        
          Vue.prototype.$on("checkout-after-created", () => {
            fbq('track', 'InitiateCheckout', prepareCheckoutObject(store, false));
          });

          Vue.prototype.$bus.$on('order-before-placed', (payload) => {
            fbq('track', 'Purchase', prepareCheckoutObject(store, true));
          })
        }
      )
    }
  }
}
