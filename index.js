let input = document.querySelector(".input");
const button = document.querySelector("#btn").addEventListener('click', () => {
    addTodolist();
});

const addTodolist = () => {
    if (!input) return; // Ensure input element is found

    let ol = document.querySelector(".lists");
    let list = document.createElement("li");
    let value = input.value;

    // Only proceed if the input is not empty
    if (value.trim() === "") {
        alert("Please enter a valid item!");
        return;
    }

    // Add the value to the list
    list.innerHTML = value;
    ol.append(list);

    // Add to localStorage
    AddToLS(value);

    // Clear input field
    input.value = "";
};

// Initialize updatedData with existing data or an empty array
let updatedData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];

// Load saved data from localStorage when the page loads
window.onload = () => {
    const ol = document.querySelector(".lists");
    updatedData.forEach((item) => {
        const list = document.createElement("li");
        list.innerHTML = item;
        ol.append(list);
    });
};

const AddToLS = (value) => {
    // Append new value to the array
    updatedData.push(value);

    // Update localStorage with the updated array
    localStorage.setItem("data", JSON.stringify(updatedData));
};
