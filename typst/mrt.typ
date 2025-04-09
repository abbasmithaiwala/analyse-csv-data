#set page(
  margin: (x: 2cm, y: 2cm),
  header: {
    set text(size: 9pt)
    align(center)[*CSV Data Report*]
    line(length: 100%, stroke: 0.5pt)
  },
  footer: {
    set text(size: 8pt)
    align(center)[
      #counter(page).display() of #counter(page).final()
    ]
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
    Generated on #datetime.today().display("[month repr:long] [day], [year]")
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
  
  let tableContent = tableHeader
  table.hline()
  
  for row in rows {
    tableContent = tableContent + (..row.map(cell => [#cell]))
  }
  
  table(
    columns: columnCount,
    align: alignments,
    fill: (_, row) => if row == 0 { rgb("#f5f5f5") } else if calc.odd(row) { rgb("#f9f9f9") } else { white },
    tableContent
  )
}

// Default static data for testing
#let defaultHeaders = ("name", "phone", "email", "region", "postalZip")
#let defaultRows = (
  ("Lane Lane", "1-446-385-6212", "eget@yahoo.couk", "Friesland", "11218"),
  ("Lucius Sosa", "1-234-567-8901", "lucius@example.com", "Virginia", "22903"),
  ("Jane Doe", "1-987-654-3210", "jane.doe@example.org", "California", "90210")
)

#renderDynamicTable(defaultHeaders, defaultRows)

#pagebreak()

#heading(level: 1)[Data Visualization]
This page is reserved for future data visualizations and charts that can be generated from the CSV data.

#heading(level: 1)[About]
This PDF was generated automatically from tabular data. The data can be filtered, sorted, and managed through the web interface before exporting to this PDF document.