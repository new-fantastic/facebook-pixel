import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { Route } from "vue-router";
import prepareProductObject from './util/prepareProductObject';

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

          store.subscribe(({ type, payload }, state) => {
            // Adding a Product to a Shopping Cart
            if (type === 'cart/cart/ADD') {
              fbq("track", "AddToCart", prepareProductObject(payload.product));
            }
            if (type.includes('wishlist/ADD')) {
              fbq("track", "AddToWishlist", prepareProductObject(payload.product));
            }
          })
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
