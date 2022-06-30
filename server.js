const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json())

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '8b94afbc3fca4a87a9dab954caf82b62',
  captureUncaught: true,
  captureUnhandledRejections: true
});

rollbar.log("Hello world!");
rollbar.info('Requested info');
rollbar.error('Error');
rollbar.critical('Critial');
rollbar.warning('Warning');

const students = ['Jimmy', 'Timothy', 'Jimothy']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/students', (req, res) => {
    rollbar.info('Students List was requested')
    res.status(200).send(students)
})

app.post('/api/students', (req, res) => {
   let {name} = req.body

   const index = students.findIndex(student => {
       return student === name
   })

   try {
       if (index === -1 && name !== '') {
           students.push(name)
           rollbar.info('Add a name')
           res.status(200).send(students)
       } else if (name === ''){
        rollbar.error('Error input')
           res.status(400).send('You must enter a name.')
       } else {
           res.status(400).send('That student already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/students/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    students.splice(targetIndex, 1)
    rollbar.info('Was deleted')
    res.status(200).send(students)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))