const { response } = require("../app");

console.log('js');

function itemTemplate(item) {
    return `<li
    class="list-group-item list-group-item
    d-flex align-items-center justify-content-between"
    > 
    <span class="item-text" > ${item.reja} </span>
     <div>
        <button  data-id="${item._id}" 
        class="edit-me btn-secondary btn-sm mr-1 " >O'zgartirish</button>
        <button  data-id="${item._id}" 
        class="delete-me btn btn-danger btn-sm " >o'chirish</button>
     </div>
    </li>`;
}



let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  axios
    .post("/create-item", { reja: createField.value })
    .then((res) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(res.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Try again");
    });
  alert("New Plan Added!");
});

document.addEventListener("click", function(e) {
    //delete oper
    if(e.target.classList.contains("delete-me")){
        if(confirm("anniq ochirmoqchimisiz")){
            axios
            .post("/delete-item", {id: e.target.getAttribute("data-id")})
            .then((response) => {
                console.log(response.data);
                e.target.parentElement.parentElement.remove()
            } )
            .catch((err) => {
                console.log("iltimos qaytadan harakat qiling");
            } )
        }
    }}  )
    // edit oper
    if(e.target.classList.contains("edit-me")){
        let userInput = prompt("ozgartirish kiriting", 
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
         );
         if(userInput) {
          axios
          .post("/edit-item", {
            id:e.target.getAttribute("data-id"),
            new_input: userInput,
          } )
          .then(response =>{
            e.target.parentElement.parentElement
            .querySelector(
              ".item-text"
            ).innerHTML= userInput
          } )
          .catch((err) => {
            console.log('iltimos qaytadan urining');
          } )
         }
    }

    document.getElementById('clean-all')
    .addEventListener("click", function() {
      axios.post('/delete-all', {delete_all : true})
      .then(response => {
        console.log(response.data);
        document.location.reload()
      } )
    } )
