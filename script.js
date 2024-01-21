const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear-btn");
const addItemsBtn = document.getElementById("add-items-btn");
const filterInput = document.getElementById("filter-input");
const filterForm = document.getElementById("filter-form");
let isEditMode = false;

// Load Items in Local Storage
function loadItemsInLocalStorage() {
  const itemsArray = getItemsInLocalStorage();
  itemsArray.forEach((item) => {
    displayItems(item);
    resetUI();
  });
}

// Add Items
function addItem(event) {
  event.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  if (isEditMode) {
    const itemtoEdit = itemList.querySelector(".edit-mode");
    removeFromLocalStorage(itemtoEdit.textContent);
    itemtoEdit.remove();
    isEditMode = false;
    setToDefaultMode();
  } else {
    if (checkIfItemExists(newItem)) {
      alert("Item already exists");
      itemInput.value = "";
      return;
    }
  }

  addItemsToLocalStorage(newItem);
  displayItems(newItem);

  // Clear input field
  itemInput.value = "";
  resetUI();
}

// Display Items to DOM
function displayItems(newItem) {
  // Create new list element
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  // Create new button and icon elements
  const button = createBtn();

  //Append elements
  li.appendChild(button);
  itemList.appendChild(li);
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

// Get Items from Local Storage
function getItemsInLocalStorage() {
  let itemsArray;
  if (localStorage.getItem("item")) {
    itemsArray = JSON.parse(localStorage.getItem("item"));
  } else {
    itemsArray = [];
  }
  return itemsArray;
}

// Add Items to Local Storage
function addItemsToLocalStorage(items) {
  const itemsArray = getItemsInLocalStorage();
  itemsArray.push(items);
  localStorage.setItem("item", JSON.stringify(itemsArray));
}

// Check if Item Exists
function checkIfItemExists(item) {
  const itemsArray = getItemsInLocalStorage();
  return itemsArray.includes(item);
}

// Handle clicked list item
function onItemClick(event) {
  const listItems = event.target;
  const listItem = listItems.parentElement.parentElement;
  item = listItem.textContent;
  if (
    listItems.classList.contains("delete-btn") ||
    listItems.classList.contains("fa-xmark")
  ) {
    deleteItem(listItem, item);
  } else {
    if (listItems.tagName === "LI") {
      setToEditMode(listItems);
    } else {
      setToDefaultMode();
    }
  }
}

// Delete Items
function deleteItem(listItem, item) {
  // Delete Items from list
  if (confirm("Are you sure you want to delete this item?")) {
    listItem.remove();
  }
  // Delete Items from Storage
  removeFromLocalStorage(item);

  resetUI();
}

// Remove Items from Local Storage
function removeFromLocalStorage(item) {
  let itemsArray = getItemsInLocalStorage();
  itemsArray = itemsArray.filter((storedItem) => storedItem !== item);
  localStorage.setItem("item", JSON.stringify(itemsArray));
}

// Clear All items from List
function clearAllItems() {
  listItem = itemList.lastElementChild;
  while (listItem) {
    itemList.removeChild(listItem);
    listItem = itemList.lastElementChild;
    localStorage.removeItem("item");
  }
  resetUI();
}

// Filter Items
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
      itemList.textContent = "No items to display";
      itemList.classList.add("filter-text");
    }
  }
}

// Set to Edit Mode
function setToEditMode(listItems) {
  isEditMode = true;

  const liElements = itemList.querySelectorAll("li");

  liElements.forEach((li) => {
    if (li === listItems) {
      listItems.classList.add("edit-mode");
      itemInput.value = listItems.textContent;

      // Update form button
      addItemsBtn.style.background = "#090950";
      addItemsBtn.innerHTML = `<i class="fa-solid fa-pen-to-square fa-lg"></i> Update Item`;
    } else {
      li.classList.remove("edit-mode");
    }
  });
}

// Set to Default Mode
function setToDefaultMode() {
  const liElements = itemList.querySelectorAll("li");
  liElements.forEach((li) => {
    li.style.color = "#333339";
  });

  addItemsBtn.innerHTML = `<i class="fa-solid fa-plus fa-lg"></i> Add Items`; // Fix the closing tag
  addItemsBtn.style.backgroundColor = "#046252";
}

// Reset the User Interface
function resetUI() {
  itemInput.value = "";
  if (itemList.childNodes.length === 0) {
    filterInput.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterInput.style.display = "block";
    clearBtn.style.display = "block";
  }
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onItemClick);
clearBtn.addEventListener("click", clearAllItems);
filterInput.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", loadItemsInLocalStorage);
document.addEventListener("DOMContentLoad", resetUI);

resetUI();
