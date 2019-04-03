# vsf-facebook-pixel

Facebook Pixel module for Vue Storefront.

> Facebook Pixel documentation: https://developers.facebook.com/docs/facebook-pixel

<br>

## Main features

<br>

This module enables you to seamlessly implement **Facebook Pixel** functionality to your Vue Storefront app, featuring generation of standard Facebook Pixel events **out-of-the-box**:

- `PageView` - default event on triggered on every route change

- `ViewContent` - triggered on entering `pages/Product.vue` route. Available object properties:
  - `content_ids` (viewed Product SKU)
  - `content_name` (viewed Product Name)
  - `content_type` (set as `product`)
  - `currency` (current Store View `currencyCode`)
  - `value` (viewed Product Price)

- `AddToCart` - triggered after Product is added to Cart. Available object properties:
  - `content_ids` (added Product SKU)
  - `content_name` (added Product Name)
  - `content_type` (set as `product`)
  - `value` (added Product `price` * `qty`)
  - `currency` (current Store View `currencyCode`)
  
- `AddToWishlist` - triggered after Product is added to Wishlist. Available object properties:
  - `content_ids` (added Product SKU)
  - `content_name` (added Product Name)
  - `content_type` (set as `product`)
  - `value` (added Product `price` * `qty`)
  - `currency` (current Store View `currencyCode`)

<br>

## Installation

<br>

### 1. Download the module

<br>

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

```bash
cd ../vue-storefront/src/modules;
git clone https://github.com/new-fantastic/vsf-facebook-pixel.git;
```

<br>

### 2. Import and register the module 

<br>

Go to `../vue-storefront/src/modules/index.ts` and add code below

<br>

```js
import { VsfFacebookPixel } from './vsf-facebook-pixel'
...
export const registerModules: VueStorefrontModule[] = [
...
VsfFacebookPixel
...
]
```

<br>

### 3. Add new settings to your config

<br>

Go to `../vue-storefront/config/local.json` and add code below

<br>

```json
"facebookPixel" : {
   "id" : "123456789012345"
}
```

<br>

### 4. Set the module to be ignored by ESLint

<br>

Go to `../vue-storefront/.eslintignore` and add code below

<br>

```
src/modules/vsf-facebok-pixel
```

<br>

### And that's it! You're good to go :)

<br>

## Roadmap

Standard events out-of-the-box:

- [x] `PageView`
- [x] `ViewContent`
- [x] `AddToCart`
- [x] `AddToWishlist`
- [ ] `InitiateCheckout`
- [ ] `Purchase`
- [ ] `Search`
