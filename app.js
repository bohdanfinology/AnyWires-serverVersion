let express = require("express"),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    assert = require('assert'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./modules/user');

//let url = 'mongodb://18.216.223.81:27017/invoicesTest';
const url = 'mongodb://localhost:27017/invoicesTest';

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(url, { useNewUrlParser: true });

//Passport config
app.use(require('express-session')({
    secret: 'AnyWires Project Clone',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// app.use(function(req, res, next) {
//     res.locals.currentUser = req.user;
//     next();
// });

// Page routs
app.get('/', function(req, res) {
    res.render("index.html");
});

app.get('/howItWorks.html', function(req, res) {
    res.render("howItWorks.html");
});

app.get('/personal-area.html', isLoggedIn, function(req, res) {
    res.render("personal-area.html", {currentUser: req.user});
});

app.get('/dashBoardMainPage.html', isLoggedIn, function(req, res) {
    res.render("dashBoardMainPage.html", {currentUser: req.user});
});

app.get('/InvoiceGeneration.html', isLoggedIn, function(req, res) {
    res.render("InvoiceGeneration.html");
});

app.get('/invoice-list.html', isLoggedIn, function(req, res) {
    res.render("invoiceList.html", {currentUser: req.user});
});

app.get('/invoice-report.html', isLoggedIn, function(req, res) {
    res.render("invoice-report.html", {currentUser: req.user});
});

app.get('/wallets.html', isLoggedIn, function(req, res) {
    res.render("wallets.html", {currentUser: req.user});
});

app.get('/settlements.html', isLoggedIn, function(req, res) {
    res.render("settlements.html", {currentUser: req.user});
});

app.get('/merchants.html', isLoggedIn, function(req, res) {
    res.render("merchants.html", {currentUser: req.user});
});

app.get('/users.html', isLoggedIn, function(req, res) {
    res.render("users.html", {currentUser: req.user});
});

app.get('/merchants.html', isLoggedIn, function(req, res) {
    res.render("merchants.html", {currentUser: req.user});
});

app.get('/banks.html', isLoggedIn, function(req, res) {
    res.render("banks.html", {currentUser: req.user});
});

app.get('/affiliateReport.html', isLoggedIn, function(req, res) {
    res.render("affiliateReport.html", {currentUser: req.user});
});

app.get('/Dashboard-how-it-works.html', isLoggedIn, function(req, res) {
    res.render("Dashboard-how-it-works.html", {currentUser: req.user});
});

// Invoice generation process

app.get('/getList', function(req, res, next) {
    let INVOIECES = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('invoices').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            INVOIECES.push(doc);
        }, function() {
            db.close();
            res.send(INVOIECES);
        });
    });
});

app.post("/invoices", function(req, res, next) {
    let newInvoice = {
        name: req.body.name,
        address:  req.body.address,
        country:  req.body.country,
        phone:  req.body.phone,
        email:  req.body.email,
        amount:  req.body.amount,
        currency:  req.body.currency,
        sepa:  req.body.sepa,
        merch:  req.body.merch,
        bank:  req.body.bank
    };

    mongo.connect(url, function(err, db) { 
        assert.equal(null, err);
        db.collection('invoices').insert(newInvoice, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
    res.redirect("/invoice-list.html");
});

//==================
// Authorization
//==================

// Register process
app.get('/register', function(req, res) {
    res.render("registerForm.html");
});

app.get('/successfullRegister', function(req, res) {
    res.render("successfullRegister.html");
});

app.post('/register', function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.render('registerForm.html');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/successfullRegister');
                console.log('Successfully created user!');
            });
        }
    });
});

// Login process

app.post('/login', passport.authenticate("local",
    {
        successRedirect: '/dashBoardMainPage.html',
        failureRedirect: '/'
    }), function(req, res) {
});

// LogOut process
app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/');
}

// Running server
app.listen(3000, function() {
    console.log('Servering localhost 3000');
});

