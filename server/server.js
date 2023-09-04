import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cors())
app.use(morgan('dev'))



app.get('/api/v1', (req,res) => {
    res.send('Hello')
})

app.listen(8000, (req,res) => {
    console.log('server running on port 3000');
})