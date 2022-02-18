const getFromLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

/**
 * 
 * @param {String} key 
 * @param {*} value 
 * @returns Sets key value pair to Local Storage
 */
const storeToLocalStorage = (key, value) => {
	return localStorage.setItem(key, JSON.stringify(value));
};

export { getFromLocalStorage, storeToLocalStorage };
