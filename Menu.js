import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { localOrders, renderTicketHtml } from './index.js'
class Menu {
    constructor(menu) {
        this.menu = menu
        this.placeOrders = []

    }
    getMenuDinnerHtml() {
        return this.menu.map(item => {
            const { name, ingredients, id, price, emoji } = item
            return `
            <div class="menu-item" id="${id}">
              <div class="menu-image">${emoji}</div>
              <div class="menu-details">
                <h3>${name}</h3>
                <p>${ingredients.join(', ')}</p>
                <span class="price">$${price}</span>
                </div>
              <div class="menu-btn">
              <button class="add-order-btn" data-name="${id}">+</button>
              </div>
              </div>
              `
        }).join("")
    }
    pushOrder(idOrder) {

        if (localOrders) {
            this.placeOrders = localOrders
        }
        this.menu.forEach(item => {
            const { id, name, price } = item
            if (id === parseInt(idOrder)) {
                this.placeOrders.push({
                    uuid: uuidv4(),
                    name: name,
                    price: price,
                    quantity: 1
                })
            }
        })

        localStorage.setItem('tickets', JSON.stringify(this.placeOrders))
        renderTicketHtml(this.placeOrders)

    }
    getOrdersHtml() {
        return this.placeOrders.map(order => {
            const { uuid, name, price } = order

            return `
            <div class="item-added" id="${uuid}">
                <h3>${name}</h3>
                <button 
                class="remove-item-btn" 
                data-remove="${uuid}"
                >
                remove
                </button>
                <span class="price">$${price}</span>
            </div>
        `
        }).join('')
    }

}




export default Menu