// Assuming you have an input field with ID "search-navbar"
const searchInput = document.getElementById("search-navbar");
const container = document.querySelector(".container");

const hide = document.getElementsByClassName("hide");

// Fetch products from the Fake Store API (similar to your existing code)
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    // Event listener for input changes
    searchInput.addEventListener("input", filterAndDisplayCards);

    // Initial display (show all cards)
    filterAndDisplayCards();

    function filterAndDisplayCards() {
      const query = searchInput.value.trim().toLowerCase();

      // Clear existing cards
      container.innerHTML = "";

      if (query.length === 0) {
        // Show all cards
        products.forEach((product) => createCard(product));
        hide.style.display = "block";
      } else {
        // Filter and show matching cards
        const matchingProducts = products.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
        if (matchingProducts.length > 0) {
          matchingProducts.forEach((product) => createCard(product));
          hide.style.display = "none";
        } else {
          // Display "no product" message
          const noProductMessage = document.createElement("p");
          noProductMessage.classList.add("noProductMessage");
          noProductMessage.textContent = "There is no product.";
          container.appendChild(noProductMessage);
        }
      }
    }

    function createCard(product) {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.classList.add("image");
      image.src = product.image;

      const title = document.createElement("p");
      const truncatedTitle = product.title.split(" ").slice(0, 6).join(" ");
      title.textContent =
        truncatedTitle.length < product.title.length
          ? truncatedTitle + "......"
          : truncatedTitle;

      const productPrice = document.createElement("p");
      productPrice.textContent = `$${product.price}`;

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(productPrice);

      container.appendChild(card);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

// Get the current year
const currentYear = new Date().getFullYear();

// Find the element with the class 'date'
const dateElement = document.querySelector(".date");

// Set the text of the element to the current year
dateElement.textContent = currentYear;
