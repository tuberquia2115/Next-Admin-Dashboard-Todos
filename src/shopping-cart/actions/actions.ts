import { getCookie, hasCookie, setCookie } from 'cookies-next';

/**
 * kookie: cart
  {
    'uui-123-1': 3,
    'uui-123-1': 2,
    'uui-123-1': 4,
  }
 */

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookirCart = JSON.parse((getCookie('cart') as string) ?? '{}');
    return cookirCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  delete cookieCart[id];

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};
