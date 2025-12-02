const eventSource = new EventSource("/stream")
const priceDisplay = document.getElementById("price-display")
const livePrice = document.getElementById("connection-status")

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