import {getContract, getRPC} from "./common.js";

export const PROVIDERS = {
    bnb: getRPC(["https://rpc.ankr.com/bsc"]),
    opbnb: getRPC(["https://opBNB-mainnet-rpc.bnbchain.org"]),
}

export const SCAN_LINKS = {
    bnb: "https://bscscan.com/tx/",
    opbnb: "https://opbnbscan.com/tx/",
}

const CONTRACT_ADDRESS = "0xB342e7D33b806544609370271A8D074313B7bc30"

const ABI = `[{"inputs":[{"internalType":"uint64","name":"_startTs","type":"uint64"},{"internalType":"uint64","name":"_endTs","type":"uint64"},{"internalType":"uint16","name":"_maxQuestionId","type":"uint16"}],"name":"addActivity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"newDefaultCredit","type":"uint32"}],"name":"changeDefaultCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"newVoteInterval","type":"uint32"}],"name":"changeDefaultVoteInterval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"code","type":"uint256"}],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"amount","type":"uint32"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"claimCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_activityIndex","type":"uint256"},{"internalType":"uint64","name":"_endTs","type":"uint64"}],"name":"modifyActivityEndTs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"activityIndex","type":"uint256"},{"internalType":"uint256","name":"questionID","type":"uint256"},{"internalType":"uint32","name":"credit","type":"uint32"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}]`

export const CONTRACTS = {
    bnb: await getContract(CONTRACT_ADDRESS, ABI, await PROVIDERS.bnb),
    opbnb: await getContract(CONTRACT_ADDRESS, ABI, await PROVIDERS.opbnb),
}
