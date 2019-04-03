# vsf-facebook-pixel

Facebook Pixel module for Vue Storefront.

> Facebook Pixel documentation: https://developers.facebook.com/docs/facebook-pixel

<br>

## Main features

This module enables you to seamlessly implement **Facebook Pixel** functionality to your Vue Storefront app.

<br>

It features generating standard Facebook Pixel events **out-of-the-box**:

- `PageView` - default event on triggered on every route change

- `ViewContent` - triggered on entering `pages/Product.vue` route. Available object properties:
  - `content_ids` (viewed Product SKU)
  - `content_name` (viewed Product Name)
  - `content_type` (set as `product`)
  - `currency` (current Store View `currencyCode`)
  - `value` (viewed Product Price)

- `AddToCart` - triggered after Product is added to cart. Available object properties:
  - `content_ids` (viewed Product SKU)
  - `content_name` (viewed Product Name)
  - `content_type` (set as `product`)
  - `value` (viewed Product Price)
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


### 2. Import and register the module 

<br>

Go to `../vue-storefront/src/modules/index.ts` and add code below

<br>

```js
import { VsfFacebookPixel } from './vsf-facebook-pixel' // if installed via Git
// or
import { VsfFacebookPixel } from 'vsf-facebook-pixel'  // if installed via NPM/Yarn
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

### 4. Set ESLint to ignore the module

<br>

Go to `../vue-storefront/.eslintignore` and add code below

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
- [ ] `Search`
- [x] `AddToCart`
- [ ] `AddToWishlist`
- [ ] `InitiateCheckout`
- [ ] `Purchase`
