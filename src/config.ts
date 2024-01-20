import {privateKeysRandom, ProxyType, Network} from "./utilities/interfaces.js";


// http or socks
export const PROXY_TYPE: ProxyType = "http";

export const REFF_CODE = "n7YYzpG4";

export const CLAIM_REWARDS = false;

export const CAPTCHA = false;

// bnb, opbnb
export const NETWORK: Network = "bnb"

export const CAPMONSTER_API_KEY = "key";

export const GAS_PRICE = [1.01, 1.1];

export const INITIALIZATION_TIME = 10000;

export const EXCHANGE = {
    withdraw: false,
    amountToWithdraw: [0.003, 0.005],
    okxInfo: {
        OKX_API_KEY: 'key',
        OKX_SECRET_KEY: 'key',
        OKX_PASSPHRASE: 'key',
    },
}

// "shuffle", "order", "consecutive",
export const PRIVATE_KEYS_RANDOM_MOD: privateKeysRandom = "shuffle";

export const ORDER = [1, 2, 3]
