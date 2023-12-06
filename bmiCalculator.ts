interface BMIValues {
    height: number;
    weight: number;
}

// const parseArguments = (args: string[]): BMIValues => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// }

const calculateBmi = (height: number, weight: number) => {

    let text = null;
    const bmi = weight / ((height / 100) ** 2);

    if (bmi < 18.5) {
        text = (`Underweight`);
    } else if (bmi < 25) {
        text = (`Normal (healthy weight)`);
    } else if (bmi < 30) {
        text = (`Overweight`);
    } else {
        text = (`Obese`);
    }

    console.log(bmi);
    console.log(text + `(${height} ${weight})`);

}

// try {
//     const { height, weight } = parseArguments(process.argv);
//     calculateBmi(height, weight);
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }

console.log(calculateBmi(180, 74))