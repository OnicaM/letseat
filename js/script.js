function displayCatNav() {
    var element = document.getElementById("categoriesD");
    element.parentElement.classList.toggle("active");
}
/*Content of table*/
var tableItems = document.querySelector('.table-items'),
    productsMenu = document.querySelectorAll('.products-menu div');
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

productsInCart = [];
orderStored = [];
//restaurants category: check for hash in url 
if(window.location.hash){
	window.addEventListener('load',function(){
		let hashNr = window.location.hash.substr(1);
		filterCategory(hashNr);
	});
	window.addEventListener("hashchange", function(){
		var hash = window.location.hash.substr(1);
		filterCategory(hash);
	});
}

//display restaurants
var restaurantsUrl = 'http://localhost:3000/restaurants';
fetch(restaurantsUrl)
.then((resp) => resp.json())
.then((data) => {
	displayData(data);
});

var displayData = function(dataD){
	var container = document.querySelector('.container--restaurants .boxes');
	dataD.forEach(param => {
		var div =  document.createElement("div");
		div.classList.add('boxes_item', 'boxes_item--'+param.class);
		div.innerHTML = `<div class="boxes_item-content">
		<a href="order.html?restaurantId=${param.id}" class="link"><span class="link-text">${param.name}</span> <i class="fas fa-arrow-right"></i></a>
		</div>`;
		if(container){
			container.appendChild(div);
		}
		
		// console.log(param);
	});
}

//display category buttons
var categoryUrl = 'http://localhost:3000/category';
fetch(categoryUrl)
.then(resp => resp.json())
.then(dataC => {
	buttonsCategory(dataC);
});

var buttonsCategory = function(dataId){
	var containerC = document.querySelector('.categoies-list');
	dataId.forEach(item => {
		var li =  document.createElement("li");
		li.innerHTML = `<a href="#${item.id}">${item.name}</a>`;
		containerC ? containerC.appendChild(li) : false;
	});
}

//filter restaurants by category
var filterCategory = function(categID){
	let filterUrl = `http://localhost:3000/category/${categID}/restaurants`;
	fetch(filterUrl)
	.then(res => res.json())
	.then(filResult => {
		var container = document.querySelector('.container--restaurants .boxes');
		container ? container.innerHTML = "": false;
		filResult.forEach(param => {
			var div =  document.createElement("div");
			div.classList.add('boxes_item', 'boxes_item--'+param.class);
			div.innerHTML = `<div class="boxes_item-content">
			<a href="order.html?restaurantId=${param.id}" class="link"><span class="link-text">${param.name}</span> <i class="fas fa-arrow-right"></i></a>
			</div>`;
			container ? container.appendChild(div) : false;
			
		});
	})
}
let UrlSplit = location.search.split('restaurantId=')[1];
	var foodUrl = `http://localhost:3000/food?restaurantsId=${UrlSplit}`;
	fetch(foodUrl)
	.then(res => res.json())
	.then(foodRes => {
		// console.log(foodRes);
		orderList ? orderList.innerHTML = "" : false;
		
		 foodRes.forEach(function(item, index) {
	        var productEl = document.createElement("tr");
	        productEl.innerHTML = `<td class="product-name"> 
	                                <span class="product-name">${item.name}</span>
	                                <span class="product-description">${item.description}</span>
	                            </td>
	                            <td>
	                                <span class="product-price">${item.price} lei</span>
	                                <span class="product-add-to-cart"><a href="#0" class="add-to-cart" data-id=${item.id}>Add+</a></span>
	                            </td>`;
	        if (tableItems) {
	            checkTableId(item.category, productEl);
	        }
	    });

	});

var UrlSplitF = location.search.split('restaurantId=')[1];
var foodUrl = `http://localhost:3000/food?restaurantsId=${UrlSplitF}`;

fetch(foodUrl)
.then( res => res.json())
.then(addFood => {
	//console.log(addFood);
	addFood.forEach( element => {
		//console.log("element: ", element.name);
		addToCart(element.id, element);
	});
});


