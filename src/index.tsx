import { NativeModules } from 'react-native';

type NativeCookiesType = {
  multiply(a: number, b: number): Promise<number>;
};

const { NativeCookies } = NativeModules;

export default NativeCookies as NativeCookiesType;
