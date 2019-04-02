# vsf-facebook-pixel

Facebook Pixel module for Vue Storefront.

### Menu

1. Main features
2. Installation
3. Usage

## 1. Main features

...

## 2. Installation

### Download the module

#### a. Via `git`

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

```bash
cd ../vue-storefront/src/modules;
git clone https://github.com/new-fantastic/vsf-facebook-pixel.git;
```

#### b. Via `npm` / `yarn`

Go to your theme's catalog and install the module from `npm`.

```bash
cd ../vue-storefront/src/themes/your-theme;
yarn add vsf-facebook-pixel;
```

### Import and register the module inside `vue-storefront/src/modules/index.ts`


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

### Add new settings to your `../vue-storefront/config/local.json` file

```json
"facebookPixel" : {
   "id" : "123456789012345"
}
```

## 3. Usage

Events available out-of-the-box:

- `PageView`
- `Search`
- `ViewContent`
- `AddToCart`
- `AddToWishlist`
- `InitiateCheckout`
- `Purchase`
