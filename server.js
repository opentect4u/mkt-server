const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const passport   = require('passport');
const app = express();
const router = require('./routes/router');

const port = process.env.PORT || 3001;

var whitelist = ['http://synergicportal.in', 'http://localhost:4200']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
require('./config/passport')(passport);

app.use(cors(corsOptions));

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
