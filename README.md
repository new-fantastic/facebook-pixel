# vsf-facebook-pixel

<br>

✨ Facebook Pixel module for Vue Storefront ✨

> Facebook Pixel documentation: https://developers.facebook.com/docs/facebook-pixel

<br/>

## Table of Contents

<br/>

- [Main features](#main-features)
- [Installation](#installation)
- [License](#license)

  <br/>

## Main features

<br/>

This module enables you to seamlessly implement **Facebook Pixel** functionality to your Vue Storefront app, featuring generation of standard Facebook Pixel events **out-of-the-box**:

<br/>

### Standard Facebook Pixel events

<br/>

| Event name         | Description                                   | Passed parameters                                                                                                                                                                                                                                                                                                               |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PageView`         | Triggered on every route change.              | _No event-specific parameters_                                                                                                                                                                                                                                                                                                  | `ViewContent` | Triggered on entering Product route. | - `content_ids` (viewed Product SKU)<br/> - `content_name` (viewed Product Name) <br/> - `content_type` (set as `'product'`)<br/> - `currency` (current Store View `currencyCode`)<br/> - `value` (viewed Product Price) |
| `Search`           | Triggered when SearchPanel input has text     | - `search_string` (search input value)                                                                                                                                                                                                                                                                                          |
| `AddToCart`        | Triggered after Product is added to Cart.     | - `content_ids` (added Product SKU)<br/> - `content_name` (added Product Name) <br/> - `content_type` (set as `'product'`)<br/> - `value` (added Product `price` \* `qty`) <br/> - `currency` (current Store View `currencyCode`)                                                                                               |
| `AddToWishlist`    | Triggered after Product is added to Wishlist. | - `content_ids` (added Product SKU)<br/> - `content_name` (added Product Name) <br/> - `content_type` (set as `product`)<br/> - `value` (added Product `price` \* `qty`) <br/> - `currency` (current Store View `currencyCode`)                                                                                                 |
| `InitiateCheckout` | Triggered after Checkout is created.          | - `content_category` (set as `'product'`)<br/> - `content_type` (set as `'product'`)<br/> - `content_ids` (Cart Products SKUs)<br/> - `contents` (Cart contents - SKU, Price, Qty) <br/> - `currency` (current Store View `currencyCode`)<br/> - `num_items` (number of items in Cart)<br/> - `value` (Cart Price for Checkout) |
| `Purchase`         | Triggered after Checkout success.             | - `content_type` (set as `'product'`)<br/> - `content_ids` (bought Products SKUs)<br/> - `contents` (Checkout Cart contents - SKU, Price, Qty)<br/> - `currency` (current Store View `currencyCode`)<br/> - `num_items` (number of bought items in Cart)<br/> - `value` (Checkout Total Price)                                  |

<br/>

## Installation

<br/>

### 1. Download the module

<br/>

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

<br/>

```bash
cd ../vue-storefront/src/modules;
git clone https://github.com/new-fantastic/facebook-pixel.git;
```

<br/>

### 2. Import and register the module

<br/>

Go to `../vue-storefront/src/modules/index.ts` and add code below

<br/>

```js
import { FacebookPixel } from './vsf-facebook-pixel'
...
export const registerModules: VueStorefrontModule[] = [
...
FacebookPixel
...
]
```

<br/>

### 3. Add new settings to your config

<br/>

Go to `../vue-storefront/config/local.json` and add code below

<br/>

```json
"facebookPixel" : {
  "id" : "123456789012345",
  "useParentSku": true
}
```

useParentSku - whether use parent (configurable product)'s sku or simple product's sku - true for parent

<br/>

### 4. Add ViewContent event

<br/>

Go to your product's view and just import ViewContent mixin:

<br/>

```js
import fbqViewContent from 'src/modules/vsf-facebook-pixel/components/ViewContent'

export default {
  // ...
  mixins: [
    // ...
    fbqViewContent
  ],
}
```

### 5. Add Search event

<br/>

Go to your SearchPanel component, import Search mixin, Pixel's event will be dispatched after provided field change (there is watcher on field provided as argument to the mixin):

<br/>

```js
import fbqSearch from 'src/modules/vsf-facebook-pixel/components/Search'

export default {
  // ...
  mixins: [
    // ...
    fbqSearch('search')
  ]
}
```

E.g. above code will watch changes in `search` field.
There is also second optional argument `debounceTime` which allows you to specify debounce time while user typing query in search field.

useParentSku - whether use parent (configurable product)'s sku or simple product's sku - true for parent

<br/>

#### And that's it! You're good to go – the module automatically creates Facebook Pixel events. No need for additional configuration! :sunglasses:

<br/>

## Different FBPixel ID for certain storecode

<br/>

If you want dedicated FBPixel ID for certain storecode you need to set key named in pattern `id_<storeCode>`. Example for `es` storecode:

<br/>

```json
"facebookPixel" : {
  "id" : "123456789012345",
  "id_es": "someSpecialPixelID",
  "useParentSku": true
}
```

<br/>

If corresponding configuration for current storecode is hasn't been set - module will just use value of `id` key as a fallback.

<br/>

## License

<br/>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
