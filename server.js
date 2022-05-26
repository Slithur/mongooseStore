const express = require('express');
const res = require('express/lib/response');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Store = require('./models/store');
const methodOverride = require("method-override")

// Middleware
app.use(methodOverride("_method"))

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
app.get('/store', (req, res) => {
  Store.find({}, (error, allStore) => {
    res.render('index.ejs', {
      stores: allStore
    });
  });
});

// NEW
app.get('/store/new', (req, res) => {
  res.render('new.ejs');
});

// Delete
app.delete("/books/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/books")
  })
})

//  Create
app.post('/store', (req, res) => {
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


// Edit
app.get("/stores/:id/edit", (req, res) => {
  Store.findById(req.params.id, (error, foundStore) => {
    res.render("edit.ejs", {
      book: foundStore,
    })
  })
})


// Show
app.get('/stores/:id', (req, res) => {
  Store.findById(req.params.id, (err, foundStore) => {
    res.render('show.ejs', {
      store: foundStore
    });
  });
});

// listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`jarvis is live: ${PORT}`);
});