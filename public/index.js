const eventSource = new EventSource("/stream")
const priceDisplay = document.getElementById("price-display")
const livePrice = document.getElementById("connection-status")
const investmentAmount = document.getElementById("investment-amount")
const purchaseForm = document.getElementById("purchase-form")

eventSource.onopen = (e) => {
livePrice.textContent= `Live Price 🟢`
}

eventSource.onmessage = (event)=> {
    const data = JSON.parse(event.data)
    const newPrice = data.price
    priceDisplay.textContent = newPrice
}

eventSource.onerror = () =>{
    console.log("Connection failed...")
    livePrice.textContent= "Disconnected 🔴"
}

purchaseForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const formData = new FormData(purchaseForm)
    const amount = formData.get("investment-amount")
    const price = priceDisplay.textContent

    fetch("http://localhost:6000/purchase", {method: "POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({amount, price}) })
    .then(res => res.json())
    .then(data => console.log(`Successfully posted: ${data.message}`))
})