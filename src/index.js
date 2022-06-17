document.addEventListener("DOMContentLoaded", () => {
    fetchQuotes()
  })
  
  function fetchQuotes(){
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(res => res.json())
    .then(quotes => quotes.forEach(quote => renderQuotes(quote)))
  }
  
  function renderQuotes(quote){
   let li = document.createElement("li")
   li.className = "quoteList"
   li.innerHTML = `
   <blockquote class="blockquote">
   <p class="mb-0">${quote.quote}.</p>
   <footer class="blockquote-footer">${quote.author}</footer>
   <br>
   <button class="btn-success">Likes: <span>${quote.likes.length}</span></button>
   <button class="btn-danger">Delete</button>
   </blockquote>
   `
   document.querySelector("#quote-list").append(li)
  
   li.querySelector(".btn-success").addEventListener("click", (event) =>{
       let likes = parseInt(event.target.childNodes[1].textContent)
       likes++
       event.target.childNodes[1].textContent = likes
       postLikes(quote)
       patchLikes(quote)
   })
  
   li.querySelector(".btn-danger").addEventListener("click", () => {
       li.remove()
       deleteQuote(quote.id)
   })
  
  }
  const newQuoteForm = document.querySelector("#new-quote-form")
  newQuoteForm.addEventListener("submit", handleSubmit)
  
  function handleSubmit(event){
    event.preventDefault()
    const newQuote = event.target[0].value
    const newAuthor = event.target[1].value
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            quote: newQuote,
            author: newAuthor
        })
    })
    .then(resp => resp.json())
    .then(renderQuotes)
  
    newQuoteForm.reset()
  }
  
  function patchQuotes(quote) {
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: "Patch",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
       },
        body: JSON.stringify(quote)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }
  
  function postLikes(quote){
  
   fetch(`http://localhost:3000/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
       },
        body: JSON.stringify({
                quoteId : quote.id
        })
    })
    .then(resp => resp.json())
  }
  
  function patchLikes(quote){
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: "Patch",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
       },
        body: JSON.stringify(quote)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }
  
  function deleteQuote(id){
    fetch(`http://localhost:3000/quotes/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
            Accept: "application/json"
        }
    })
  } 