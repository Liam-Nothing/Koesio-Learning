export const calculateBmi = (height: number, weight: number) => {

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

    // console.log(bmi);
    // console.log(text + `(${height} ${weight})`);
    return (text + `(${height} ${weight})`);

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

// console.log(calculateBmi(180, 74))