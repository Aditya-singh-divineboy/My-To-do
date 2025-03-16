let input = document.querySelector(".input");
const button = document.querySelector("#btn").addEventListener('click', () => {
    addTodolist();
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodolist();
    }
});

const removeTodolist = (list, value) => {
    list.remove(); 
    updatedData = updatedData.filter((item) => item !== value);
    localStorage.setItem("data", JSON.stringify(updatedData));
}

const addTodolist = () => {
    if (!input) return;

    let ol = document.querySelector(".lists");
    let list = document.createElement("li");
    let value = input.value;

    
    if (value.trim() === "") {
        alert("Please enter a valid item!");
        return;
    }
    if (updatedData.includes(value)) {
        alert("This item already exists in your to-do list.");
        return;
    }
    list.innerHTML = `${value} <button class="remove-btn">Remove</button>`;
    ol.append(list);
    AddToLS(value);
    const removeBtn = list.querySelector(".remove-btn");
                removeBtn.addEventListener("click", () => {
                    removeTodolist(list, value);
                });

    input.value = "";
};
let updatedData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
window.onload = () => {
    const ol = document.querySelector(".lists");
    updatedData.forEach((item) => {
        const list = document.createElement("li");
        list.innerHTML = `${item}<button class="remove-btn">Remove</button>`;
        ol.append(list);
        const removeBtn = list.querySelector(".remove-btn");
                removeBtn.addEventListener("click", () => {
                    removeTodolist(list, item);
                });
    });
};

const AddToLS = (value) => {
    updatedData.push(value);
    localStorage.setItem("data", JSON.stringify(updatedData));
};
