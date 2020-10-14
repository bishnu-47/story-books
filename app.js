const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const dotenv = require('dotenv');
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db.js');

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Load config file
require('dotenv').config({ path:'./config/config.env' })

// Passport config
require('./config/passport')(passport)

// Connect to Database
connectDB()

// Method Override
app.use(methodOverride('_method')) 

// Logging stats to console
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars helpers
const { formatDate, stripHtml, truncate, editIcon, select } = require('./helpers/hbs.js')

// Handlebars
app.engine('.hbs', exphbs({ 
	helpers: {
		formatDate,
		stripHtml,
		truncate,
		editIcon,
		select
	}, 
	defaultLayout: 'main',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store : new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set handlerbars global var
app.use((req, res, next) => {
	res.locals.user = req.user || null
	next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/story'))

PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
})
