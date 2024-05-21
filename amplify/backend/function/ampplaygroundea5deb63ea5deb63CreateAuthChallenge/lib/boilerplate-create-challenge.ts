import { randomDigits } from 'crypto-secure-random-digit';
import { SES } from 'aws-sdk';
// const digitGenerator = require('crypto-secure-random-digit');
// const SES = require('aws-sdk');
// const randomDigits = digitGenerator.randomDigits();

const ses = new SES();

/**
 * @type {import('@types/aws-lambda').CreateAuthChallengeTriggerHandler}
 */
export const handler = async (event: any, context: any): Promise<any> => {
    console.log(`PRE-EVENT: ${ JSON.stringify(event) }`);

    /*if (event?.request?.session?.length === 1 && event.request.challengeName === 'CUSTOM_CHALLENGE') {
        console.log(1);
        // if (event.request.session.length === 2 && event.request.challengeName === 'CUSTOM_CHALLENGE') {
        event.response.publicChallengeParameters = { trigger: 'true' };
        event.response.privateChallengeParameters = {};
        console.log(`CHALLENGEANSWER: ${ process.env.CHALLENGEANSWER }`);
        event.response.privateChallengeParameters.answer = process.env.CHALLENGEANSWER;
        event.response.challengeMetadata = 'CUSTOM_CHALLENGE';
    }*/

    // https://aws.amazon.com/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/
    let secretLoginCode;
    if (!event.request.session || !event.request.session.length) {

        // This is a new auth session
        // Generate a new secret login code and mail it to the user
        secretLoginCode = randomDigits(6).join('');
        await sendEmail(event.request.userAttributes.email, secretLoginCode);
    } else {

        // There's an existing session. Don't generate new digits but
        // re-use the code from the current session. This allows the user to
        // make a mistake when keying in the code and to then retry, rather
        // the needing to e-mail the user an all new code again.
        const previousChallenge = event.request.session.slice(-1)[0];
        console.log(`previousChallenge ${ previousChallenge }`);
        console.log(`previousChallenge.challengeMetadata ${ previousChallenge.challengeMetadata }`);
        secretLoginCode = 'abc123';
        // secretLoginCode = previousChallenge.challengeMetadata!.match(/CODE-(\d*)/)![1];
    }

    // This is sent back to the client app
    event.response.publicChallengeParameters = {
        email: event.request.userAttributes.email
    };

    // Add the secret login code to the private challenge parameters
    // so it can be verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };

    // Add the secret login code to the session so it is available
    // in a next invocation of the "Create Auth Challenge" trigger
    event.response.challengeMetadata = `CODE-${ secretLoginCode }`;

    console.log(`POST-EVENT: ${ JSON.stringify(event) }`);
    return event;
};

async function sendEmail(emailAddress, secretLoginCode) {
    const params = {
        Destination: { ToAddresses: [emailAddress] },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<html><body><p>This is your secret login code:</p>
                           <h3>${ secretLoginCode }</h3></body></html>`
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `Your secret login code: ${ secretLoginCode }`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Your secret login code'
            }
        },
        // Source: process.env.SES_FROM_ADDRESS!
        Source: 'no-reply@verificationemail.com'
    };
    await ses.sendEmail(params).promise();
}
