import express from 'express'
import bodyParser from "body-parser";
const router = express.Router()

// Test with POSTMAN Post
router.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello')

})

router.get('/', (req, res) => {
    console.log(req.body)
    res.send('Hello')

})
export default router