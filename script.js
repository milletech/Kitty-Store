// Use module patterns

// UI 
/*var UIController = (function() {

    return {
        getDOMStrings: function() {
            return DOMStrings;
        }
    }

})();

// DATA
var DataController = (function() {
    var productData = function(image, proName, price) {
        this.image = image;
        this.proName = proName,
            this.price = price
    };
    var cartAll = [];
    return {
        addItem: function(image, proName, price) {
            newItem = new productData(image, proName, price);
            cartAll.push(newItem);
        },
        proCard: {
            image: this.parentElement.firstChildElement.firstChildElement.src,
            name: this.nextSiblingElement.firstChildElement.value,
            price: this.nextSiblingElement.firstChildElement.nextSiblingElement.value
        }

    }
})()

// Controller

var BtnController = (function(UICtrl) {
    // All the button controller
    /*
    1.Cart Button To Open and Close the cart
    2.Add to cart Button in the product card
    */
/*
    var DOM = UICtrl.getDOMStrings();
    var addIcon = document.getElementsByClassName(DOM.addItem);

    // THE CART BTN
    var cartOperation = function() {
        document.querySelector(DOM.cartBtn).addEventListener("click", function() {
            document.querySelector(DOM.cartSheet).style.width = "20%";
        });
        document.querySelector(DOM.cartAbort).addEventListener("click", function() {
            document.querySelector(DOM.cartSheet).style.width = "0%";
        })
    }

    for (x of addIcon) {
        x.addEventListener("click", function() {
            DataController.addItem(DataController.proCard.image, DataController.proCard.name, DataController.proCard.price);
        })
    }
    // ADD TO CART

    cartOperation();

})(UIController)
*/

// Okay let analysi this system
/*
1.The Cart Btn & close cart Btn==> For opening and closing the cart
===cart btn===>add open event listener to increase the width of the cart
===close cart btn===> self explanatory, add an event listener to decrease the width of the width of the cart


2.Add to cart btn==>add the item to the cart
====Create an object{
    :name of the product,
    :image of the product,
    :price of the product
}
===>function constructor
===>Store the object in the allItems array==>Product Counter

3.Update the number of items in the cart and the total cost
==number of items==>retrive the data  from the array wich is Array.length
==total cost==>Price sets arrays to store all the product cost ,then loop over the array and sum the prices
====DATA STRUCTURE=====

3.Remove from the cart btn==>In 2 ways remove the cart from the cart itself and the an item

4.Update the UI
===>Add an checkout overlay in the product
===>Change the plus icon to minus icon
===>Cart items
*/

// THE DATA STRUCTURE


var dataController = (function() {

    return {
        createItem: function() {

        }
    }

})()

// UI CONTROLLER MODULE
var UIController = (function() {
    var DOMStrings = {
        cartBtn: ".navbar__cart-icon",
        cartSheet: ".checkout",
        cartAbort: ".abort",
        addItem: "product-card__add",
        cartDOM: ".cartItems",
        counter: ".counter"
    }

    return {
        addItem: function(obj) {
            var html, newHtml;
            counter = 0;
            html = '<div class="product-cart"><img src="%imagesrc%" alt="" class="cartImg"><div class="product-cart-desc"><h1>%productName%</h1><h1>%productPrice%</h1><i>Remove</i></div></div>';
            newHtml = html.replace("%imagesrc%", obj.proImage);
            newHtml = newHtml.replace("%productName%", obj.proName);
            newHtml = newHtml.replace("%productPrice%", obj.proPrice);

            //Insert the item to the cart DOM
            document.querySelector(DOMStrings.cartDOM).insertAdjacentHTML("beforeend", newHtml);

        },
        /* updateUI: function() {
             var counter = 0;
             return counter += 1;
         },*/
        getDOMStrings: function() {
            return DOMStrings;
        }
    }
})();

// CONTROLLER, THE CENTER OF EVERYTHING
var controller = (function(UICtrl) {
    var strings = UICtrl.getDOMStrings();
    var addIcon = document.getElementsByClassName(strings.addItem);
    var counter = 0;
    for (x of addIcon) {
        x.addEventListener("click", function() {
            var ProductInfo = function(proName, proPrice, proImage, numPrice) {
                this.proName = proName;
                this.proPrice = proPrice;
                this.proImage = proImage;
                this.numPrice = numPrice;
            };
            var productName = this.parentElement.firstChild.nextElementSibling.firstChild.nextElementSibling.innerHTML;
            var productPrice = (this.parentElement.firstChild.nextElementSibling.lastChild.previousElementSibling.innerHTML);
            var newPrice = Number(productPrice.slice(1));
            var productImage = this.parentElement.parentElement.firstChild.nextElementSibling.firstChild.nextElementSibling.src;
            // DATA STRUCTURE
            var data = {
                products: [],
                allPrices: []
            };
            // CREATE  NEW ITEM
            var newItem = new ProductInfo(productName, productPrice, productImage, newPrice);
            data.products.push(newItem);
            data.allPrices.push(newItem.numPrice);
            dataController.createItem();
            // ADD TO CART
            UICtrl.addItem(newItem);
            // UPDATE UI
            counter++;
            document.querySelector(strings.counter).innerHTML = counter;


        })
    }
    // OPEN CART
    document.querySelector(strings.cartBtn).addEventListener("click", function() {
        document.querySelector(strings.cartSheet).style.width = "20%";
    });
    // CLOSE CART
    document.querySelector(strings.cartAbort).addEventListener("click", function() {
        document.querySelector(strings.cartSheet).style.width = "0%";
    })
})(UIController)