// fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=00e4f530ba66ceb306527af704041aef")
//       .then(response => response.json())
//       .then(response => console.log(response))

const citySearch = document.querySelector('input')
const getCityValue = () => citySearch.value
citySearch.addEventListener('keypress', e => {
    if(e.key === "Enter"){
        clearInput()
        updateWeather()
        updateGif()
    }
})

const getWeather = async city => {
    const apiKey = "00e4f530ba66ceb306527af704041aef"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(url)
    return response.json()
}