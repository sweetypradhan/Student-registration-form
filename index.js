// Function to validate the form
function validateForm() {
  // Retrieve form data
  var studentName = document.getElementById('name').value;
  var studentId = document.getElementById('id').value;
  var email = document.getElementById('email').value;
  var contactNo = document.getElementById('contact').value;

  // Regular expressions for validation
  var nameRegex = /^[a-zA-Z ]+$/;
  var idRegex = /^[0-9]+$/;
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  var contactRegex = /^[0-9]+$/;

  // Validate student name
  if (!nameRegex.test(studentName)) {
      alert('Student name must contain only characters.');
      return false;
  }

  // Validate student ID
  if (!idRegex.test(studentId)) {
      alert('Student ID must contain only numbers.');
      return false;
  }

  // Validate email ID
  if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
  }

  // Validate contact number
  if (!contactRegex.test(contactNo)) {
      alert('Contact number must contain only numbers.');
      return false;
  }

  // If all validations pass
  return true;
}
// Function to add a new student record
function addStudent() {
  // Get the values from input fields
  var sdName = document.getElementById("name").value;
  var sdId = document.getElementById("id").value;
  var sdContact = document.getElementById("contact").value;
  var sdEmail = document.getElementById("email").value;
  var sdGender = document.querySelector('input[name="gender"]:checked').value;

  var nameRegex = /^[a-zA-Z ]+$/;

  if (sdName.trim() === '' || sdId.trim() === '' || sdContact.trim() === '' || sdEmail.trim() === '') {
    alert('Please fill in all fields');
    return;
  }
  validateForm();
  // Create a new row and cells
  var table = document.querySelector('.record-table').getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);

  // Add the data to the cells
  cell1.innerHTML = sdName;
  cell2.innerHTML = sdId;
  cell3.innerHTML = sdContact;
  cell4.innerHTML = sdEmail;
  cell5.innerHTML = sdGender;
  cell6.innerHTML =
    '<button class="btn btn-edit" onclick="editStudent(this)">Edit</button> <button class="btn btn-delete" onclick="deleteStudent(this)">Delete</button>';

  // Clear input fields
  document.getElementById('name').value = '';
  document.getElementById('id').value = '';
  document.getElementById('contact').value = '';
  document.getElementById('email').value = '';
  document.querySelector('.gender-details').value = '';

  // Save the data to local storage
  saveData();

}
// Function to edit an existing student record
// Function to edit an existing student record
function editStudent(td) {
  var studentInput = document.getElementById("name");
  // Set focus to the input field
  studentInput.focus();
  selectedRow = td.parentElement.parentElement;
  document.getElementById('name').value = selectedRow.cells[0].innerHTML;
  document.getElementById('id').value = selectedRow.cells[1].innerHTML;
  document.getElementById('contact').value = selectedRow.cells[2].innerHTML;
  document.getElementById('email').value = selectedRow.cells[3].innerHTML;
  document.getElementById('genders').value = selectedRow.cells[4].innerHTML;

  // Change the Add button to a Save button
  var addButton = document.querySelector('.btn-add');
  addButton.textContent = 'Save';
  addButton.setAttribute('onclick', 'saveEdit()');
}

function saveEdit() {
  var sdName = document.getElementById("name").value;
  var sdId = document.getElementById("id").value;
  var sdContact = document.getElementById("contact").value;
  var sdEmail = document.getElementById("email").value;
  var sdGender = document.querySelector('input[name="gender"]:checked').value;

  // Validate the input fields
  if (sdName.trim() === '' || sdId.trim() === '' || sdContact.trim() === '' || sdEmail.trim() === '') {
    alert('Please fill in all fields');
    return;
  }

  // Update the selected row with new values
  selectedRow.cells[0].innerHTML = sdName;
  selectedRow.cells[1].innerHTML = sdId;
  selectedRow.cells[2].innerHTML = sdContact;
  selectedRow.cells[3].innerHTML = sdEmail;
  selectedRow.cells[4].innerHTML = sdGender;

  // Clear input fields
  document.getElementById('name').value = '';
  document.getElementById('id').value = '';
  document.getElementById('contact').value = '';
  document.getElementById('email').value = '';
  //document.querySelector('input[name="gender"]:checked').value = '';

  // Change the Save button back to the submit button
  var addButton = document.querySelector('.btn-add');
  addButton.textContent = 'Submit';
  addButton.setAttribute('onclick', 'addStudent()');


  // Save the data to local storage
  saveData();
}


// Function to delete a student record
function deleteStudent(td) {
  if (confirm('Are you sure you want to delete this record?')) {
    row = td.parentElement.parentElement;
    document.querySelector('.record-table').deleteRow(row.rowIndex);
    saveData();
  }
}

// Function to save data to local storage
function saveData() {
  var tableData = [];
  var rows = document.querySelectorAll('.record-table tbody tr');
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var rowData = {
      name: row.cells[0].textContent,
      id: row.cells[1].textContent,
      contact: row.cells[2].textContent,
      email: row.cells[3].textContent,
      genders: row.cells[4].textContent

    };
    tableData.push(rowData);
  }
  localStorage.setItem('studentData', JSON.stringify(tableData));
}

// Function to load data from local storage
function loadData() {
  var data = localStorage.getItem('studentData');
  if (data) {
    var tableData = JSON.parse(data);
    var table = document.querySelector('.record-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    for (var i = 0; i < tableData.length; i++) {
      var row = tableData[i];
      var newRow = table.insertRow(table.length);
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);
      var cell6 = newRow.insertCell(5);
      cell1.innerHTML = row.name;
      cell2.innerHTML = row.id;
      cell3.innerHTML = row.contact;
      cell4.innerHTML = row.email;
      cell5.innerHTML = row.genders;
      cell6.innerHTML =
        '<button class="btn btn-edit" onclick="editStudent(this)">Edit</button> <button class="btn btn-delete" onclick="deleteStudent(this)">Delete</button>';
    }
  }
}

// Call loadData function when the page loads
window.onload = loadData;