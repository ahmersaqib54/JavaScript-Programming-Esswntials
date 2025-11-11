const employees = [
    { id: 1, name: 'John Doe', age: 30, department: 'IT', salary: 50000, specialization: 'JavaScript' },
    { id: 2, name: 'Alice Smith', age: 28, department: 'HR', salary: 45000, specialization: 'Python' },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance', salary: 60000, specialization: 'Java' }
  ];
  
  function displayEmployees() {
    const totalEmployees = employees
      .map(employee => `<p>${employee.id}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`)
      .join('');
    document.getElementById('employeesDetails').innerHTML = totalEmployees;
  }
  
  function calculateTotalSalaries() {
    const totalSalaries = employees.reduce((acc, employee) => acc + employee.salary, 0);
    alert(`Total Salaries: $${totalSalaries}`);
  }
  
  function displayHREmployees() {
    const hrEmployees = employees.filter(emp => emp.department === 'HR');
    const hrList = hrEmployees
      .map(emp => `<p>${emp.id}: ${emp.name} - ${emp.department} - $${emp.salary}</p>`)
      .join('');
    document.getElementById('employeesDetails').innerHTML = hrList;
  }
  
  function findEmployeeById(employeeId) {
    const foundEmployee = employees.find(emp => emp.id === employeeId);
  
    if (foundEmployee) {
      document.getElementById('employeesDetails').innerHTML =
        `<p>${foundEmployee.id}: ${foundEmployee.name} - ${foundEmployee.department} - $${foundEmployee.salary}</p>`;
    } else {
      document.getElementById('employeesDetails').innerHTML =
        '<p>No employee found with this ID</p>';
    }
  }
  
  function findBySpecialization(specialization) {
    const foundEmployees = employees.filter(emp => emp.specialization === specialization);
  
    if (foundEmployees.length > 0) {
      const result = foundEmployees
        .map(emp => `<p>${emp.id}: ${emp.name} - ${emp.department} - ${emp.specialization}</p>`)
        .join('');
      document.getElementById('employeesDetails').innerHTML = result;
    } else {
      document.getElementById('employeesDetails').innerHTML =
        `<p>No employee found with specialization ${specialization}</p>`;
    }
  }
  