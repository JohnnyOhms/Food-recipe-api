const form = document.querySelector("#form")
const input = document.querySelector("#search-box")
const search_bnt = document.querySelector(".search-btn")
const inst = document.querySelector(".instruction")
const searchName = document.querySelector("#search-name")
const mealContainer = document.querySelector(".meals")
const modal = document.querySelector(".modal-box")
const wrapper = document.querySelector(".wrapper")
let singleImg;
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

    async getReciepeDetials(id) {
        try {
            let res = await fetch(`${detailsURL}${id}`)
            let data = await res.json()
            return data;
        } catch (error) {
            alert(`${error} failed to load detials`)
        }
    }
}

class Logic{
    searchReceipe(){
        search_bnt.addEventListener("click", (e) => {
            e.preventDefault()
            getReciepe.getData()
                .then(data => {
                    logic.displayData(data.meals)
                    console.log(data)
                })
                .then(() => {
                    logic.getViewButtons()
                })
                
        } )
    }

    displayData(data) {
        if (data === null) {
            this.noRecipe()
        } else {
            let display = ''
            data.forEach(item => {
                display += `
                     <div class="single-meal">
                        <div class="meal-img">
                            <img src="${item.strMealThumb}" alt="" srcset="">
                        </div>
                        <span>${this.checkNameLegngth(item.strMeal)}</span>
                        <div class="view-receipe">
                            <button id="view-receipe" data-id="${item.idMeal}">view-receipe</button>
                        </div>
                    </div>
                `
                mealContainer.innerHTML = display;
            });
            this.diplayLabel()
            form.reset()
        }
    }

    checkNameLegngth(name){
        if (name.length > 35) {
            return name.substring(0, 25)
        }
        return name   
    }

    diplayLabel() {
        if (!input.value) {
            searchName.textContent = `all available receipe`;
            searchName.style.color = "orangeRed"
            inst.style.display = "none"
        } else {
            searchName.textContent = `"${input.value}" related receipe`;
            searchName.style.color = "orangeRed"
            inst.style.display = "none" 
        }
    }

    noRecipe() {
        searchName.textContent = "No Recipe found"
        searchName.style.color = "red"
        mealContainer.innerHTML = ""
         inst.style.display = "none"
        setTimeout(() => {
            searchName.textContent = ''
            searchName.style.color = "orangeRed"
            inst.style.display = "block"
        }, 2000);
        form.reset()
    }

    getViewButtons() {
        let viewBtn = [...document.querySelectorAll("#view-receipe")]
        viewBtn.forEach(btn => {
            btn.addEventListener("click", (e) => {
                let id = btn.dataset.id;
                let target = e.target;
                this.getTargetImage(target)
                getReciepe.getReciepeDetials(id)
                .then((data) => {
                    this.displayDetails(data)
                    this.getExistBtn()
                        // console.log(data)
                })
            })
        })
    }

    getTargetImage(target) {
        singleImg = target.parentElement.parentElement.children[0].children[0].src;
        return singleImg;
    }

    displayDetails(data) {
        modal.classList.remove("hide")
        wrapper.classList.remove("hide")
        let display;
        display = `
            <div class="modal">
            <div class="details">
                <div class="cancel">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div class="img">
                    <img src="${singleImg}" alt="" srcset="">
                </div>
                <div class="instruction-step">
                    <span style="color: black;">INSTRUCTIONS FOR ${data.meals[0].strMeal}:</span>
                    <p class="steps">${data.meals[0].strInstructions}</p>
                </div>
                <div class="link">
                    <i class="fa-brands fa-youtube"></i>
                    <a href="${data.meals[0].strYoutube}" target="_blank" rel="noopener noreferrer">Click to watch video</a>
                </div>
            </div>
        </div>
        `
        modal.innerHTML = display;
    }

    getExistBtn() {
        let exist = document.querySelector(".fa-circle-xmark")
        exist.addEventListener('click', () => {
            this.closeModal()
        })
        wrapper.addEventListener("click", () => {
            this.closeModal()
        })
    }

    closeModal() {
        modal.classList.add("hide")
        wrapper.classList.add("hide")
    }
}

    const getReciepe = new GetReciepe()
    const logic = new Logic()
    logic.searchReceipe();
    
