
export const ACCESS_TOKEN = 'accessToken';
export const USER_INFO = 'userInfo';
export const SEARCH_PARAMS = 'searchParams';
export const ACTIVE_PAGE = 'activePage'
export const REFRESH_TOKEN = 'refreshToken';
export const EXPIRED_DATE = "expiredDate";
export const SSO_STATE = "ssoState"
export const SSO_VERIFY = 'ssoVerify'
export const ID_TOKEN = 'idToken'
export const MAX_LENGTH_PROMPT = 1000
export const MAX_LENGTH_NON_PROMPT = 100

export const loadState = (key) => {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};
const getData = (key) => {
	try {
		const value = localStorage.getItem(key);
		if (value !== null) {
			return value;
		}
		return null;
	} catch (error) {
		return null;
	}
};
const saveState = (key, value) => {
	try {
		const serializedState = value;
		localStorage.setItem(key, serializedState);
	} catch {
		// ignore write errors
	}
};
const deleteData = (key) => {
	try {
		localStorage.removeItem(key);
		return true;
	} catch (error) {
		return false;
	}
};

const CryptoJS = require('crypto-js');

export const getToken = () => {
	try {
		const value = getData(ACCESS_TOKEN);
		if (value !== null) {
			return value;
		}
		return null;
	} catch (error) {
		return null;
	}
};
export const saveToken = (value) => {
	try {
		saveState(ACCESS_TOKEN, value);
		return true;
	} catch {
		return false;
	}
};
export const saveIdToken = (value) => {
	try {
		saveState(ID_TOKEN, value);
		return true;
	} catch {
		return false;
	}
};
export const deleteToken = () => {
	const result = deleteData(ACCESS_TOKEN);
	return result;
};

export const getUserInfo = () => {
	try {
		const value = getData(USER_INFO);
		if (value !== null || value !== undefined) {
			return value;
		}
		return null;
	} catch (error) {
		return null;
	}
};
export const saveUserInfo = (value) => {
	try {
		saveState(USER_INFO, value);
		return true;
	} catch {
		return false;
	}
};

export const deleteUserInfo = () => {
	const result = deleteData(USER_INFO);
	return result;
};

export const saveSearchParams = (value) => {
	try {
		saveState(SEARCH_PARAMS, value);
		return true;
	} catch {
		return false;
	}
};
export const getSearchParams = () => {
	try {
		const value = getData(SEARCH_PARAMS);
		if (value !== null && value !== undefined) {
			return JSON.parse(value);
		}
		return {};
	} catch (error) {
		return {};
	}
}
export const deleteSearchParams = () => {
	const result = deleteData(SEARCH_PARAMS);
	return result;
};

export const saveActivePage = (value) => {
	try {
		saveState(ACTIVE_PAGE, value);
		return true;
	} catch {
		return false;
	}
};
export const getActivePage = () => {
	try {
		const value = getData(ACTIVE_PAGE);
		if (value !== null && value !== undefined) {
			return parseInt(value);
		}
		return 1;
	} catch (error) {
		return 1;
	}
}
export const deleteActivePage = () => {
	const result = deleteData(ACTIVE_PAGE);
	return result;
};

export const getRefreshToken = () => {
	try {
		const value = getData(REFRESH_TOKEN);
		if (value !== null) {
			return value;
		}
		return null;
	} catch (error) {
		return null;
	}
};
export const saveRefreshToken = (value) => {
	try {
		saveState(REFRESH_TOKEN, value);
		return true;
	} catch {
		return false;
	}
};
export const deleteRefreshToken = () => {
	const result = deleteData(REFRESH_TOKEN);
	return result;
};

export const saveExpiredDate = (value) =>{
	try {
		saveState(EXPIRED_DATE, value);
		return true;
	} catch {
		return false;
	}
}
export const getExpiredDate = () =>{
	try {
		const value = getData(EXPIRED_DATE);
		if (value !== null) {
			return value;
		}
		return null;
	} catch (error) {
		return null;
	}
}
export const deleteExpiredDate = () =>{
	try {
		deleteData(EXPIRED_DATE);
		return true;
	} catch {
		return false;
	}
}

export const saveSSO = (key, value) => {
	try {
		const item = {
			value: value,
			expiry: Math.round((new Date().getTime() + 87600) / 1000)
		}
		saveState(key, JSON.stringify(item))
	} catch {
		return null;
	}
}

export const base64URLEncode = (str) => {
	const base64String = str.toString(CryptoJS.enc.Base64, { padding: false });
	return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export const sha256 = (str) => {
	const encodedVerifier = CryptoJS.enc.Utf8.parse(str);
	const hash = CryptoJS.SHA256(encodedVerifier);

	return CryptoJS.enc.Base64url.stringify(hash);
}

export const generateState = (length) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var randomString = ''
	for (let i = 0; i < length; i++) {
		var randomIndex = Math.floor(Math.random() * characters.length)
		randomString += characters[randomIndex]
	}

	return randomString
}
export const parseJwt = (token) => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

export const deleteLocalStorage = () => {
	deleteActivePage();
	deleteSearchParams();
	deleteToken();
	deleteUserInfo();
	deleteRefreshToken();
	deleteExpiredDate();
};
