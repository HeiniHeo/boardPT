const express = require('express');
const router = require('./routers/index');

const app = express();

app.use('/',router);

app.listen(3000,()=>{
    console.log('PORT 3000')
})