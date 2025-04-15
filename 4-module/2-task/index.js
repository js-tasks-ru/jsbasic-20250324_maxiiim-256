function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const diagonalCell = table.rows[i].cells[i];
    
    diagonalCell.style.backgroundColor = 'red';
  }
}
