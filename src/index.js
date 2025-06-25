
const init = () => {

  const form = document.querySelector("form");               
  const idInput = document.querySelector("#searchByID");      
  const titleEl = document.querySelector("#movieDetails h4");
  const summaryEl = document.querySelector("#movieDetails p");


  form.addEventListener("submit", (e) => {
    e.preventDefault();                    
    const id = idInput.value.trim();        
 
    if (!id) {
      titleEl.innerText = "Please enter an ID 🙂";
      summaryEl.innerText = "";
      return;
    }

  
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => {
        if (!res.ok) {                   
          throw new Error(`Movie ID ${id} not found`);
        }
        return res.json();
      })
      .then((movie) => {
      
        titleEl.innerText = movie.title;
        summaryEl.innerText = movie.summary;
      })
      .catch((err) => {
     
        titleEl.innerText = "No movie found 🤷‍♂️";
        summaryEl.innerText = err.message;
        console.error(err);
      })
      .finally(() => {
        form.reset();                      
      });
  });
};

document.addEventListener("DOMContentLoaded", init);