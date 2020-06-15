import { NativeModules } from 'react-native';

const NativeCookies = NativeModules.NativeCookies;

const get = (url, name) => NativeCookies.getCookie(url).then(cookie => {
    if (name && cookie) {
        return cookie[name] || null;
    } else {
        return cookie ? cookie : null;
    }
});

const set = (url, name, value, options = {}) => {
    const opts = Object.assign(options);
    for (let key in opts) {
        if (opts.hasOwnProperty(key)) {
            if (key === 'expires') {
                opts.expires = +opts.expires / 1000;
            } else {
                opts[key] = opts[key] + '';
            }
        }
    }
    return NativeCookies.setCookie(url, name + '', value + '', opts);
}

const clear = url => url
    ? NativeCookies.clearCookieFromURL(url)
    : NativeCookies.clearCookies();

export default {
    get,
    set,
    clear
};