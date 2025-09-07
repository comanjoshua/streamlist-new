import { config } from '../app/config';


export const calcSubtotal = (items = []) =>
items.reduce((sum, i) => sum + i.price * i.qty, 0);


export const calcTax = (subtotal, taxRate = config.taxRate) =>
+(subtotal * taxRate).toFixed(2);


export const calcTotal = (subtotal, tax) => +(subtotal + tax).toFixed(2);


export const eligibleFreeShipping = (subtotal) =>
config.enableFreeShippingThreshold && subtotal >= config.freeShippingThreshold;