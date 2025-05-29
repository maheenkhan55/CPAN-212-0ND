const express = require('express');
const router = express.Router();


router.get('/name', (req, res) => {
    res.send('Maheen Khan')
    });

router.get('/greeting', (req, res) => {
    res.send('Maheen Khan - N01491668')
});

router.get('/add', (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);
    const result = x + y;
    res.send(`Result: ${result}`);
}); 

router.get('//calculate', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const operation = req.query.operation;
    let result; 

    switch (operation) {
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '/':
            return b !== 0 ? a / b : 'Error: Division by zero';
            break;
        case '**':
            return a ** b;
            break;
        default:
            return 'Error: Invalid operation';
    }

    res.send(`Result: $(result)`)
});


module.exports = router;