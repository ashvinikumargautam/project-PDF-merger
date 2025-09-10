import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdf } from './merge.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // This line should now work!
 
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
  await mergePdf(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  res.redirect("http://localhost:3000/static/merged.pdf");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
