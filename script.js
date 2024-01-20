const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear-btn");
const filterInput = document.getElementById("filter-input");
const filterForm = document.getElementById("filter-form");

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
  resetUI();
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
  resetUI();
}

// Clear All items
function clearAllItems() {
  listItem = itemList.lastElementChild;
  while (listItem) {
    itemList.removeChild(listItem);
    listItem = itemList.lastElementChild;
  }
  resetUI();
}

function filterItems(event) {
  event.preventDefault();
  listItems = itemList.querySelectorAll("li");
  filterLetter = filterInput.value.toLowerCase();

  for (let i = 0; i < listItems.length; i++) {
    let listItemsText = listItems[i].textContent.toLowerCase();

    if (listItemsText.includes(filterLetter)) {
      listItems[i].style.display = "block";
    } else {
      listItems[i].style.display = "none";
    }
  }
}

function resetUI() {
  if (itemList.childNodes.length === 0) {
    filterInput.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterInput.style.display = "block";
    clearBtn.style.display = "block";
  }
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", deleteItem);
clearBtn.addEventListener("click", clearAllItems);
filterInput.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoad", resetUI);

resetUI();
