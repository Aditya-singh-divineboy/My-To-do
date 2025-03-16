let inputvlaue = document.querySelector(".input");
const button = document.querySelector("#btn").addEventListener('click', () => {
    addTodolist()
})
const addTodolist = () =>{
let ol = document.querySelector(".lists")
let list = document.createElement("li")
let listvalue = list.innerHTML= inputvlaue.value
ol.append(list)

}