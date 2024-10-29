const frm = document.querySelector("form");
const inItem = document.getElementById("inItem");
const itemList = document.createElement("ul");
itemList.classList.add("item-list");
frm.parentNode.appendChild(itemList);

window.addEventListener("load", loadItems);

frm.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemName = inItem.value.trim();
  if (itemName) {
    addItem(itemName); 
    saveToLocalStorage(itemName); 
    inItem.value = "";
  }
});

function addItem(itemName) {
  const li = document.createElement("li");
  li.classList.add("list-item");

  // customizado checkbox
  const checkboxContainer = document.createElement("label");
  checkboxContainer.classList.add("custom-checkbox");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("item-checkbox");

  // span aparência customizada
  const checkmark = document.createElement("span");
  checkmark.classList.add("checkmark");

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(checkmark);

  // primeira letra maíuscula
  const formattedItemName = itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();

  const span = document.createElement("span");
  span.textContent = formattedItemName;
  span.classList.add("item-name");

  // lixeira
  const deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = '<img src="./imgs/deleteFrame.svg" alt="Deletar item" />'
  deleteIcon.classList.add("delete-icon");
  deleteIcon.addEventListener("click", () => {
    li.remove();
    removeFromLocalStorage(formattedItemName);
    showAlert("O item foi removido da lista");
  });

  li.appendChild(checkboxContainer);
  li.appendChild(span);
  li.appendChild(deleteIcon);
  itemList.appendChild(li);
}

function saveToLocalStorage(item) {
  let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
  items.push(item);
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function loadItems() {
  const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
  items.forEach((item) => addItem(item));
}

function removeFromLocalStorage(item) {
  let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
  items = items.filter((i) => i !== item);
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function showAlert(message) {
  let alert = document.querySelector(".alert-message");
  
  if (!alert) {
    alert = document.createElement("div");
    alert.classList.add("alert-message");

    // alerta
    const alertIcon = document.createElement("span");
    alertIcon.innerHTML = '<img src="./imgs/alertIcon.png" alt="alerta" />';
    alertIcon.classList.add("alert-icon");

    // mensagem
    const messageText = document.createElement("span");
    messageText.textContent = message;
    messageText.classList.add("alert-text");

    // fechar (X)
    const closeButton = document.createElement("span");
    closeButton.textContent = "✖";
    closeButton.classList.add("close-alert");
    
    // evento fechar
    closeButton.addEventListener("click", () => {
      alert.remove();
    });

    // show alert
    alert.appendChild(alertIcon);
    alert.appendChild(messageText);
    alert.appendChild(closeButton);
    itemList.parentNode.appendChild(alert);
  }

  const existingMessage = alert.querySelector(".alert-text");
  if (existingMessage) {
    existingMessage.textContent = message;
  }

  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 5000);
}
