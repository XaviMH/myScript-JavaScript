const express = require('express')
const router = express.Router()

// catches --> http://localhost:3000/users
router.get('/', (req, res, next) => {
    console.log("Im inside a '/users' GET request!")
    res.send('User List')
})


// catches --> http://localhost:3000/users/new
// Given that the running order goes from up-down, this call MUST sit 
// before the get":/myId" below!
router.get('/new', (req, res, next) => {
    console.log("Im inside a '/users/new' GET request!")
    res.send('User New Form')
})

// 
router.post('/', (req, res, next) => {
    console.log("Im inside a '/users' POST request!")
    res.send('Create User')
})

// catches --> http://localhost:3000/users/1
// ...in a slow way
// router.get('/:myId', (req, res, next) => {
//     console.log(`Im inside a '/users' GET request, with a parameter ${req.params.myID}`)
//     res.send(`Get User with ID ${req.params.myId}`)
// })
// 
// router.put('/:myId', (req, res, next) => {
//     console.log(`Im inside a '/users' PUT request, with a parameter ${req.params.myID}`)
//     res.send(`Put User with ID ${req.params.myId}`)
// })
// 
// router.delete('/:myId', (req, res, next) => {
//     console.log(`Im inside a '/users' DELETE request, with a parameter ${req.params.myID}`)
//     res.send(`Deleting User with ID ${req.params.myId}`)
// })
// ... in a quick way
router
    .route("/:myId")
    .get((req, res, next) => {
        console.log(`Inside a '/users' GET request, with myID ${req.params.myId}, which belongs to ${req.user.name}`)
        res.send(`Get User with ID ${req.params.myId}`)
    })
    .put((req, res, next) => {
        console.log(`Inside a '/users' PUT request, with a parameter ${req.params.myId}`)
        res.send(`Put User with ID ${req.params.myId}`)
    })
    .delete( (req, res, next) => {
        console.log(`Inside a '/users' DELETE request, with a parameter ${req.params.myId}`)
        res.send(`Deleting User with ID ${req.params.myId}`)
    })

// User translator
const users = [ { name: "Kyle"}, { name: "Ann"}, { name: "John"}]
router.param("myId", (req, res, next, myId) => {
    req.user = users[myId]
    console.log(`Inside .param middleware: using ID of ${myId}, which is "${users[myId].name}"`)
    next()
})

// Exports the local variables
module.exports = router