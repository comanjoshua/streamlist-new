import { useCallback, useState } from 'react';
import { localStorageAdapter } from '../utils/storage/localStorageAdapter';


export function useLocalStorage(key, initialValue) {
const [state, setState] = useState(() => {
const v = localStorageAdapter.get(key);
return v ?? initialValue;
});


const set = useCallback(
(value) => {
setState(value);
localStorageAdapter.set(key, value);
},
[key]
);


return [state, set];
}