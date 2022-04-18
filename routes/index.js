const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  res.send('go shop first')
})

module.exports = router 