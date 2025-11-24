const eventSource = new EventSource("/stream")
const priceDisplay = document.getElementById("price-display")

eventSource.onmessage = (event)=> {
    const data = JSON.parse(event.data)
    const newPrice = data.price
    priceDisplay.textContent = newPrice
}

eventSource.onerror = () =>{
    console.log("Connection failed...")
}