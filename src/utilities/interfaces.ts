export type privateKeysRandom = "shuffle" | "order" | "consecutive";
export type ProxyType = "http" | "socks"
export type Network = "bnb" | "opbnb"

export interface LoginResponse {
    data: {
        accessToken: string;
        user: {
            id: string;
            created_at: string;
            updated_at: string;
            email: string | null;
            internal_address: string | null;
            user_wallet_address: string;
            auth0_id: string | null;
            invite_code: string;
            invite_chain: any[];
            invited_by_id: string | null;
        };
    };
    statusCode: number;
}

export interface GraphResponse {
    data: {
        userDetail: {
            checkInStatus: {
                checkInDays: number;
                todayCount: number;
            };
            credit: number;
            creditHistories: {
                cursorInfo: {
                    endCursor: string;
                    hasNextPage: boolean;
                };
                items: CreditHistoryItem[];
                total: number;
            };
            invitation: {
                code: string;
                inviteeCount: number;
                leftCount: number;
            };
            origin: {
                email: string | null;
                id: string;
                internalAddress: string | null;
                userWalletAddress: string;
            };
            voteHistoryOfCurrentActivity: any[]; // Replace 'any' with a more specific type if possible
            ambassadorProgram: {
                bonus: number;
                claimed: number;
                family: {
                    checkedInUsers: number;
                    totalUsers: number;
                };
            };
        };
    };
}

interface CreditHistoryItem {
    claimed: boolean;
    extra: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
    id: number;
    score: number;
    signDay: number;
    signInId: number;
    txHash: string | null;
    typ: string;
}

export interface CapMonsterCreateTaskResponse {
    taskId: string;
    errorId: number,
    errorCode: number | null,
    errorDescription: string | null
}

export interface CapMonsterGetTaskResultResponse {
    solution: {
        gRecaptchaResponse: string,
        cost: number,
        status: string,
        errorId: number,
        errorCode: number | null,
        errorDescription: string | null
    };
}

export interface ClaimCreditResponse  {
    data: {
        signature: {
            nonce: number;
            result: string;
            signature: string;
        };
        amount: number;
        history_id: number;
    };
    statusCode: number;
}
