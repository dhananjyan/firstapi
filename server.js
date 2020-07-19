const express = require('express')
const app = express()
// const router = express.Router()

app.get('/', (req, res) => {
    res.send('Hello Worlds')
})
app.listen(process.env.PORT || 3000., () => {
    console.log("Server running")
})