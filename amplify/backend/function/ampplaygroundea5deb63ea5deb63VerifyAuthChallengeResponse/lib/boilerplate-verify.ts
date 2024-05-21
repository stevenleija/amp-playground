import { VerifyAuthChallengeResponseTriggerEvent, VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event: VerifyAuthChallengeResponseTriggerEvent, context: any): Promise<any> => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);

    if (event?.request?.privateChallengeParameters?.answer === event?.request?.challengeAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};
