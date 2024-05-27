import { VerifyAuthChallengeResponseTriggerEvent, VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event: VerifyAuthChallengeResponseTriggerEvent, context: any): Promise<any> => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);
    const expectedAnswer = event.request.privateChallengeParameters!.secretLoginCode;

    if (event.request.challengeAnswer === expectedAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};
