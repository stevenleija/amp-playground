/**
 * @type {import('@types/aws-lambda').CreateAuthChallengeTriggerHandler}
 */
exports.handler = async (event) => {

    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);
    if (event.request.session.length === 2 && event.request.challengeName === 'CUSTOM_CHALLENGE') {
        event.response.publicChallengeParameters = { trigger: 'true' };

        event.response.privateChallengeParameters = {};
        event.response.privateChallengeParameters.answer = process.env.CHALLENGEANSWER;
    }
    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};
