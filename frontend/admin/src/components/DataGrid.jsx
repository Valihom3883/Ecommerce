import React from 'react';

const DataGrid = ({ rows, columns }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows && rows.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.field}>{row[column.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataGrid;
