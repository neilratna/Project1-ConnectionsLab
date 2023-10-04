// console.log("Loading...");

// window.addEventListener('load', function(){
//     console.log("Loaded!");
//     displayRandomPosters();
// });

// function displayRandomPosters() {
//     fetch("data.json").then(function(response){
//         return response.json();
//     }).then(function(movies){
//         // Randomly select 2 different movies
//         let indices = new Set();
//         while (indices.size < 2) {
//             indices.add(Math.floor(Math.random() * movies.length));
//         }
//         let selectedMovies = [...indices].map(index => movies[index]);

//         // Clear the previous borders
//         document.querySelectorAll('.box').forEach(box => box.style.border = 'none');

//         // Populate the 2 boxes with the movie poster images
//         document.querySelectorAll(".movie-poster").forEach((imgElem, i) => {
//             imgElem.src = selectedMovies[i].Poster_Link;
//             imgElem.setAttribute("data-imdb-rating", selectedMovies[i].IMDB_Rating); // Store IMDb rating as data attribute
//             imgElem.addEventListener("click", function() {
//                 let otherPoster = (i === 0) ? document.querySelectorAll(".movie-poster")[1] : document.querySelectorAll(".movie-poster")[0];
                
//                 // Check the users guess
//                 if (parseFloat(imgElem.getAttribute("data-imdb-rating")) > parseFloat(otherPoster.getAttribute("data-imdb-rating"))) {
//                     imgElem.parentElement.style.border = '10px solid green';  // green border
//                 } else {
//                     imgElem.parentElement.style.border = '10px solid red';  // red border
//                 }

//                 // After user provides feedback, wait for 3 seconds and then display a new pair movie posters randomly
//                 setTimeout(displayRandomPosters, 3000);
//             });
//         });
//     });
// }

// ------------------------------------------------
// ------------------------------------------------
// -------------------------------------------------above works well but doesnt use p5.
// below works and uses p5 to say congrats but is not positioned well on the page

console.log("Loading...");

window.addEventListener('load', function(){
    console.log("Loaded!");
    displayRandomPosters();
});

function displayRandomPosters() {
    clear(); // Clear the p5 canvas to remove previous messages

    fetch("data.json").then(function(response){
        return response.json();
    }).then(function(movies){
        // select 2 different movies randomly
        let indices = new Set();
        while (indices.size < 2) {
            indices.add(Math.floor(Math.random() * movies.length));
        }
        let selectedMovies = [...indices].map(index => movies[index]);

        // Clear the previous borders
        document.querySelectorAll('.box').forEach(box => box.style.border = 'none');

        // Populate the 2 boxes with the movie poster images
        document.querySelectorAll(".movie-poster").forEach((imgElem, i) => {
            imgElem.src = selectedMovies[i].Poster_Link;
            imgElem.setAttribute("data-imdb-rating", selectedMovies[i].IMDB_Rating); // Store the IMDb rating as a data attribute
            imgElem.addEventListener("click", function() {
                let otherPoster = (i === 0) ? document.querySelectorAll(".movie-poster")[1] : document.querySelectorAll(".movie-poster")[0];
                
                // Check the users guess
                if (parseFloat(imgElem.getAttribute("data-imdb-rating")) > parseFloat(otherPoster.getAttribute("data-imdb-rating"))) {
                    imgElem.parentElement.style.border = '10px solid green';  // green border if guess correct
                    displayCongrats();  // Use p5 to display the congrats message
                } else {
                    imgElem.parentElement.style.border = '10px solid red';  // red border if guess wrong
                    clear();  // Clear the p5 canvas
                }

                // After user provides feedback, wait for 3 seconds and then display a new pair movie posters randomly
                setTimeout(displayRandomPosters, 3000);
            });
        });
    });
}

function displayCongrats() {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0, 255, 0);
    text("Congrats", windowWidth/2, windowHeight/2);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    clear();
}


