function highlight(table) {
 const rows = table.tBodies[0].rows;

 for (let row of rows) {
   const cells = row.cells;
   const statusCell = cells[3];

   if (statusCell.hasAttribute('data-available')) {
     const isAvailable = statusCell.getAttribute('data-available');
     if (isAvailable === 'true') {
       row.classList.add('available');
     } 
     else if (isAvailable === 'false') {
       row.classList.add('unavailable');
     }
   }
    else {
     row.setAttribute('hidden', true);
   }

   const genderCell = cells[2].textContent;
   if (genderCell === 'm') {
     row.classList.add('male');
   } 
   else if (genderCell === 'f') {
     row.classList.add('female');
   }

   const ageCell = parseInt(cells[1].textContent, 10);
   if (ageCell < 18) {
     row.style.textDecoration = 'line-through';
   }
 }
}
