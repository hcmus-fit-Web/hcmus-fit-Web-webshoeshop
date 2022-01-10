if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    updateCartTotal()

    var removeCartItemButtons = document.getElementsByClassName('close1');
    for (var i =0 ; i <removeCartItemButtons.length;i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click',removeCartItem)
        // $('.close1 input[type="submit"]').post(`/removeAProduct/${$('#product-id').val()}`)
    }


    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('item_add')
    console.log(addToCartButtons)
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }


}

async function removeCartItem(event){
    // event.preventDefault();

    var buttonClicked = event.target

    console.log(`/removeAProduct/${$('#product-id').val()}`)
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()


}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    // var button = event.target
    // var shopItem = button.parentElement.parentElement.parentElement.parentElement.parentElement
    // console.log(shopItem)
    // var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    // var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    // var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].innerText
    // addItemToCart(title, price, imageSrc)
    // updateCartTotal()
}


function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-header')
    var cartItems = document.getElementsByClassName('shop-item')[0]
    var cartRowContents = `
         <div class="cart-header">
                <div class="close1"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
                <div class="cart-sec simpleCart_shelfItem">
                    <div class="cart-item cyc">
                        <img src="${imageSrc}" class="img-responsive" alt=""/>
                    </div>
                    <div class="cart-item-info">
                        <ul class="qty">
                            <li>Qty :<input class="cart-quantity-input" type="number" value="1"></li>
                            <li>Price each :<p class="cart-price cart-column"> ${price}</p></li>
                        </ul>
                        <div class="delivery">
                            <p>Service Charges : Rs.190.00</p>
                            <span>Delivered in 2-3 bussiness days</span>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-header')
    var total = 0
    for (var i =0;i<cartRows.length;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var qtyElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = priceElement.innerText.replace('$','');
        var qyt = qtyElement.value
        total  = total + price*qyt
    }
    console.log(cartItemContainer.length)
    document.getElementsByClassName('simpleCart_quantity1')[0].innerText = cartRows.length
    document.getElementsByClassName('simpleCart_quantity')[0].innerText = cartRows.length
    document.getElementsByClassName('cart-total-price1')[0].innerText = '$' + total
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}