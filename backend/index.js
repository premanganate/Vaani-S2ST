import multer from 'multer';
import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import s2st from './bhashini.js';

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });
const uploadDir = 'uploads/';

app.post('/upload', upload.single('file'), async (req, res) => {
  const translationDirection = JSON.parse(req.body.translationDirection);
  console.log(translationDirection.src, translationDirection.target);

  if (req.file) {
    const outputFileName = `output-${Date.now()}.wav`; // Unique output file name
    const outputFilePath = path.join(uploadDir, outputFileName);

    try {
      const result = await s2st(
        "222cde7638ca43c8a8fedca2f63369bd",
        "2205d5c2e9-2e4e-4acf-8d00-847f2d17bf9d",
        "testbase64.txt",
        translationDirection.src,
        translationDirection.target,
        req.file.path,
        outputFilePath
      );

      if (result.status_code === 200) {
        console.log('Output file =', outputFilePath);
        console.log(`/uploads/${path.basename(outputFilePath)}`);

        res.json({
          translatedText: result.translated_content.translatedText,
          audioPath: `/uploads/${path.basename(outputFilePath)}`
        });
      } else {
        res.status(500).json({ message: 'Translation failed', error: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error during translation', error: error.message });
    }
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

// Serve static files from the upload directory with the correct MIME type and range request handling
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(err);
      return res.status(404).end('File not found');
    }

    const range = req.headers.range;
    if (!range) {
      const head = {
        'Content-Length': stats.size,
        'Content-Type': 'audio/wav',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    } else {
      const positions = range.replace(/bytes=/, '').split('-');
      const start = parseInt(positions[0], 10);
      const fileSize = stats.size;
      const end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return res.status(416).send('Range Not Satisfiable');
      }

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/wav',
      };

      res.writeHead(206, head);
      file.pipe(res);
    }
  });
});

app.listen(3005, () => {
  console.log('Server running on port 3005');
});