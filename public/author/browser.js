

console.log('Frontend ejs ishga tushdi');

function itemTemplate(item) {
  return `
  <li
class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
<span class="item-text">${item.reja} </span>
<div>
  <button
    data-id="${item._id}"
    class="edit-me btn btn-secondary btn-sm mr-1">
    Edit
  </button>
  <button
    data-id="${item._id}"
    class="delete-me btn btn-danger btn-sm">
    Delete
  </button>
</div>
</li>

  `
}

let createField = document.getElementById('create-field')

document.getElementById('create-form').addEventListener('submit', (e) =>  {
  e.preventDefault();

  axios
  .post('/create-item', {reja: createField.value})
  .then((response) => {
    document
    .getElementById('item-list')
    .insertAdjacentHTML('beforeend', itemTemplate(response.data));
    createField.value = "";
    createField.focus();
  } )
  .catch((err) =>{
    console.log('qaytadan urining');
  } )
})

document.addEventListener("click", function (e) {
  // delete operation
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .post("delete-item", { id: e.target.getAttribute("data-id") })
        .then((res) => {
          console.log(res.data.state);
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          if (err) {
            console.log("Please try again");
          }
        });
    } else {
      alert("No button clicked");
    }
  }
  // edit operation
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "Edit plan item",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"),
          new_input: userInput,
        })
        .then((res) => {
          console.log(res.data.state);
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => {
          if (err) {
            console.log("Something went wrong try again");
          }
        });
    }
  }
});