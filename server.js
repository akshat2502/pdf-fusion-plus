import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import multer from 'multer';
import mergepdfs from './testpdf.js';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use('/static', express.static('public'))

// Your code continues here
// Adjust the maximum listeners for EventEmitter instance
app.setMaxListeners(20);

const port=3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"templates/index.html"))
  })

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
    console.log(req.files);
    try {
      let d = await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
      res.redirect(`http://localhost:3000/static/${d}.pdf`);
    } catch (error) {
      console.error("Error occurred while merging PDFs:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
app.listen(port, () => {
    console.log(`hello world on port: ${port}`);
  })