// Fetching data from json file to UI

// fetch("./data.json")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     });
const dessertGallery = document.querySelector(".dessert-gallery");

// define basket to store updated values
let basket = [];



document.addEventListener("DOMContentLoaded", function () {
  const jsonFile = "./data.json";
  fetch(jsonFile)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      data.map((dessert, index) => {
        // console.log(dessert)
        // Generate a unique ID based on the index
        dessert.id = `product-${index}`;
       

        const { id,image, name, category, price } = dessert;
        // Store index in the data object for later reference
        dessert.index = index;
        console.log(index)
        dessert.name = name;
        console.log(name)
        

        dessertGallery.innerHTML += `
                 <div class="single-item" id=product-id-${id}>
                 <img src="${image.desktop}" class="dessert-img">
      
          <div class="text">
            <h6 class="category"><small> ${category}</small></h6>
            <h3 class="dessert-name">${name}</h3>
            <h4 class="dessert-price">$${price}</h4>
          </div>
      <button class="add-to-cart" onclick="changeLabel( )">
       <img src="./assets/images/icon-add-to-cart.svg" alt=" ">
        Add to Cart
     </button>
        </div>
          
  `;
      });
    });
});

// let changeLabel = () => {
 

//   const cartButtons = document.querySelectorAll(".add-to-cart");

// for (let i = 0; i < cartButtons.length; i++) {
//     if (!cartButtons[i].innerHTML.includes("increment-decrement-buttons")) {
//       // Button is clicked, so revert to purchasing display
//       cartButtons[i].style.background = "var(--red)";
//       cartButtons[i].style.color = "var(--rose-50)";
//       cartButtons[i].innerHTML = `
//         <div class="increment-decrement-buttons">
//           <img src="./assets/images/icon-decrement-quantity.svg" alt=" " class="btn">
//           <span class="item-count">
//           1
//           </span>
//           <img src="./assets/images/icon-increment-quantity.svg" alt=" " class="btn">
//         </div>
//       `;

//       const incrementBtn = cartButtons[i].querySelector('.increment-decrement-buttons .btn:last-child');
//       const decrementBtn = cartButtons[i].querySelector('.increment-decrement-buttons .btn:first-child');
//       const quantityElement = cartButtons[i].querySelector('.increment-decrement-buttons .item-count');
//       let quantity = parseInt(quantityElement.textContent);

//       const productId = cartButtons[i].parentNode.id; // Get the ID directly

//       // Use event delegation on the dessertGallery element
//       dessertGallery.addEventListener("click", function (event) {
//         if (event.target.classList.contains("add-to-cart")) {
//           const cartButton = event.target.closest(".add-to-cart");

//       incrementBtn.addEventListener('click', () => {
//         quantity++;
//         quantityElement.textContent = quantity;

//         // Update basket based on productId
//         const search = basket.find((dessert) => dessert.id === productId);
//         if (search) {
//           search.quantity = quantity;
//         } else {
//           basket.push({
//             id: productId,
//             quantity: quantity
//           });
//         }
//       });

//           decrementBtn.addEventListener('click', () => {
//             if (quantity > 0) {
//               quantity--;
//               quantityElement.textContent = quantity;

//               // Update basket based on productId
//               const search = basket.find((dessert) => dessert.id === productId);
//               if (search && search.quantity === 0) {
//                 basket = basket.filter((item) => item.id !== productId);
//               } else if (search) {
//                 search.quantity = quantity;
//               }
//             }
//           });
//         }
//       });
//     } if (!cartButtons[i].innerHTML.includes("increment-decrement-buttons")) return;
//     else {
//       // Button not yet clicked so retrieve its original display
//       cartButtons[i].style.background = "var(--rose-50)";
//       cartButtons[i].style.color = "var(--rose-900)";
//       cartButtons[i].innerHTML = `
//               <img src="./assets/images/icon-add-to-cart.svg" alt=" ">
//               Add to Cart
//             `;
//     }
//   }
// };
    
let changeLabel = () => {
  // Use event delegation on the dessertGallery element
  dessertGallery.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
      const cartButton = event.target.closest(".add-to-cart");
      // console.log(cartButton)
      
      // Button clicked, so add increment/decrement buttons
      cartButton.style.background = "var(--red)";
      cartButton.style.color = "var(--rose-50)";

    
      cartButton.innerHTML = `
        <div class="increment-decrement-buttons">
          <img src="./assets/images/icon-decrement-quantity.svg" alt=" " class="btn">
          <span class="item-count" >
            1
          </span>
          <img src="./assets/images/icon-increment-quantity.svg" alt=" " class="btn">
        </div>
      `;

      const incrementBtn = cartButton.querySelector('.increment-decrement-buttons .btn:last-child');
      const decrementBtn = cartButton.querySelector('.increment-decrement-buttons .btn:first-child');
      const quantityElement = cartButton.querySelector('.increment-decrement-buttons .item-count');
      let quantity = parseInt(quantityElement.textContent);

      const productId = cartButton.parentNode.id; // Extract the productId;
      console.log(productId)
      // const productId = cartButton.parentNode.id.split("-")[1]; // Access the second element
      // console.log(productId);
   


      // Attach event listeners to buttons (nested delegation)
      incrementBtn.addEventListener('click', () => {
        quantity++;
        quantityElement.textContent = quantity;

        // Update basket based on productId
        const search = basket.find((dessert) => dessert.id === productId);
        console.log(search)
        if (search) {
          search.quantity = quantity;
        } else {
          basket.push({
            id: productId,
            quantity: quantity
          });
          console.log(basket)
        }
      });

      decrementBtn.addEventListener('click', () => {
        if (quantity > 0) {
          quantity--;
          quantityElement.textContent = quantity;

          // Update basket based on productId
          const search = basket.find((dessert) => dessert.id === productId);
          console.log(search)
          if (search && search.quantity === 0) {
            basket = basket.filter((item) => item.id !== productId);
          } else if (search) {
            search.quantity = quantity;
          }
        }
      });

      // Exit the loop after handling this button
      return;
    }

    // Button not yet clicked so retrieve its original display
    if (!event.target.classList.contains("add-to-cart")) {
      // ... (optional: reset button styles if needed)
    }
  });
};   