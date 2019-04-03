import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterEach } from './router/afterEach'

export const KEY = 'vsf-facebook-pixel'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration,
  router: { afterEach }
}

export const VsfFacebookPixel = new VueStorefrontModule(moduleConfig)