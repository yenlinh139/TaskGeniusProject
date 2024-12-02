const convertToCSV = (array) => {
    const header = Object.keys(array[0]).join(',') + '\n';
    const rows = array.map(row => 
      Object.values(row)
        .map(value => `"${value}"`) // Enclose values in quotes
        .join(',')
    ).join('\n');
    
    return header + rows;
};

export const downloadCSV = (data) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv'); // Filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
  
  
  