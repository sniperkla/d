const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const { OpenAI } = require('openai')

const fs = require('fs')
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.API_KEY
})

app.post('/api/voice', async (req, res) => {
  try {
    const mp3 = fs.createReadStream('./path/www.mp3')
    const response = await openai.audio.translations.create({
      file: mp3,
      model: 'whisper-1',
      response_format: 'text'
    })
    if (response) {
      console.log(response.text)
    } // Access the transcription text
  } catch (error) {
    console.error(
      'Error during transcription:',
      error.response ? error.response.data : error.message
    )
  }
  res.status(200).json({ message: 'Success' })
})

app.listen(port, () => {
  console.log(`Server is running on   
 http://localhost:${port}`)
})
