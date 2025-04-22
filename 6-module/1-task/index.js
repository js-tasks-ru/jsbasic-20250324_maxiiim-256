export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    const tableHead = document.createElement('thead');
    tableHead.innerHTML = `
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    `;
    this.elem.appendChild(tableHead);

    const tableBody = document.createElement('tbody');
    for (const rowData of rows) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${rowData.name}</td>
        <td>${rowData.age}</td>
        <td>${rowData.salary}</td>
        <td>${rowData.city}</td>
        <td><button>X</button></td>
      `;

      const deleteButton = row.querySelector('button');
      deleteButton.addEventListener('click', () => {
        row.remove(); 
      });

      tableBody.appendChild(row); 
    }

    this.elem.appendChild(tableBody);
  }
}