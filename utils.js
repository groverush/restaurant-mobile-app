import { menuDinner, renderTicketHtml } from './index.js'

function removeItem(idOrder) {
    let indexDeleteOrder = 0
    const deleteItem = menuDinner.placeOrders.filter((order, index) => {
        if (order.uuid === idOrder) {
            indexDeleteOrder = index
            return indexDeleteOrder
        }
    }
    )[0];
    menuDinner.placeOrders.splice(indexDeleteOrder, 1)
    if (menuDinner.placeOrders.length === 0) {
        document.getElementById("place-order").style.display = "none"
        localStorage.clear()
    } else {
        renderTicketHtml(menuDinner.placeOrders)
        localStorage.setItem('tickets', JSON.stringify(menuDinner.placeOrders))
    }


}
function getTotalPrice(placeOrders) {
    return "$" + placeOrders.map(order => order.price).reduce((prev, curr) => {
        return prev + curr
    }, 0)
}

function payCompleteText(paymentForm) {
    const paymentFormData = new FormData(paymentForm);
    const name = paymentFormData.get("name")
    menuDinner.placeOrders = []
    return `
    Thanks, ${name} Your order is on its way!
   
    `
}



export { getTotalPrice, removeItem, payCompleteText }