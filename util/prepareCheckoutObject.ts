import getCurrency from './getCurrency';
import config from 'config';
import { CartItem, EventPurchase, EventInitiateCheckout } from '../types/events';

export default (store: any, isPurchase: boolean): EventInitiateCheckout | EventPurchase => {
  const content_ids: Array<string | number> = [];
  const contents: CartItem[] = [];
  let num_items: number = 0;
  for (let item of store.state.cart.cartItems) {
    content_ids.push(
      config.facebookPixel.useParentSku && item.parentSku
        ? item.parentSku
        : item.sku
    );
    contents.push({
      id:
        config.facebookPixel.useParentSku && item.parentSku
          ? item.parentSku
          : item.sku,
      quantity: item.qty,
      item_price: item.priceInclTax,
    });
    num_items += Number(item.qty);
  }

  const totals = store.getters['cart/getTotals'];
  const fullPrice = totals.find(total => total.code == 'grand_total');

  return {
    ...(!isPurchase ? {content_category: 'product'} : {}),
    content_type: 'product',
    content_ids,
    contents,
    currency: getCurrency(),
    num_items,
    value:
      fullPrice && fullPrice.value
        ? fullPrice.value
        : store.getters['cart/getTotals'][store.getters['cart/getTotals'].length - 1]
            .value,
  };
};
