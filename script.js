const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(event) {
  event.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
  }

  // Create new list element
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  // Create new button and icon elements
  const button = createBtn();

  //Append elements
  li.appendChild(button);
  itemList.appendChild(li);

  // Clear input field
  itemInput.value = "";
}

function createBtn() {
  const button = document.createElement("button");
  button.classList.add("delete-btn");

  // Create icon
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark", "fa-lg");
  icon.style.color = "#ff0000";

  button.appendChild(icon);
  return button;
}

itemForm.addEventListener("submit", addItem);
