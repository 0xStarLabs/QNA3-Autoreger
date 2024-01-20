import {CAPMONSTER_API_KEY} from "../config.js";
import {CapMonsterCreateTaskResponse, CapMonsterGetTaskResultResponse,} from "../utilities/interfaces.js";
import { Got } from "got";
import {retry} from "../utilities/wrappers.js";

export class Recaptcha {
    private readonly client: Got;

    constructor(client: Got) {
        this.client = client;
    }

    private async createTask(): Promise<string> {
        try {
            return await retry(async () => {
                const responseRaw = await this.client.post(
                'https://api.capmonster.cloud/createTask',
                    {
                        json: {
                            'clientKey': CAPMONSTER_API_KEY,
                            'task': {
                                'type': 'RecaptchaV3TaskProxyless',
                                'websiteURL': 'https://qna3.ai',
                                'websiteKey': "6Lcq80spAAAAADGCu_fvSx3EG46UubsLeaXczBat"
                            }
                        },
                        responseType: "json"
                    }
                );
            const response = responseRaw.body as CapMonsterCreateTaskResponse;
            return response.taskId;
            });
        } catch (error: any) {
            throw new Error("Error in Recaptcha - createTask: " + error.message);
        }
    }

    private async getTaskResult(taskId: string) {
        try {
            return await retry(async () => {
                const responseRaw = await this.client.post(
                    'https://api.capmonster.cloud/getTaskResult',
                    {
                        json: {
                            'clientKey': CAPMONSTER_API_KEY,
                            'taskId': taskId
                        },
                        responseType: "json"
                    });
                const response = responseRaw.body as CapMonsterGetTaskResultResponse;
                return response.solution;
            });
        } catch (error: any) {
            throw new Error("Error in Recaptcha - getTaskResult: " + error.message);
        }
    }

    async solveCaptcha() {
        try {
            return await retry(async () => {
                const taskId = await this.createTask();
                const solution = await this.getTaskResult(taskId);
                return solution;
            });
        } catch (error: any) {
            throw new Error("Error in Recaptcha - solveCaptcha: " + error.message);
        }
    }
}