import express from 'express'
import { convertPPtToPng } from './index.mjs'
const app = express()

app.get('/api/convert', async (req, res) => {

    try {
        await convertPPtToPng();
        res.send('Conversion started')
    } catch(error) {
        console.log("🚀 ~ app.get ~ error:", error)
        res.status(500).json({ error: error });
    }
  // TODO: Implement the conversion logic here
 
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
