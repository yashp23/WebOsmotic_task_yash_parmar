function addEmployee(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get('first_name');
    const gender = formData.get('gender');
    const dob = formData.get('dob');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const hobbies = formData.getAll('hobbies');

    // Validate date of birth
    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
        alert('Date of birth cannot be in the future.');
        return;
    }

    // Validate mobile number
    const phoneNumber = formData.get('phone');
    if (phoneNumber.length !== 10) {
        alert('Mobile number must be 10 digits.');
        return;
    }

    // Validate name field
    const nameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!nameRegex.test(name)) {
        alert('Name must be between 4 to 20 characters long and contain only alphanumeric characters.');
        return;
    }

    const table = document.getElementById('employeeTable');
    const row = table.insertRow(-1);

    const nameCell = row.insertCell(0);
    const genderCell = row.insertCell(1);
    const dobCell = row.insertCell(2);
    const emailCell = row.insertCell(3);
    const phoneCell = row.insertCell(4);
    const hobbiesCell = row.insertCell(5);

    nameCell.textContent = name;
    genderCell.textContent = gender;
    dobCell.textContent = dob;
    emailCell.textContent = email;
    phoneCell.textContent = phone;
    hobbiesCell.textContent = hobbies.join(', ');

    // Store data in localStorage
    const employeeData = {
        name: name,
        gender: gender,
        dob: dob,
        email: email,
        phone: phone,
        hobbies: hobbies
    };

    // Get existing employees from localStorage
    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Add new employee data
    employees.push(employeeData);

    // Save updated employees list to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Clear form fields
    const form = document.forms['employeeForm'];
    form.reset();
}

// Function to load employee data from localStorage and display in table
function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    const table = document.getElementById('employeeTable');

    employees.forEach(employee => {
        const row = table.insertRow(-1);

        const nameCell = row.insertCell(0);
        const genderCell = row.insertCell(1);
        const dobCell = row.insertCell(2);
        const emailCell = row.insertCell(3);
        const phoneCell = row.insertCell(4);
        const hobbiesCell = row.insertCell(5);

        nameCell.textContent = employee.name;
        genderCell.textContent = employee.gender;
        dobCell.textContent = employee.dob;
        emailCell.textContent = employee.email;
        phoneCell.textContent = employee.phone;
        hobbiesCell.textContent = employee.hobbies.join(', ');
    });
}

// Call the loadEmployees function when the page loads to populate the table
window.onload = loadEmployees;
