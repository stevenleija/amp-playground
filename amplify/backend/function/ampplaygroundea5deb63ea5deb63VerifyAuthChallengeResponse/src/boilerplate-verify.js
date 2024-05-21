/**
 * @type {import('@types/aws-lambda').VerifyAuthChallengeResponseTriggerHandler}
 */
exports.handler = async (event) => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);

    if (event.request.privateChallengeParameters.answer === event.request.challengeAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};
