const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear-btn");

function addItem(event) {
  event.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
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

function deleteItem(event) {
  const listItems = event.target;

  if (
    listItems.classList.contains("delete-btn") ||
    listItems.classList.contains("fa-xmark")
  ) {
    listItems.parentElement.parentElement.remove();
  }
}

// Clear All items
function clearAllItems() {
  listItem = itemList.lastElementChild;
  while (listItem) {
    itemList.removeChild(listItem);
    listItem = itemList.lastElementChild;
  }
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", deleteItem);
clearBtn.addEventListener("click", clearAllItems);
