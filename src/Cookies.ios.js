import { NativeModules } from 'react-native';

const { NativeCookies } = NativeModules;

export default {
  get(url: String, name?: String): Promise<Object | String> {
    return NativeCookies.getCookie(url).then((cookie: Object): Object => {
      if (name && cookie) {
        return cookie[name] || null;
      } else {
        return cookie ? cookie : null;
      }
    });
  },

  set(url: String, name: String, value: any, options?: Object = {}): Promise {
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
  },

  clear(url?: String): Promise {
    return url
      ? NativeCookies.clearCookieFromURL(url)
      : NativeCookies.clearCookies();
  },
};
