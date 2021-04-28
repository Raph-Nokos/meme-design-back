const express = require('express')
const connection = require('../src/config')
const router = express.Router()
const multer = require('multer')

router.get('/', (req, res) => {
  connection.query('SELECT * FROM memes_saved', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../memes-design-front/public/memes')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({storage: storage})
router.post('/', upload.single('file'), function (req) {
  const {file} = req
  console.log(file)
})
// router.post('/', (req, res) => {
//   connection.query('INSERT INTO memes_saved SET ?', [req.body], err => {
//     if (err) {
//       console.log(err)
//       res.status(500).send('Error adding data')
//     } else {
//       res.status(200).send('Success adding data !')
//     }
//   })
// })

router.get('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'SELECT * FROM memes_saved WHERE id = ?',
    id,
    (err, results) => {
      if (err) {
        res.status(500).send(`An error occurred: ${err.message}`)
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  connection.query(
    'UPDATE memes_saved SET ? WHERE id=?',
    [req.body, id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error updating data')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  connection.query('DELETE FROM memes_saved WHERE id=?', id, (err, results) => {
    if (err) {
      res.status(500).send('Error deleting data')
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
