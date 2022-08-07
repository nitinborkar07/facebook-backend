import {Router} from 'express'
const mathRoutes  = Router();


mathRoutes.get('/square-of-number', (req, res) => {
    const number = req.query.num
    const square = number * number;
    res.send(`The Square of ${number} is ${square}`)
    // res.send( "" + square)
})


mathRoutes.get('/check-even-odd', (req, res) => {
    const number = req.query.num;

    if (number % 2) {
        res.send(number + " is even")
    } else {
        res.send(number + " is odd")
    }
})


mathRoutes.get('/addition', (req, res) => {
    const number1 = req.query.num1;
    const number2 = req.query.num2;
    const addition = Number(number1) + Number(number2)
    res.send("addition = " + addition)
})

export default mathRoutes;
