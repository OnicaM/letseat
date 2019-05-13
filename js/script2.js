function displayCatNav() {
    var element = document.getElementById("categoriesD");
    element.parentElement.classList.toggle("active");
}

function toggleRestaurants() {
    var pick = document.getElementById("pick");
    pick.parentElement.classList.toggle("active");
}

function displayMobileNav() {
    var element = document.getElementById("body");
    element.classList.toggle("js--mobile");
}
window.addEventListener("load", function() {

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

    }
});

/*Switch login*/
var login = document.querySelector('.login');
login.addEventListener('click', function() {

    var registerContainer = document.querySelector('.form_register');
    var loginContainer = document.querySelector('.form_login');
    registerContainer.classList.remove('hide');
    loginContainer.classList.add('hide');
});

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

var products = [{
            id: 0,
            restaurant: "Bistro26",
            type: "traditional",
            category: "salate",
            name: "Salata Caesar",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 20
        },
        {
            id: 1,
            restaurant: "Mudy",
            type: "traditional",
            category: "paste",
            name: "Paste Quatro Formagi",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 25,
        },
        {
            id: 2,
            restaurant: "Gepetto",
            type: "chinezesc",
            category: "burgeri",
            name: "Burger Classic",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 209
        },
        {
            id: 3,
            restaurant: "GrillHouse",
            type: "pizza",
            category: "burgeri",
            name: "Burger Double",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada quis dolor ut tincidunt. Morbi facilisis justo ac mauris feugiat pulvinar.",
            price: 30
        },
        {
            id: 4,
            restaurant: "Holand",
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
        if (tableItems) {
            checkTableId(item.category, productEl);
        }
    });
}
var checkTableId = function(checkId, prod) {
    var parent = document.getElementById(checkId);
    productsMenu.forEach(function(index) {
        if (checkId === index.id) {
            var children = parent.querySelector('.table-items');
            children.appendChild(prod);
        }
    });
}

var generateCartList = function() {
    orderList.innerHTML = "";
    productsInCart.forEach(function(item, index) {
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


    productsMenu.forEach(function(index) {
        var parent = document.getElementById(index.id);

        var children = parent.querySelector('.table-items');
        children.addEventListener("click", function(event) {
            var button = event.target;
            if (button.classList.contains("add-to-cart")) {
                var buttonId = button.dataset.id;
                addToCart(buttonId);
            }

            console.log(productsInCart);

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
    console.log(orderProducts);
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
    console.log(displayConfirmOrder);
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
        return item.product.id === productId;
    });
}

var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
        return total + (item.product.price * item.quantity);
    }, 0);
}
var generateRestaurants = function() {

}

var restaurantsCateg = function() {
    products.forEach(function(item) {
        var restaurantEl = document.createElement('div');
        restaurantEl.classList.add('boxes_item', 'boxes_item--indian');
        restaurantEl.innerHTML = `<div class="boxes_item-content">
                                    <a href="order.html?page=${item.restaurant}" class="link"><span class="link-text">${item.restaurant}</span> <i class="fas fa-arrow-right"></i></a>
                                 </div>`;
    

        if (boxes) {
            boxes.appendChild(restaurantEl);
        }
    });
}


var findRestaurants = function(myRestaurants, title) {
    var titleReturned = myRestaurants.find(function(item, index) {
        return item.restaurant.toLowerCase() === title.toLowerCase();
    });
    return titleReturned;
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;

    });
    return vars.page;
}
console.log(getUrlVars());
var pageTitle = document.querySelector('.container-title > h1');
if (getUrlVars()) {
    pageTitle.textContent = getUrlVars();
}

var init = function() {
    generateProductList();
    restaurantsCateg();
    setupListeners();

}
init();