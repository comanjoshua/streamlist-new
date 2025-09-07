export const isSubscription = (item) => item?.type === 'subscription';


export function validateCartItem(item) {
if (!item) return false;
const required = ['id', 'title', 'price', 'type'];
return required.every((k) => item[k] !== undefined);
}