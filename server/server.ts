import express, { Request, Response } from 'express';
import { $typst } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/typst', express.static(path.join(__dirname, '../typst')));

app.post('/generate-pdf', async (req: Request, res: Response) => {
  try {
    const { documentPath } = req.body;

    if (!documentPath) {
      res.status(400).json({ error: 'Document path is required' });
      return;
    }

    const fullPath = path.join(__dirname, '../typst', documentPath);
    const content = fs.readFileSync(fullPath, 'utf-8');

    const pdfBuffer = await $typst.pdf({
      mainContent: content,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(documentPath, '.typ')}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});