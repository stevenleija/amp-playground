import { DefineAuthChallengeTriggerEvent, DefineAuthChallengeTriggerHandler } from 'aws-lambda';
/**
 * @fileoverview
 *
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
const moduleNames: string[] = process.env.MODULES.split(',');

/**
 * The array of imported modules.
 */
const modules: { handler: (event: any, context: any) => Promise<any> }[] = moduleNames.map((name) => require(`./${ name }`));


/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 */
export const handler: DefineAuthChallengeTriggerHandler = async (event: DefineAuthChallengeTriggerEvent, context: any): Promise<any> => {
    /**
     * Instead of naively iterating over all handlers, run them concurrently with
     * `await Promise.all(...)`. This would otherwise just be determined by the
     * order of names in the `MODULES` var.
     */
    await Promise.all(modules.map((module) => module.handler(event, context)));
    return event;
};
