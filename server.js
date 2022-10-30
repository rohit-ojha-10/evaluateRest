require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const CharVal = require('./models/CharVal')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then((res) => console.log("connected"))
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("database connected"))
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.listen(process.env.PORT || 8000, () => {
    console.log("server connected")
})
const isAplha = () => {
    return typeof ch === "string" && ch.length === 1
         && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}
app.get('/',async (req,res) => {
    // console.log(req.query.username)
    try {
        const data = await CharVal.find()
        res.json(data)
    } catch (error) {
      res.status(500).send({message : error.message})   
    }
}) 
app.post('/',async (req,res) => {
    // res.send(req.body.name)
    // res.json(newCred)
    console.log(req.body.A)
    try {
        const a = 1
        const b = 2
        const c = 3
        const d = 4
        const e = 5
        const newEntry = new CharVal({
            A : a,
            B : b,
            C : c,
            D : d,
            E : e
        })
         await newEntry.save()
         res.status(201).send("added to database")
    } catch (error) {
        res.status(400).send({message : error.message})
    }
})
app.post('/evaluate',async (req,res) => {
    // res.send(req.body.name)
    // res.json(newCred)
    const expression = req.body.expression
    console.log(expression)
    let lhs = ''
    try {
        let i = 0;
        const data = await CharVal.where('A').equals(1)
        const val = {A : data[0].A , B : data[0].B , C : data[0].C , D : data[0].D , E : data[0].E}
        for(let i = 0;i < expression.length;i++){
            if(i % 2 == 0){
                if(expression[i] >= 'A' && expression[i] <= 'E')
                lhs = lhs + (String)(val[expression[i]])
                else
                lhs = lhs + (String)(expression[i])
            }
            else
                lhs = lhs + (String)(expression[i])
        }
        console.log(lhs)
        lhs = eval(lhs)
        res.status(201).send((String)(lhs))
    } catch (error) {
        res.status(400).send({message : error.message})
    }
})
app.delete('/',async (req,res) => {
    await CharVal.deleteMany({})
    res.send("deleted")
})
