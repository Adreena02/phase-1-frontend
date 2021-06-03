fetch('http://localhost:3000/movies')
.then(resp => resp.json())
.then(addMoviesToDom)

let movieList = document.querySelector('.movie-list')

function addMoviesToDom(movieData) {
    movieData.forEach(movie => {
      addOneMovie(movie)
   }) 
}
 function addOneMovie(movie) {
  let collectionDiv = document.createElement('div')
  collectionDiv.className = "card"
  let h2 = document.createElement('h2')
  h2.textContent = movie.title
  let h3 = document.createElement('h3')
  h3.textContent = movie.year
  let img = document.createElement('img')
  img.src = movie.image
  let description = document.createElement('p')
  description.className = "desc-p"
  description.textContent = movie.description
  let likes = document.createElement('p')
  likes.className = "likes-p"
  likes.textContent = `${movie.likes} Likes`
  let button = document.createElement("button")
  button.textContent = "Like"
  button.className = "like-btn"
  let reviews = document.createElement('p')
  reviews.className = "reviews-p"
  reviews.textContent =`Review : ${movie.reviews}`
  
  collectionDiv.dataset.id = movie.id
  //h3.dataset.id = movie.year

  collectionDiv.append(h2, h3, img, description, likes, button, reviews)
  
  movieList.append(collectionDiv)

 }



  const movieForm = document.querySelector(".add-movie-form")
  const input1 = document.querySelector(".add-movie-form")[0]
  const input2 = document.querySelector(".add-movie-form")[1]
  const input3 = document.querySelector(".add-movie-form")[2] 
  const input4 = document.querySelector(".add-movie-form")[3]
  
  movieForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: 
          {
            "Content-Type": "application/json",
              Accept: "application/json"
              },

          body: JSON.stringify({
              title: input1.value,
              image: input2.value,
              description: input3.value,
              likes: "0",
              reviews: input4.value
              })
              
            })
            .then(resp => resp.json())
            .then(addOneMovie)
              
            movieForm.reset()
            })

            

 movieList.addEventListener('click', (e) =>{
      e.preventDefault()
                
      if(e.target.className === "like-btn"){
        let currentLikes = parseInt(e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1
        e.target.previousElementSibling.innerText = `${newLikes} likes`
                  
        let id = e.target.parentElement.dataset.id
            console.log(id)
      

            fetch(`http://localhost:3000/movies/${id}`, {
               method: "PATCH",
               headers: {
                 "Content-Type": "application/json",
                                },
               body: JSON.stringify({ likes: newLikes }),
      
                  })
                 .then(resp => resp.json())
                 .then(console.log)
                }
                
      })
              
      
      // let movieDropdown = document.querySelector("#movie-dropdown")
      //   movieDropdown.addEventListener("change", grabSelectedDec) 
      //   function grabSelectedDec(e){
      //   let decade = e.target.value
      //   let year = h3.dataset.id
        
      //   if (decade === year.slice(1,3)){
      //       console.log(year)
      //        }}
                           


