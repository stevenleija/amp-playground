import { DefineAuthChallengeTriggerEvent, DefineAuthChallengeTriggerHandler } from 'aws-lambda';

export const handler: DefineAuthChallengeTriggerHandler = async (event: DefineAuthChallengeTriggerEvent): Promise<any> => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);

/*    if (event.request.session.length === 0) {
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';

    } else if (event.request.session.length > 0 && event.request.session[0].challengeResult === true) {
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    } else {
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    }*/

    if (event.request.session.length === 1 && event.request.session[0].challengeName === 'SRP_A') {
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
    }

    /*if (!Array.isArray(event?.request?.session) || event?.request?.session?.length) {
        console.log(1);
        // If you don't have a session or it is empty then send a CUSTOM_CHALLENGE
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    } else if (event?.request?.session?.length === 1 && event?.request?.session[0]?.challengeResult) {
        console.log(2);
        // If you passed the CUSTOM_CHALLENGE then issue token
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    } else {
        console.log(3);
        // Something is wrong. Fail authentication
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    }*/

    /*
    // https://docs.amplify.aws/gen1/react/build-a-backend/auth/switch-auth/
    if (event.request.session &&
        event.request.session.find(attempt => attempt.challengeName !== 'CUSTOM_CHALLENGE')) {
        console.log(1);
        // We only accept custom challenges; fail auth
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    } else if (event.request.session &&
        event.request.session.length >= 3 &&
        event.request.session.slice(-1)[0].challengeResult === false) {
        console.log(2);
        // The user provided a wrong answer 3 times; fail auth
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    } else if (event.request.session &&
        event.request.session.length &&
        event.request.session.slice(-1)[0].challengeName === 'CUSTOM_CHALLENGE' && // Doubly stitched, holds better
        event.request.session.slice(-1)[0].challengeResult === true) {
        console.log(3);
        // The user provided the right answer; succeed auth
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
    } else {
        console.log(4);
        // The user did not provide a correct answer yet; present challenge
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    }*/

    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};
