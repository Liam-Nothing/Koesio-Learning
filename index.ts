import express from 'express';
import { isNotNumber, parseArgumentsBMI } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseArgumentsToNumber, parseNumber } from "./exerciseCalculator";

const app = express();
app.use(express.json());


import { calculator, Operation } from './calculator';

app.post('/calculate', (req, res) => {

    const { value1, value2, op } = req.body;

    if (!value1 || !value2 || !op) {
        return res.status(400).send({
            error: 'parameters missing',
            // debug_values: { value1, value2, op },
            // req_body: req.body
        });
    }

    const result = calculator(
        Number(value1), Number(value2), op as Operation
    );

    return res.send({ result });
});



app.post('/exercises', (req, res) => {

    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).send({
            error: 'parameters missing'
        });
    }

    try {
        const result = calculateExercises(parseArgumentsToNumber(daily_exercises), parseNumber(target));
        return res.send({ result });
    } catch (error) {
        return res.status(400).send({
            error: 'malformatted parameters'
        });
    }

});












app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/test/:id?', (req, res) => {
    res.send(
        `Requested user with id : ` + req.params.id +
        `<br>isNotNumber : ` + isNotNumber(req.query.id)
    );
});

app.get('/bmi', (req, res) => {
    try {

        const height = req.query.height;
        const weight = req.query.weight;

        if (typeof height !== 'string' || typeof weight !== 'string') {
            throw new Error('Invalid query parameters');
        }


        const { height: parsedHeight, weight: parsedWeight } = parseArgumentsBMI([height, weight]);

        const bmiResult = calculateBmi(parsedHeight, parsedWeight);

        res.send(bmiResult);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});