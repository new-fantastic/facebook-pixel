import { EventAddToCart } from "../types/events";
import config from "config";

export default (fbq, currency, { product }) => {
  const track = (body: EventAddToCart) => {
    fbq("track", "AddToCart", body);
  };

  let content_name = product.childName || product.name

  track({
    content_ids:
      config.facebookPixel.useParentSku && product.parentSku ? product.parentSku : product.sku,
    content_name,
    value: product.priceInclTax * product.qty,
    currency,
    content_type: "product"
  });
};
