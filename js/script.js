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
		//console.log(myTabs[i]);
	}
});


/*Content of table*/
var tableItems = document.querySelector('.table-items'),
    orderList = document.querySelector('.order-box_container'),
    productQuantityEl = document.querySelector(".product-quantity"),
    emptyCartEl = document.querySelector(".empty-cart-btn"),
    remove = document.querySelector('.remove'),
    tableCart = document.querySelector('.order-box_container'),
    totalPriceEl = document.querySelector(".total-price"),
    boxes = document.querySelector('.boxes');
    send = document.getElementById('send');
    
    var tablePasta = document.querySelector('#paste .table-items'),
    tableSalad = document.querySelector('#salate .table-items'),
    tableSoup = document.querySelector('#ciorbe .table-items'),
    tableMenu = document.querySelector('#meniu .table-items'),
    tableBurgers = document.querySelector('#burgeri .table-items');

var products = [{
            id: 0,
            restaurant: "Bistro1",
            type: "traditional",
            category: "salate",
            name: "Salata Caesar",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 20
        },
        {
            id: 1,
            restaurant: "Bistro2",
            type: "traditional",
            category: "paste",
            name: "Paste Quatro Formagi",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 25,
        },
        {
            id: 2,
            restaurant: "Bistro3",
            type: "chinezesc",
            category: "burgeri",
            name: "Burger Classic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 209
        },
        {
            id: 3,
            restaurant: "Bistro4",
            type: "pizza",
            category: "burgeri",
            name: "Burger Double",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 30
        },
        {
            id: 4,
            restaurant: "Bistro5",
            type: "fastfood",
            category: "paste",
            name: "Paste fructe de mare",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 45
        },
        {
            id: 5,
            restaurant: "Bistro6",
            type: "arabesc",
            category: "paste",
            name: "Paste",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 20
        }
    ],
    productsInCart = [];
    orderStored = [];

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
        if(tableItems){
            tableItems.appendChild(productEl);
        }
        
        
        // switch (item.category){
        //     case "paste":
        //         tablePasta.appendChild(productEl);
        //         break;
        //     case "burgeri":
        //         tableBurgers.appendChild(productEl);
        //         break;
        //     case "ciorbe":
        //         tableSoup.appendChild(productEl);
        //         break;
        //     case "meniu":
        //         tableMenu.appendChild(productEl);
        //         break;
        //     case "salate":
        //         tableSalad.appendChild(productEl);
        //         break;
        //         default:
        //          tableItems.appendChild(productEl);

        // }
    });
}


var generateCartList = function() {
    orderList.innerHTML = "";
    productsInCart.forEach(function(item,index) {
        var tr = document.createElement("tr");
        tr.classList.add('order-box_item');

        tr.innerHTML = `<td class="remove-button"><a href="#0" id="itm${item.product.id}" class="remove" data-id=${index}>X</a></td>
                      <td class="order-box_item order-box_item-name"><span>${item.product.name}</span></td>
                      <td class="order-box_item order-box_item-quantity"><span>${item.quantity}</span></td>
                      <td class="order-box_item order-box_item-price"><span>${item.product.price * item.quantity} lei</span></td>`;

        orderList.appendChild(tr);
    });
    productQuantityEl.innerHTML = productsInCart.length;
    generateCartButtons()
}

var generateCartButtons = function() {
    if (productsInCart.length > 0) {
        emptyCartEl.style.display = "block";
        totalPriceEl.innerHTML = calculateTotalPrice() + " lei";
    } else {
        emptyCartEl.style.display = "none";
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
    tableCart.addEventListener('click', function(event){
      var btnRem = event.target;
      if(btnRem.classList.contains("remove")){
        var btnRemId = btnRem.dataset.id;
        console.log("Button target: " + btnRemId);
        removeItemFromCart(btnRemId);
      }
    });
    emptyCartEl.addEventListener("click", function(event) {
        if (confirm("Are you sure?")) {
            productsInCart = [];
        }
        generateCartList();
    });
    send.addEventListener("click", function(e){
        e.preventDefault();
        var message = "Comanda a fost inregistrata cu succes!";
        sendOrder();
        if( alert(message)){
            productsInCart = [];
        }
        generateCartList();
        
    });

}
var sendOrder = function(){
    var city = document.getElementById('selectCity').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var orderProducts = productsInCart.map(function(item,index){ return productsInCart[index]} );
    if(productsInCart.length >= 1){
        orderStored.push({"city": city, "address": address, "phone":phone, "order": orderProducts});
    }
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
 var removeItemFromCart = function(itemId){
     if(productsInCart[itemId].quantity === 1){
        productsInCart.splice(itemId,1);
     }else{
      productsInCart[itemId].quantity--;
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
var generateRestaurants = function(){

}
var restaurantsCateg = function(){
     products.forEach(function(item) {
    var restaurantEl = document.createElement('div');
    restaurantEl.classList.add('boxes_item','boxes_item--indian');
    restaurantEl.innerHTML = `<div class="boxes_item-content">
                                    <a href="order.html" class="link"><span class="link-text">${item.restaurant}</span> <i class="fas fa-arrow-right"></i></a>
                                 </div>`;
        boxes.appendChild(restaurantEl);
        
    });
}


// search

var searchInput = document.querySelector('.search input').value;

var findRestaurants = function(myRestaurants, title){
    var titleReturned = myRestaurants.find(function(item, index){
        return item.restaurant.toLowerCase() === title.toLowerCase();
    });
    return titleReturned;
}

findRestaurants(products, searchInput);


searchInput.addEventListener('keyup',function(event){
    event.preventDefault();
    findRestaurants(products, searchInput);
    restaurantsCateg();
});
var init = function() {
    generateProductList();
    restaurantsCateg();
    setupListeners();
}
init();


