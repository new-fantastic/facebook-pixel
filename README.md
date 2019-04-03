# vsf-facebook-pixel

Facebook Pixel module for Vue Storefront.

<br>

## Main features

...

## Installation

<br>

### 1. Download the module

<br>

#### a. Via `git`

<br>

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

```bash
cd ../vue-storefront/src/modules;
git clone https://github.com/new-fantastic/vsf-facebook-pixel.git;
```

<br>

#### b. Via `npm` / `yarn`

<br>

Go to your theme's catalog and install the module from `npm`.

```bash
cd ../vue-storefront/src/themes/your-theme;
yarn add vsf-facebook-pixel;
```

<br>

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

### 3. Add new settings to your `../vue-storefront/config/local.json` file

```json
"facebookPixel" : {
   "id" : "123456789012345"
}
```

## Usage

Events available out-of-the-box:

- [x] `PageView`
- [x] `ViewContent`
- [ ] `Search`
- [ ] `AddToCart`
- [ ] `AddToWishlist`
- [ ] `InitiateCheckout`
- [ ] `Purchase`
