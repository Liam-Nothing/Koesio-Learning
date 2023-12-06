interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises
    = (dailyExerciseHours: Array<number>, target: number) => {
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

console.log(
    calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)
)