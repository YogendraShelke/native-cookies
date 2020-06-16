import cookie from 'cookie';
import { NativeModules, Platform } from 'react-native';
const { NativeCookies } = NativeModules;

const { parsedCookie, set } = Platform.select({
    ios: {
        parsedCookie: (value) => value,
        set: (url, name, value, options = {}) => {
            const opts = Object.assign(options);
            for (const key in opts) {
                if (opts.hasOwnProperty(key)) {
                    if (key === 'expires') {
                        opts.expires = +opts.expires / 1000;
                    } else {
                        opts[key] = opts[key] + '';
                    }
                }
            }
            return NativeCookies.setCookie(url, name + '', value + '', opts);
        },
    },
    android: {
        parsedCookie: (value) => cookie.parse(value),
        set: (url, name, value, options = {}) => {
            const serializedCookie = cookie.serialize(name, value, options);
            return NativeCookies.setCookie(url, serializedCookie);
        },
    },
});

const get = async (url, name) => {
    const value = await NativeCookies.getCookie(url);
    return name && value ? parsedCookie(value)[name] : parsedCookie(value);
};

const clear = async (url) => NativeCookies.clearCookie(url);

const clearAll = async () => NativeCookies.clearAllCookies();

export default {
    get,
    set,
    clear,
    clearAll,
};
