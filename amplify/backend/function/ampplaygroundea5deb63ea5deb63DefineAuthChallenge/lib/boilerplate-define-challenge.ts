import { DefineAuthChallengeTriggerHandler, DefineAuthChallengeTriggerEvent } from 'aws-lambda';

export const handler: DefineAuthChallengeTriggerHandler = async (event: DefineAuthChallengeTriggerEvent, context: any): Promise<any> => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);

    // https://docs.amplify.aws/gen1/react/build-a-backend/auth/switch-auth/
    if (!Array.isArray(event?.request?.session) || event?.request?.session?.length) {
        console.log(1);
        // If you don't have a session or it is empty then send a CUSTOM_CHALLENGE
        event.response.challengeName = 'CUSTOM_CHALLENGE';
        event.response.failAuthentication = false;
        event.response.issueTokens = false;
    } else if (event?.request?.session?.length === 1 && event?.request?.session[0]?.challengeResult) {
        console.log(2);
        // If you passed the CUSTOM_CHALLENGE then issue token
        event.response.failAuthentication = false;
        event.response.issueTokens = true;
    } else {
        console.log(3);
        // Something is wrong. Fail authentication
        event.response.failAuthentication = true;
        event.response.issueTokens = false;
    }

    /*if (event.request.session.length === 1 && event.request.session[0].challengeName === 'SRP_A') {
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'PASSWORD_VERIFIER';
    } else if (
        event.request.session.length === 2 &&
        event.request.session[1].challengeName === 'PASSWORD_VERIFIER' &&
        event.request.session[1].challengeResult === true
    ) {
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    } else if (
        event.request.session.length === 3 &&
        event.request.session[2].challengeName === 'CUSTOM_CHALLENGE' &&
        event.request.session[2].challengeResult === true
    ) {
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
    } else {
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    }*/

    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};
