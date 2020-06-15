import { NativeModules } from 'react-native';
import cookie from 'cookie';

const CLEAR_RETRY_COUNT = 10;
const NativeCookies = NativeModules.NativeCookies;

const get = (url, name) => NativeCookies.getCookie(url).then(
    value => {
        if (name && value) {
            return cookie.parse(value)[name] || null;
        } else {
            return value ? cookie.parse(value) : null;
        }
    }
);

const set = (url, name, value, options) => NativeCookies.setCookie(
    url,
    cookie.serialize(name, value, options)
);

const clear = async (url) => {
    await NativeCookies.clearCookie(url || null);

    if (!url) {
        return null;
    }
    const data = await this.get(url);
    return data
        ? new Promise((resolve, reject) => {
            let retryCount = 0;
            const self = this;
            async function retry() {
                retryCount++;
                await NativeCookies.clearCookie(url);

                if (!(await self.get(url))) {
                    resolve(null);
                } else if (retryCount <= CLEAR_RETRY_COUNT) {
                    retry();
                } else {
                    reject(null);
                }
            }
            retry();
        })
        : null;
}

export default {
    get,
    set,
    clear
};