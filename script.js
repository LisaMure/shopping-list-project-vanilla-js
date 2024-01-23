const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear-btn");
const addItemsBtn = document.getElementById("add-items-btn");
const filterInput = document.getElementById("filter-input");
let isEditMode = false;

// Load items in Local Storage
function loadItemsInLocalStorage() {
  const itemsArray = getItemsInLocalStorage();
  itemsArray.forEach((item) => {
    displayItems(item);
  });
  resetUI();
}

// Add items to list and Local Storage
function addItem(event) {
  event.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  if (checkIfItemExists(newItem)) {
    alert("Item already exists");
    itemInput.value = "";
    return;
  }

  updateEditedItems(newItem);

  addItemsToLocalStorage(newItem);

  displayItems(newItem);

  // Clear input field
  itemInput.value = "";

  resetUI();
}

// Display items to DOM
function displayItems(newItem) {
  // Create new list element
  const li = document.createElement("li");

  // Checkbox
  const checkbox = createCheckbox(newItem);
  li.appendChild(checkbox);

  if (localStorage.getItem(`checkbox-${newItem}`) === "checked") {
    checkbox.checked = true;
    li.style.textDecoration = "line-through";
  }

  li.appendChild(document.createTextNode(newItem));

  const button = createBtn();

  li.appendChild(button);
  itemList.appendChild(li);
}

// Create button with icon 
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

// Create a checkbox 
function createCheckbox(itemName) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `check-${itemName}`;
  return checkbox;
}

//  Handle checkbox when clicked
function handleCheckbox(event) {
  if (event.target.type === "checkbox") {
    const checkbox = event.target;
    const li = checkbox.parentElement;
    const item = li.textContent;  

    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
      localStorage.setItem(`checkbox-${item}`, "checked");
    } else {
      li.style.textDecoration = "none";
      localStorage.removeItem(`checkbox-${item}`);
    }
  }

   // Check if the item is in edit mode
   if (!li.classList.contains("edit-mode")) {
    localStorage.removeItem(`checkbox-${item}`);
  }
}


// Update items in Edit Mode
function updateEditedItems() {
  if (isEditMode) {
    const itemtoEdit = itemList.querySelector(".edit-mode");
    const item = itemtoEdit.textContent;
    const isChecked = localStorage.getItem(`checkbox-${item}`) === "checked";
    removeFromLocalStorage(item);

    if (isChecked) {
      localStorage.removeItem(`checkbox-${item}`);
    }

    itemtoEdit.remove();

    isEditMode = false;
    setToDefaultMode();
  }
}

// Get items from Local Storage
function getItemsInLocalStorage() {
  let itemsArray;
  if (localStorage.getItem("item")) {
    itemsArray = JSON.parse(localStorage.getItem("item"));
  } else {
    itemsArray = [];
  }
  return itemsArray;
}

// Add items to Local Storage
function addItemsToLocalStorage(items) {
  const itemsArray = getItemsInLocalStorage();
  itemsArray.push(items);
  localStorage.setItem("item", JSON.stringify(itemsArray));
}

// Check if item exists in Local Storage
function checkIfItemExists(item) {
  const itemsArray = getItemsInLocalStorage();
  const itemExistsInArray = itemsArray.includes(item);
  const itemExistsInCheckedArray =
    localStorage.getItem(`checkbox-${item}`) === "checked";

  return itemExistsInArray || itemExistsInCheckedArray;
}

// Handle clicked items
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

// Delete items
function deleteItem(listItem, item) {
  const isChecked = localStorage.getItem(`checkbox-${item}`) === "checked";

  // Delete items from list
  if (confirm("Are you sure you want to delete this item?")) {
    listItem.remove();
  }

  // Delete items from Storage
  removeFromLocalStorage(item);

  // If item is checked, delete from Storage
  if (isChecked) {
    localStorage.removeItem(`checkbox-${item}`);
  }

  resetUI();
}

// Remove items from Local Storage
function removeFromLocalStorage(item) {
  let itemsArray = getItemsInLocalStorage();
  itemsArray = itemsArray.filter((storedItem) => storedItem !== item);
  localStorage.setItem("item", JSON.stringify(itemsArray));
}

// Clear all items from list
function clearAllItems() {
  let listItem = itemList.lastElementChild;
  while (listItem) {
    itemList.removeChild(listItem);
    listItem = itemList.lastElementChild;
  }
  localStorage.removeItem("item");
  resetUI();
}

// Filter items
function filterItems(event) {
  event.preventDefault();
  const listItems = itemList.querySelectorAll("li");
  const filterLetter = filterInput.value.toLowerCase();

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

  resetUI();
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
itemList.addEventListener("change", handleCheckbox);
clearBtn.addEventListener("click", clearAllItems);
filterInput.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", loadItemsInLocalStorage);
document.addEventListener("DOMContentLoaded", resetUI);
