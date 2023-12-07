import express from 'express';
// import { json } from 'stream/consumers';
// const express = require('express');
import { isNotNumber, parseArgumentsBMI } from "./utils";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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
})

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
})


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});