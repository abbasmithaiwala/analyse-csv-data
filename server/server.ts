import express, { Request, Response } from 'express';
import { $typst } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for frontend requests
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use('/typst', express.static(path.join(__dirname, '../typst')));

app.post('/generate-pdf', async (req: Request, res: Response) => {
  try {
    const { documentPath, data } = req.body;
    console.log('Received request with data:', JSON.stringify(data, null, 2));

    if (!documentPath) {
      res.status(400).json({ error: 'Document path is required' });
      return;
    }

    const fullPath = path.join(__dirname, '../typst', documentPath);
    console.log('Reading template from:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      res.status(404).json({ error: `Template file not found: ${documentPath}` });
      return;
    }
    
    // Read the original template
    const template = fs.readFileSync(fullPath, 'utf-8');
    console.log('Original template content length:', template.length);

    // Generate a new Typst file with data directly
    let content = '';
    
    // If data is provided, we'll create a new Typst document using the original template structure
    if (data && data.headers && data.rows) {
      try {
        // Process the headers and escape special characters
        const processedHeaders = data.headers.map((header: string) => {
          if (header === null || header === undefined) return '""';
          // Escape backslashes, quotes, and at symbols
          const escaped = String(header)
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\@/g, '\\@');
          return `"${escaped}"`;
        });
        
        // Process rows and escape special characters
        const processedRows = data.rows.map((row: (string | number | null | undefined)[]) => {
          return row.map(cell => {
            if (cell === null || cell === undefined) {
              return '""';
            }
            
            // Convert to string and escape special characters
            const escaped = String(cell)
              .replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/\@/g, '\\@');
            return `"${escaped}"`;
          });
        });
        
        // Create a fresh typst document
        content = `#set page(
            margin: (x: 2cm, y: 2cm),
            header: {
              set text(size: 9pt)
              align(center)[*CSV Data Report*]
              line(length: 100%, stroke: 0.5pt)
            },
            footer: {
              set text(size: 8pt)
              context {
                align(center)[
                  #counter(page).display() of #counter(page).final()
                ]
              }
            }
          )
          
          #set text(font: "New Computer Modern")
          #set heading(numbering: "1.")
          
          #align(center)[
            #block(text(weight: "bold", size: 24pt)[
              CSV Data Report
            ])
            #v(1em)
            #block(text(size: 14pt)[
              Generated on #context datetime.today().display("[month repr:long] [day], [year]")
            ])
            #v(4em)
          ]
          
          #heading(level: 1)[Data Summary]
          
          #let renderDynamicTable(headers, rows) = {
            let columnCount = headers.len()
            let alignments = (auto,) * columnCount
            
            // Styling for the table
            set table(stroke: 0.5pt, inset: 8pt)
            set text(size: 10pt)
            
            let tableHeader = table.header(
              ..headers.map(header => [*#header*])
            )
            
            // Flatten all row cells into a single array
            let tableCells = ()
            for row in rows {
              tableCells = tableCells + row.map(cell => [#cell])
            }
            
            table(
              columns: columnCount,
              align: alignments,
              fill: (_, row) => if row == 0 { rgb("#f5f5f5") } else if calc.odd(row) { rgb("#f9f9f9") } else { white },
              tableHeader,
              table.hline(),
              ..tableCells
            )
          }
          
          // Data from the web application
          #let defaultHeaders = (${processedHeaders.join(', ')})
          #let defaultRows = (
            ${processedRows.map(row => `(${row.join(', ')})`).join(',\n  ')}
          )
          
          #renderDynamicTable(defaultHeaders, defaultRows)
          
          #pagebreak()
          
          #heading(level: 1)[Data Visualization]
          This page is reserved for future data visualizations and charts that can be generated from the CSV data.
          
          #heading(level: 1)[About]
          This PDF was generated automatically from tabular data. The data can be filtered, sorted, and managed through the web interface before exporting to this PDF document.`;
        
        console.log('Created new template. Content length:', content.length);
      } catch (dataError) {
        console.error('Error processing data for template:', dataError);
        res.status(500).json({ error: 'Error processing data for template', details: String(dataError) });
        return;
      }
    } else {
      // Use original template if no data provided
      content = template;
    }

    try {
      console.log('Generating PDF...');
      const pdfBuffer = await $typst.pdf({
        mainContent: content,
      });
      
      if (!pdfBuffer || pdfBuffer.length === 0) {
        throw new Error('Generated PDF buffer is empty');
      }
      
      console.log('PDF generated successfully. Size:', pdfBuffer.length);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${path.basename(documentPath, '.typ')}.pdf`);
      res.send(pdfBuffer);
    } catch (typstError) {
      console.error('Typst error:', typstError);
      // Create a text file with the content that caused the error for debugging
      const debugPath = path.join(__dirname, 'debug-template.typ');
      fs.writeFileSync(debugPath, content);
      console.log('Wrote debug template to:', debugPath);
      
      res.status(500).json({ 
        error: 'Failed to generate PDF', 
        details: String(typstError),
        message: 'Error occurred during PDF generation. Check server logs.'
      });
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF', 
      details: String(error),
      message: 'Unexpected error occurred. Check server logs.'
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});