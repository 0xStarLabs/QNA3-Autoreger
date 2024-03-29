# QNA3-Autoreger

## 🔗 Links
[![Telegram channel](https://img.shields.io/endpoint?url=https://runkit.io/damiankrawczyk/telegram-badge/branches/master?url=https://t.me/StarLabsTech)](https://t.me/StarLabsTech)
[![Telegram chat](https://img.shields.io/endpoint?url=https://runkit.io/damiankrawczyk/telegram-badge/branches/master?url=https://t.me/StarLabsChat)](https://t.me/StarLabsChat)

🔔 CHANNEL: https://t.me/StarLabsTech

💬 CHAT: https://t.me/StarLabsChat

💰 DONATION EVM ADDRESS: 0x620ea8b01607efdf3c74994391f86523acf6f9e1


## 🚀 Installation
```

# NodeJS is required!
# https://nodejs.org/en/download/current

git clone https://github.com/0xStarLabs/QNA3-Autoreger.git

cd StarLabs-Discord

npm i

if ccxt did not install on the first try
npm uninstall ccxt     (remove the library)
npm i --save ccxt      (re-download)

# Before starting, configure the necessary modules in config.ts and /data files

npm start
```

## ⚙️ Config

| Name | Description |
| --- | --- |
| REFF_CODE | refferal code for login |
| CLAIM_REWARDS | to claim all rewards or not (true / false) |
| CAPTCHA | to solve captcha or not (true / false) |
| NETWORK | (bnb / opbnb) |
| CAPMONSTER_API_KEY | key from capmonster if CAPTCHA - true |
| PROXY_TYPE | proxy type you are using (http / socks) |
| GAS_PRICE | Gas Price with which the transaction will be sent (better to not touch) |
| EXCHANGE | Choose whether to use the exchange in the exchange variable (true / false). If false - will work with what is in the wallet. If true - at startup, it will withdraw native coin. (You must have coin on OKEX to withdraw them). 
| OKX_API_KEY |	API key |
| OKX_SECRET_KEY | secret key (given when generating an API key) |
| OKX_PASSPHRASE | account password |
| INITIALIZATION_TIME |	How many seconds all threads will start. For example, you have 100 accounts, you set 10000 seconds. The bot will start each subsequent account in the interval of 50 - 200 seconds. |
| PRIVATE_KEYS_RANDOM_MOD |Private key randomization mode. shuffle - shuffles each time it starts. order - follows the list from the variable of the same name below, consecutive - just goes in order. |
| ORDER | Numbers of private keys by which the script will start, if you choose the order mode in privateKeysRandomMod. For example, you specify 1, 7, 2. The script will first start wallet 1, then wallet 7, then wallet 2. |

## 🗂️ Data
Data in the data folder:
| Name | Description |
| --- | --- |
| private_keys.txt |	Private keys |
| proxies.txt |	Proxies: login:pass@ip:port |
