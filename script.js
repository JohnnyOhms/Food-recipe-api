const form = document.querySelector("#form")
const input = document.querySelector("#search-box")
const search_bnt = document.querySelector(".search-btn")
const inst = document.querySelector(".instruction")
const searchName = document.querySelector("#search-name")
const mealContainer = document.querySelector(".meals")
const ApiURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
const detailsURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="


class GetReciepe{
    async getData() {
        try {
            let res = await fetch(`${ApiURL}${input.value.trim()}`)
            let data = await res.json()
            return data
        } catch (error) {
            alert(`${error} Refreash page`)
        }
    }
}

class Logic{
    searchReceipe(){
        search_bnt.addEventListener("click", (e) => {
            e.preventDefault()
            getReciepe.getData()
                .then(data =>logic.displayData(data.meals))
        } )
    }

    displayData(data) {
        let display = ''
        data.forEach(item => {
            display += `
                 <div class="single-meal">
                    <div class="meal-img">
                        <img src="${item.strMealThumb}" alt="" srcset="">
                    </div>
                    <span>${item.strMeal}</span>
                    <div class="view-receipe">
                        <button id="view-receipe" data-id="${item.idMeal}">view-receipe</button>
                    </div>
                </div>
            `
            mealContainer.innerHTML = display;
        });
       
    }
}


const getReciepe = new GetReciepe()
const logic = new Logic()
logic.searchReceipe();