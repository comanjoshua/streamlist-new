import { calcSubtotal } from '../utils/totals';


test('subtotal multiplies price * qty across items', () => {
const items = [
{ id: 'a', price: 10, qty: 2 },
{ id: 'b', price: 5, qty: 3 },
];
expect(calcSubtotal(items)).toBe(10*2 + 5*3);
});