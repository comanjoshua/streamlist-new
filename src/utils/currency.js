export function formatCurrency(amount, currency = 'USD', locale = undefined) {
const safe = Number.isFinite(amount) ? amount : 0;
return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
safe
);
}