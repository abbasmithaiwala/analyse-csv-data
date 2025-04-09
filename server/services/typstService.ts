import { $typst } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Interface representing the data structure for CSV data
 */
export interface CsvData {
  headers: string[];
  rows: (string | number | null | undefined)[][];
}

/**
 * Service responsible for generating Typst templates and PDFs
 */
export class TypstService {
  /**
   * Processes input data by escaping special characters
   * @param data The CSV data to process
   * @returns Processed CSV data with escaped special characters
   */
  processData(data: CsvData): { 
    processedHeaders: string[], 
    processedRows: string[][] 
  } {
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

    return { processedHeaders, processedRows };
  }

  /**
   * Generate a Typst template for CSV data
   * @param data The CSV data to include in the template
   * @returns A Typst template string
   */
  generateTemplate(data: CsvData): string {
    if (!data || !data.headers || !data.rows) {
      console.log('No data provided for template generation');
      return '';
    }

    try {
      const { processedHeaders, processedRows } = this.processData(data);
      
      // Create a fresh typst document
      return `#set page(
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
    } catch (error) {
      console.error('Error creating template:', error);
      throw new Error(`Failed to generate template: ${error.message}`);
    }
  }

  /**
   * Generate a PDF from Typst content
   * @param content The Typst content to render
   * @returns Buffer containing the PDF data
   */
  async generatePdf(content: string): Promise<Buffer> {
    try {
      console.log('Generating PDF...');
      const pdfUint8Array = await $typst.pdf({
        mainContent: content,
      });
      
      if (!pdfUint8Array || pdfUint8Array.length === 0) {
        throw new Error('Generated PDF buffer is empty');
      }
      
      // Convert Uint8Array to Buffer
      const pdfBuffer = Buffer.from(pdfUint8Array);
      
      console.log('PDF generated successfully. Size:', pdfBuffer.length);
      return pdfBuffer;
    } catch (error) {
      // Create a text file with the content that caused the error for debugging
      const debugPath = path.join(process.cwd(), 'server', 'debug-template.typ');
      fs.writeFileSync(debugPath, content);
      console.log('Wrote debug template to:', debugPath);
      
      throw error;
    }
  }
}

export const typstService = new TypstService(); 