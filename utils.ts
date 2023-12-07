import { BMIValues } from "./types";

export const isNotNumber = (argument: any): boolean =>
    isNaN(Number(argument));

export default "this is the default..."

export const parseArgumentsBMI = (args: string[]): BMIValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
        return {
            height: Number(args[0]),
            weight: Number(args[1])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}