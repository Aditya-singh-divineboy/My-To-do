document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#taskInput");
    let addButton = document.querySelector("#btn");
    let updatedData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
    let listContainer = document.querySelector(".lists");

    // Load saved tasks from localStorage on page load
    const loadTasks = () => {
        listContainer.innerHTML = ""; // Clear before loading to prevent duplicates
        updatedData.forEach((item) => {
            addTaskToDOM(item);
        });
    };

    // Function to add task to the DOM
    const addTaskToDOM = (value) => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
            <span class="task-text">${value}</span>
            <div>
                <button class="btn btn-warning btn-sm edit-btn me-2">Edit</button>
                <button class="btn btn-danger btn-sm remove-btn">Remove</button>
            </div>
        `;
        listContainer.appendChild(listItem);

        // Add event listener to Edit button
        listItem.querySelector(".edit-btn").addEventListener("click", () => {
            editTask(listItem, value);
        });

        // Add event listener to Remove button
        listItem.querySelector(".remove-btn").addEventListener("click", () => {
            removeTask(listItem, value);
        });
    };

    // Function to edit a task
    const editTask = (listItem, oldValue) => {
        let taskTextElement = listItem.querySelector(".task-text");
        let newValue = prompt("Edit your task:", oldValue);

        if (newValue && newValue.trim() !== "" && newValue !== oldValue) {
            let trimmedValue = newValue.trim();

            // Check if the updated task already exists
            if (updatedData.includes(trimmedValue)) {
                alert("This task already exists!");
                return;
            }

            // Update DOM
            taskTextElement.textContent = trimmedValue;

            // Update localStorage
            updatedData = updatedData.map((item) => (item === oldValue ? trimmedValue : item));
            localStorage.setItem("data", JSON.stringify(updatedData));
        }
    };

    // Function to remove a task
    const removeTask = (listItem, value) => {
        listItem.remove();
        updatedData = updatedData.filter((item) => item !== value);
        localStorage.setItem("data", JSON.stringify(updatedData));
    };

    // Function to add a new task
    const addTask = () => {
        let value = input.value.trim();
        if (value === "") {
            alert("Please enter a valid task!");
            return;
        }
        if (updatedData.includes(value)) {
            alert("This task already exists!");
            return;
        }

        addTaskToDOM(value);
        updatedData.push(value);
        localStorage.setItem("data", JSON.stringify(updatedData));
        input.value = ""; // Clear input field
    };

    // Event listeners for adding tasks
    addButton.addEventListener("click", addTask);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
