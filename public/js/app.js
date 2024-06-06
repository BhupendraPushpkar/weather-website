const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.getElementById('msg1')
const message2 = document.getElementById('msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                message1.textContent = data.error   
            }
            else
            {
                message1.textContent = data.location
                message2.textContent = data.message
                // console.log(data.location)
                // console.log(data.message) 
            }        
        })
    })
})

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then(({latitude, longitude, message, location}) => {
//         console.log(latitude, longitude, message, location)
//     })
// })