var generateProductList = function(resUrl){
	
	fetch(foodUrl)
	.then(res => res.json())
	.then(foodRes => {
		// console.log(foodRes);
		orderList ? orderList.innerHTML = "" : false;
		
		 foodRes.forEach(function(item, index) {
	        var productEl = document.createElement("tr");
	        productEl.innerHTML = `<td class="product-name"> 
	                                <span class="product-name">${item.name}</span>
	                                <span class="product-description">${item.description}</span>
	                            </td>
	                            <td>
	                                <span class="product-price">${item.price} lei</span>
	                                <span class="product-add-to-cart"><a href="#0" class="add-to-cart" data-id=${item.id}>Add+</a></span>
	                            </td>`;
	        if (tableItems) {
	            checkTableId(item.category, productEl);
	        }
	    });

	});
	console.log(UrlSplit);
}
var checkTableId = function(checkId, prod) {
    var parent = document.getElementById(checkId);
    productsMenu.forEach(function(index) {
        if (checkId === index.id) {
            var children = parent.querySelector('.table-items');
            children.appendChild(prod);
            parent.querySelector('h3').innerHTML = checkId;
        }

        // console.log(index);
    });
}

var generateCartList = function() {
    orderList.innerHTML = "";
    productsInCart.forEach(function(item, index) {
        var tr = document.createElement("tr");
        tr.classList.add('order-box_item');

        tr.innerHTML = `<td class="remove-button"><a href="#0" id="itm${item.id}" class="remove" data-id=${index}>X</a></td>
                      <td class="order-box_item order-box_item-name"><span>${item.name}</span></td>
                      <td class="order-box_item order-box_item-quantity"><span>${item.quantity}</span></td>
                      <td class="order-box_item order-box_item-price"><span>${item.price * item.quantity} lei</span></td>`;

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
    productsMenu.forEach(function(index) {
        var parent = document.getElementById(index.id);

        var children = parent.querySelector('.table-items');
        children.addEventListener("click", function(event) {
            var button = event.target;
            if (button.classList.contains("add-to-cart")) {
                var buttonId = button.dataset.id;
                addToCart(buttonId);
            }

            //console.log(productsInCart);

        });
    })
    tableCart.addEventListener('click', function(event) {
        var btnRem = event.target;
        if (btnRem.classList.contains("remove")) {
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
    send.addEventListener("click", function(e) {
        e.preventDefault();
        if (productsInCart.length >= 1) {
            sendOrder();
            var cont = document.querySelector('.container-content_right');
            var divSuccess = document.createElement('div');
            var message = `<p class="success">Comanda a fost inregistrata cu succes!</p> `;
            divSuccess.innerHTML = message;
            storeMyOrder();
        }
        cont.appendChild(divSuccess);
        productsInCart = [];

        generateCartList();

    });

}
var sendOrder = function() {
    var city = document.getElementById('selectCity').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var orderProducts = productsInCart.map(function(item, index) {
        return productsInCart[index]
    });
    // console.log(orderProducts);
    orderStored.push({
        "city": city,
        "address": address,
        "phone": phone,
        "order": orderProducts
    });
    localStorage.setItem("order", JSON.stringify(orderStored));

}
var storeMyOrder = function() {
    var getOrder = localStorage.getItem('order');
    var displayConfirmOrder = JSON.parse(getOrder);
    // console.log(displayConfirmOrder);
}

var addToCart = function(elemId,elem) {
	console.log(elem);
	// console.log(el);
    if (productsInCart.length === 0 || productFound(elemId) === undefined) {
    	
        productsInCart.push({
            product: elem.name,
            quantity: 1,
            price: elem.price
        });
    } else {
        productsInCart.forEach(function(item) {
            if (item.id === el) {
                item.quantity++;
            }
           
        });
    }
    generateCartList();
}
var removeItemFromCart = function(itemId) {
    if (productsInCart[itemId].quantity === 1) {
        productsInCart.splice(itemId, 1);
    } else {
        productsInCart[itemId].quantity--;
    }
    generateCartList();
}
var productFound = function(productId) {
    return productsInCart.find(function(item) {
        return item.id === productId;
    });
}

var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
        return total + (item.price * item.quantity);
    }, 0);
}   
var init = function() {
    generateProductList();
    // restaurantsCateg();
    setupListeners();

}
init();