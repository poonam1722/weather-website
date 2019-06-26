console.log('it is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
response.json().then((data) =>{
 console.log(data)
})
})

const wform=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#m')
const messagetwo=document.querySelector('#y')
wform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    fetch('http://localhost:3000/weather?address='+location).then((respone) => {
        respone.json().then((data) => {
            if (data.error) {
                messageone.textContent=data.error
            }
            else {
                messageone.textContent=data.location 
                messagetwo.textContent=data.forecast
            }
        })
    })
})