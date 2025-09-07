import { isSubscription, validateCartItem } from '../utils/guards';


test('isSubscription detects subscription type', () => {
expect(isSubscription({ type: 'subscription' })).toBe(true);
expect(isSubscription({ type: 'accessory' })).toBe(false);
});


test('validateCartItem requires id, title, price, type', () => {
expect(validateCartItem({ id: 1, title: 'X', price: 1, type: 'subscription' })).toBe(true);
expect(validateCartItem({ id: 1, title: 'X' })).toBe(false);
});