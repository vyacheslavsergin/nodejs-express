const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const keys = require('./keys')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5d55362843a7671aec707a6c')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3000

async function startMongo() {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: false
    })

    const candidate = await User.findOne()

    if (!candidate) {
      const user = new User({
        email: 'vyacheslavsergin@gmail.com',
        name: 'Vyacheslav',
        cart: { items: [] }
      })

      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

startMongo()

async function start() {
  try {
    // const url = `mongodb+srv://Vyacheslav:EnJeLrCcxqmwcFL8@cluster0-cl0ti.mongodb.net/shop`
    const url = `mongodb+srv://Vyacheslav:EnJeLrCcxqmwcFL8@cluster0-cl0ti.mongodb.net/test?retryWrites=true&w=majority`

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false
    })

    const candidate = await User.findOne()

    if (!candidate) {
      const user = new User({
        email: 'vyacheslavsergin@gmail.com',
        name: 'Vyacheslav',
        cart: { items: [] }
      })

      await user.save()
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

// start()
