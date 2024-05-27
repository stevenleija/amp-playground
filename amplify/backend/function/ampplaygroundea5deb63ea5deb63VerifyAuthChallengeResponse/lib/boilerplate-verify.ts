import { VerifyAuthChallengeResponseTriggerEvent, VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event: VerifyAuthChallengeResponseTriggerEvent, context: any): Promise<any> => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);
    const secretLoginCode = event.request.privateChallengeParameters!.secretLoginCode;
    event.response.answerCorrect = event.request.challengeAnswer === secretLoginCode;
    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};
