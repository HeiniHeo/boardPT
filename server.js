const express = require('express');
<<<<<<< HEAD
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const PORT = '3000';

const {sequelize} = require('./models');
const {User}=require('./models');
const router = require('./routers/index');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
});
app.use(cors());
app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true,
}));

sequelize.sync({force:false,})
.then(() => {
    console.log('access successful')
}).catch(() => {
    console.log('access failed')
})

app.use('/',router)

app.listen(PORT,() => {
    console.log(`server listening on port ${PORT}`);
=======
const router = require('./routers/index');

const app = express();

app.use('/',router);

app.listen(3000,()=>{
    console.log('PORT 3000')
>>>>>>> 55a43fea0f6b32d312e911834587df96f394ec4a
})