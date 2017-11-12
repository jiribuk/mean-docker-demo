// api.js
console.log('api starting');

const express = require('express');
const router = express.Router();


/* GET api listing. */
router.get('/', (req, res) => {
    res.send('Express API works');
});



module.exports = router;