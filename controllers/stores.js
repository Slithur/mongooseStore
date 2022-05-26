const express = require('express');
const res = require('express/lib/response');
const Store = express('./models/store');
const router = express.Router();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE & BODY PARSER
app.use(express.urlencoded({ extended: true }));

// ROUTES

// INDEX
router.get('/', (req, res) => {
  Store.find({}, (error, allStore) => {
    res.render('index.ejs', {
      stores: allStore
    });
  });
});

// NEW
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

// D

//  Create
router.post('/', (req, res) => {
  if (req.body.completed === 'on') {
    //if checked, req.body.completed is set to 'on'
    req.body.completed = true;
  } else {
    //if not checked, req.body.completed is undefined
    req.body.completed = false;
  }

  Store.create(req.body, (error, createdStore) => {
    res.redirect('/store');
  });
});

// Show
router.get('/:id', (req, res) => {
  Store.findById(req.params.id, (err, foundStore) => {
    res.render('show.ejs', {
      store: foundStore
    });
  });
});

module.exports = router;