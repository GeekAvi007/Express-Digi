import express from 'express'

const app = express()

const port = 5000


// app.get("/",(req, res)=>{
//     res.send("Hello from Biker Avi!")
// })

// app.get("/advbike",(req, res)=>{
//     res.send("Adventure 390x vs Himalayan 450")
// })

// app.get("/twitter", (req, res)=>{
//     res.send("GeekAvi007")
// })


app.use(express.json())

let bikeData = []
let nextid = 1

app.post('/bikes', (req, res)=>{
    const {name, price} = req.body
    const newBike = {
        id: nextid++,
        name,
        price
    }
    bikeData.push(newBike)
    res.status(201).send(newBike)
})

app.get('/bikes', (req, res)=>{
    res.status(200).send(bikeData)
})

app.get('/bikes/:id',(req,res)=>{
    const bike = bikeData.find(b => b.id === parseInt(req.params.id))
    if(!bike){
        return res.send("Bike Not Found").status(404)
    }
    res.status(200).send(bike)
})

app.put('/bikes:id', (req, res) => {
    
    const bike = bikeData.find(b => b.id === parseInt(req.params.id))
    if(!bike){
        return res.status(404).send("Bike Not Found!")
    }
    const {name, price} = req.body
    bike.name = name
    bike.price = price
    res.send(200).send(bike)
})

app.delete('/tea/:id', (req, res)=>{
    const index = bikeData.findIndex(b => b.id === parseInt(req.params.id))
    if(index === -1){
        return res.send('Bike Not Found').status(404)
    }
    bikeData.splice(index, 1)
    return res.status(204).send('deleted')
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}...`)
})