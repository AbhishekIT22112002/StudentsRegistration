document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registration-form");
    const studentList = document.getElementById("student-list");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const studentName = document.getElementById("student-name").value.trim();
        const studentID = document.getElementById("student-id").value.trim();
        const email = document.getElementById("email").value.trim();
        const contactNo = document.getElementById("contact-no").value.trim();

        if (studentName === '' || studentID === '' || email === '' || contactNo === '') {
            alert("Please fill in all fields.");
            return;
        }

        const studentRecord = document.createElement("div");
        studentRecord.classList.add("student-record");
        studentRecord.innerHTML = `
            <p data-label="Name"><strong>Name:</strong> ${studentName}</p>
            <p data-label="ID"><strong>ID:</strong> ${studentID}</p>
            <p data-label="Email"><strong>Email:</strong> ${email}</p>
            <p data-label="Contact"><strong>Contact:</strong> ${contactNo}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        studentList.appendChild(studentRecord);

        saveToLocalStorage();
        form.reset();
    });

    // Load existing records from local storage on page load
    document.addEventListener("DOMContentLoaded", function() {
        loadFromLocalStorage();
    });

    function saveToLocalStorage() {
        localStorage.setItem("studentRecords", studentList.innerHTML);
    }

    function loadFromLocalStorage() {
        const savedRecords = localStorage.getItem("studentRecords");
        if (savedRecords) {
            studentList.innerHTML = savedRecords;
        }
    }

    // Edit and Delete functionality
    studentList.addEventListener("click", function(event) {
        const target = event.target;

        if (target.classList.contains("delete-btn")) {
            target.parentElement.remove();
            saveToLocalStorage();
        }

        if (target.classList.contains("edit-btn")) {
            const studentRecord = target.parentElement;
            const fields = studentRecord.querySelectorAll("p[data-label]");

            fields.forEach(field => {
                const value = field.textContent.split(": ")[1];
                const input = document.createElement("input");
                input.value = value;
                field.innerHTML = '';
                field.appendChild(input);
            });

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.classList.add("save-btn");
            studentRecord.appendChild(saveButton);

            saveButton.addEventListener("click", function() {
                fields.forEach(field => {
                    const value = field.querySelector("input").value;
                    field.innerHTML = `<strong>${field.dataset.label}:</strong> ${value}`;
                });
                saveButton.remove();
                saveToLocalStorage();
            });
        }
    });
});
