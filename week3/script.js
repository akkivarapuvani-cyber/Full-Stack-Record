let students = [];

function addStudent() {
    const input = document.getElementById("studentname");
    const name = input.value.trim();
    if (name == "") {
        alert("enter student name");
        return;
    } 
    students.push(name);
    input.value = "";
    displayStudents();
}

function displayStudents() {
    const listContainer = document.getElementById("list-container");
    const list = document.getElementById("studentlist");
    
    
    if (students.length === 0) {
        listContainer.style.display = "none";
    } else {
        listContainer.style.display = "block";
    }

    list.innerHTML = "";
    students.forEach((student, index) => {
        list.innerHTML += `
        <li>
            ${index + 1}. ${student}
            <button class="delete" onclick="deleteStudent(${index})">delete</button>
        </li>`;
    });
    document.getElementById("count").textContent = students.length;
}

function deleteStudent(index) {
    students.splice(index, 1); 
    displayStudents(); 
}


displayStudents();
