interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments = (args: string[]): Array<number> => {

    if (args.length < 1) throw new Error('Not enough arguments');

    return args.map(arg => {
        if (isNaN(Number(arg))) {
            throw new Error('Provided values were not numbers!');
        } else {
            return Number(arg);
        }
    });
};

const parseTarget = (targetArg: string): number => {
    const target = Number(targetArg);
    if (isNaN(target)) {
        throw new Error('Target must be a number');
    }
    return target;
};

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const average = dailyExerciseHours.reduce((acc, cur) => acc + cur, 0) / periodLength;
    const success = average >= target;
    let rating = 1;
    let ratingDescription = 'not too bad but could be better';
    if (average >= target) {
        rating = 3;
        ratingDescription = 'very good';
    } else if (average >= target / 2) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// console.log(
//     calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)
// )

// console.log(
//     calculateExercises(parseArguments(process.argv.slice(3)), process.argv[])
// )

// try {
//     const target = parseTarget(process.argv[2]);
//     const dailyExerciseHours = parseArguments(process.argv.slice(3));
//     console.log(calculateExercises(dailyExerciseHours, target));
// } catch (e) {
//     console.error(e.message);
// }