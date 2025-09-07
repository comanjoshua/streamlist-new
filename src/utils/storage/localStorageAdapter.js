export const localStorageAdapter = {
get(key) {
try {
const raw = window.localStorage.getItem(key);
return raw ? JSON.parse(raw) : null;
} catch (e) {
console.warn('localStorage get failed', e);
return null;
}
},
set(key, value) {
try {
window.localStorage.setItem(key, JSON.stringify(value));
} catch (e) {
console.warn('localStorage set failed', e);
}
},
remove(key) {
try {
window.localStorage.removeItem(key);
} catch (e) {
console.warn('localStorage remove failed', e);
}
},
};