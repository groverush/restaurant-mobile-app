import { menuArray } from './data.js'
import Menu from './Menu.js'
import { getTotalPrice, removeItem, payCompleteText } from "./utils.js"

const paymentForm = document.getElementById('payment-form')

export let localOrders = JSON.parse(localStorage.getItem('tickets'))
export const menuDinner = new Menu(menuArray)

if (localOrders) {
    menuDinner.placeOrders = localOrders
    renderTicketHtml(menuDinner.placeOrders)
}



paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    localStorage.clear()
    menuDinner.placeOrders = 0
    renderPaymentComplete()
    cleanInputsForm()
})
document.addEventListener("click", (e) => {

    if (e.target.dataset.name) {
        menuDinner.pushOrder(e.target.dataset.name)

    }
    else if (e.target.dataset.remove) {

        removeItem(e.target.dataset.remove, menuDinner.placeOrders)
    } else if (e.target.id === 'complete-order-btn') {
        completeOrderBtn()
    } else if (e.target.id === 'modal-close-btn') {
        modalCloseBtn()
    }
})




function renderMenu() {
    document.getElementById("menu-dinner-section").innerHTML = menuDinner.getMenuDinnerHtml()
}



export function renderTicketHtml(orders) {
    document.getElementById("payment-completed").style.display = "none"
    if (orders) {
        document.getElementById("products-added").innerHTML = menuDinner.getOrdersHtml(orders)
        document.getElementById("place-order").style.display = "flex"
        document.getElementById("total-price").textContent = getTotalPrice(orders)
    }
}
function completeOrderBtn() {
    document.getElementById("modal").style.display = "flex"
}
function modalCloseBtn() {
    document.getElementById("modal").style.display = "none"
}

function renderPaymentComplete() {
    document.getElementById("place-order").style.display = "none"
    document.getElementById("modal").style.display = "none"
    document.getElementById("payment-completed").style.display = "block"
    document.getElementById("payment-completed").textContent = payCompleteText(paymentForm)
}





function cleanInputsForm() {
    document.querySelectorAll("input").forEach(inp => {
        inp.value = ""
    })
}





renderMenu()