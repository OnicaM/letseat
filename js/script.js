function displayCatNav(){
	 var element = document.getElementById("categoriesD");
  		element.parentElement.classList.toggle("active");
}
function displayMobileNav(){
	 var element = document.getElementById("body");
  		element.classList.toggle("js--mobile");
}
window.addEventListener("load", function() {
	// store tabs variable
	var myTabs = document.querySelectorAll("ul.tabs_links > li");
  function myTabClicks(tabClickEvent) {
		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll(".tab");
		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
	}
	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks)
		console.log(myTabs[i]);
	}
});


/*Content of table*/
var tableItems = document.querySelector('.table-items'),
    orderList = document.querySelector('.order-box_container'),
    productQuantityEl = document.querySelector(".product-quantity"),
    emptyCartEl = document.querySelector(".empty-cart-btn"),
    remove = document.querySelector('.remove');
    totalPriceEl = document.querySelector(".total-price");


var products = [{
            id: 0,
            category: "paste",
            name: "Paste Carbonara",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 20
        },
        {
            id: 1,
            category: "paste",
            name: "Paste Quatro Formagi",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 25,
        },
        {
            id: 2,
            category: "paste",
            name: "Penne Sicilene",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 209
        },
        {
            id: 3,
            category: "paste",
            name: "Paste Bolognese",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 30
        },
        {
            id: 4,
            category: "paste",
            name: "Paste fructe de mare",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 45
        },
        {
            id: 5,
            category: "paste",
            name: "Paste",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 20
        }
    ],
    productsInCart = [];


var generateProductList = function() {
    products.forEach(function(item) {
        var productEl = document.createElement("tr");
        productEl.innerHTML = `<td class="product-name"> 
      							<span class="product-name">${item.name}</span>
      							<span class="product-description">${item.description}</span>
      						</td>
      						<td>
	      						<span class="product-price">${item.price} lei</span>
	      						<span class="product-add-to-cart"><a href="#0" class="add-to-cart" data-id=${item.id}>Add+</a></span>
      						</td>`;

        tableItems.appendChild(productEl);
        // console.log(item);
    });
}


var generateCartList = function() {
    orderList.innerHTML = "";
    productsInCart.forEach(function(item) {
        var tr = document.createElement("tr");
        tr.classList.add('order-box_item');
        // tr.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;

        tr.innerHTML = `<td class="remove-button"><a href="#0" id="itm${item.product.id}" class="remove" data-id=${item.product.id}>X</a></td>
                      <td class="order-box_item order-box_item-name"><span>${item.product.name}</span></td>
                      <td class="order-box_item order-box_item-quantity"><span>${item.quantity}</span></td>
                      <td class="order-box_item order-box_item-price"><span>${item.product.price * item.quantity} lei</span></td>`;

        orderList.appendChild(tr);
        console.log(item);
    });

    productQuantityEl.innerHTML = productsInCart.length;

    generateCartButtons()
}

var generateCartButtons = function() {
    if (productsInCart.length > 0) {
        emptyCartEl.style.display = "block";
        // cartCheckoutEl.style.display = "block";
        totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
        emptyCartEl.style.display = "none";
        // cartCheckoutEl.style.display = "none";
    }
}

var setupListeners = function() {
    tableItems.addEventListener("click", function(event) {
        var button = event.target;
        if (button.classList.contains("add-to-cart")) {
            var buttonId = button.dataset.id;
            addToCart(buttonId);
        }

        console.log(productsInCart);

    });
    console.log(productsInCart);
    emptyCartEl.addEventListener("click", function(event) {
        if (confirm("Are you sure?")) {
            productsInCart = [];
        }
        generateCartList();
    });


}

var addToCart = function(id) {
    var obj = products[id];
    if (productsInCart.length === 0 || productFound(obj.id) === undefined) {
        productsInCart.push({
            product: obj,
            quantity: 1,
            name: obj.name
        });
    } else {
        productsInCart.forEach(function(item) {
            if (item.product.id === obj.id) {
                item.quantity++;
            }
            //console.log(obj);
        });
    }
    generateCartList();
}

var productFound = function(productId) {
    return productsInCart.find(function(item) {
        return item.product.id === productId;
    });
}

var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
        return total + (item.product.price * item.quantity);
    }, 0);
}


var init = function() {
    generateProductList();
    setupListeners();
    //removeItemFromCart();

}
init();