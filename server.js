const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const passport   = require('passport');
const app = express();
const router = require('./routes/router');

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

require('./config/passport')(passport);

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});