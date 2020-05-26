import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default (): string => {
  const storeView = currentStoreView()
  return storeView.i18n.currencyCode
}