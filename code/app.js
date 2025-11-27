document.addEventListener("DOMContentLoaded", () => {
  const itemList = document.getElementById("item-list");
  const uploadForm = document.getElementById("uploadForm");
  const myItems = document.getElementById("my-items");

  const getItems = () => JSON.parse(localStorage.getItem("items") || "[]");
  const saveItems = (items) => localStorage.setItem("items", JSON.stringify(items));

  // Upload Item
  if (uploadForm) {
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newItem = {
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        condition: document.getElementById("condition").value,
        image: document.getElementById("image").value,
        owner: "You"
      };
      const items = getItems();
      items.push(newItem);
      saveItems(items);
      alert("Item uploaded!");
      uploadForm.reset();
    });
  }

  // Display All Items
  if (itemList) {
    const items = getItems();
    items.forEach((item, index) => {
      itemList.innerHTML += `
        <div class="item">
          <h3>${item.title}</h3>
          <img src="${item.image}" width="150"/>
          <p>Category: ${item.category}</p>
          <p>Condition: ${item.condition}</p>
          <button onclick="window.location.href='message.html'">Request Trade</button>
        </div>
      `;
    });
  }

  // My Profile Items
  if (myItems) {
    const items = getItems().filter(item => item.owner === "You");
    items.forEach((item) => {
      myItems.innerHTML += `
        <div class="item">
          <h3>${item.title}</h3>
          <img src="${item.image}" width="150"/>
          <p>${item.category} - ${item.condition}</p>
        </div>
      `;
    });
  }
});
