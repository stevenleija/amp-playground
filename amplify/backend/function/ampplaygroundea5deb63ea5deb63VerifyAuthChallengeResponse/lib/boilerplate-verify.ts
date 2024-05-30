import { VerifyAuthChallengeResponseTriggerEvent, VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';

export const handler: VerifyAuthChallengeResponseTriggerHandler = async (event: VerifyAuthChallengeResponseTriggerEvent, context: any): Promise<any> => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);

    event.response.answerCorrect = event.request.privateChallengeParameters.answer === event.request.challengeAnswer;

    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);

    return event;
};
