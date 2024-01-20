import {ethers} from "ethers";
import { Got } from "got";
import {CAPTCHA, CLAIM_REWARDS, GAS_PRICE, NETWORK, REFF_CODE} from "../config.js";
import {handleResponse, retry} from "../utilities/wrappers.js";
import logger from "../utilities/logger.js";
import {getRandomDigital} from "../utilities/random.js";
import {ClaimCreditResponse, GraphResponse, LoginResponse} from "../utilities/interfaces.js";
import {sleep} from "../utilities/common.js";
import {Recaptcha} from "./recaptcha.js";
import {CONTRACTS, PROVIDERS} from "../utilities/constants.js";


export class Qna {
    private client: Got;
    private readonly wallet: ethers.Wallet;
    private readonly walletNumber: number;
    private readonly address: string;
    
    constructor(wallet: ethers.Wallet, walletNumber: number, client: Got) {
        this.wallet = wallet;
        this.address = wallet.address;
        this.client = client;
        this.walletNumber = walletNumber;
    }

    private async login() {
        try {
            return await retry(async () => {

                const message = "AI + DYOR = Ultimate Answer to Unlock Web3 Universe";
                // const jsonMessage = JSON.stringify({msg: message});
                const signature = await this.wallet.signMessage(message);

                let jsonData: any = {
                    'invite_code': REFF_CODE,
                    'signature': signature,
                    'wallet_address': this.address
                }

                if (CAPTCHA) {
                    const captcha = new Recaptcha(this.client);
                    const captchaResult = await captcha.solveCaptcha();
                    jsonData['recaptcha'] = captchaResult
                }

                logger.info(`| ${this.walletNumber} | ${this.address} | Trying to login`);
                const responseRaw = await this.client.post(
                    `https://api.qna3.ai/api/v2/auth/login?via=wallet`,
                    {
                        json: jsonData,
                        responseType: 'json'
                    },
                );

                const response = responseRaw.body as LoginResponse;
                const token = response.data.accessToken;
                this.client = this.client.extend({
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                });
                logger.success(`| ${this.walletNumber} | ${this.address} | Successfully logged in`);
                return token;
            });
        } catch (error: any) {
            throw new Error("Error in Qna - login: " + error.message);
        }
    };

    private async checkIn() {
        try {
            return await retry(async () => {
                logger.info(`| ${this.walletNumber} | ${this.address} | Doing checkIn`);

                const contract = CONTRACTS[NETWORK].connect(this.wallet);
                const tx = await contract.checkIn(1, {
                    gasPrice: ethers.utils.parseUnits(getRandomDigital(GAS_PRICE[0], GAS_PRICE[1]).toFixed(2), "gwei")
                });
                const txResponse = await tx.wait();
                const [txResult, result] = await handleResponse(
                    txResponse, this.walletNumber, NETWORK, "CHECK IN");

                if ( result ) {
                    await this.client.post(
                        "https://api.qna3.ai/api/v2/my/check-in",
                        {
                            json: {
                                'hash': txResult.transactionHash,
                                'via': NETWORK,
                            },
                            responseType: "json"
                        });
                    logger.success(`| ${this.walletNumber} | ${this.address} | Successfully checked in`);
                }
            });
        } catch (error: any) {
            logger.error("Error in Qna - checkIn: " + error.message);
        }
    }

    private async claimRewards() {
        try {
            return await retry(async () => {
                const wallet = new ethers.Wallet(this.wallet.privateKey, await PROVIDERS.bnb);
                const contract = CONTRACTS["bnb"].connect(wallet);

                const responseRaw = await this.client.post(
                    'https://api.qna3.ai/api/v2/my/claim-all',
                    {
                        json: {
                        },
                        responseType: "json"
                    }
                )
                const response = responseRaw.body as ClaimCreditResponse;

                const amount = response.data.amount;
                const nonce = response.data.signature.nonce;
                const signature = response.data.signature.signature;

                const tx = await contract.claimCredit(
                    amount,
                    nonce,
                    signature,
                    {
                        gasPrice: ethers.utils.parseUnits(getRandomDigital(GAS_PRICE[0], GAS_PRICE[1]).toFixed(2), "gwei")
                    }
                );
                const txResponse = await tx.wait();
                return handleResponse(txResponse, this.walletNumber, "bnb", "CLAIM REWARDS");
            });
        } catch (error: any) {
            logger.error("Error in Qna - claimRewards: " + error.message);
        }
    }

    private async checkСlaim() {
        try {
            return await retry(async () => {
                const responseRaw = await this.client.post('https://api.qna3.ai/api/v2/graphql',
                    {
                        json: {
                            "query": "query loadUserDetail($cursored: CursoredRequestInput!) {\n  userDetail {\n    checkInStatus {\n      checkInDays\n      todayCount\n    }\n    credit\n    creditHistories(cursored: $cursored) {\n      cursorInfo {\n        endCursor\n        hasNextPage\n      }\n      items {\n        claimed\n        extra\n        id\n        score\n        signDay\n        signInId\n        txHash\n        typ\n      }\n      total\n    }\n    invitation {\n      code\n      inviteeCount\n      leftCount\n    }\n    origin {\n      email\n      id\n      internalAddress\n      userWalletAddress\n    }\n    externalCredit\n    voteHistoryOfCurrentActivity {\n      created_at\n      query\n    }\n    ambassadorProgram {\n      bonus\n      claimed\n      family {\n        checkedInUsers\n        totalUsers\n      }\n    }\n  }\n}",
                            "variables": {
                                "cursored": {
                                    "after": "",
                                    "first": 20
                                },
                            }
                        },
                        responseType: 'json'
                    },
                )
                const response = responseRaw.body as GraphResponse;
                const count = response.data.userDetail.checkInStatus.todayCount;
                return count;
            });
        } catch (error: any) {
            throw new Error("Error in Qna - login: " + error.message);
        }
    }

    async execute() {
        try {
            return await retry(async () => {
                await this.login();
                await sleep(5, 10)

                const claimCount = await  this.checkСlaim();
                if (claimCount == 0) {
                    await this.checkIn();
                }

                if (CLAIM_REWARDS) {
                    await this.claimRewards();
                }
            });
        } catch (error: any) {
            logger.error(`| ${this.walletNumber} | Error in Qna - execute:`, error.message);
        }
    }
}
