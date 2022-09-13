class GetReciepe{
    async getData() {
        let res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=egg")
        let data = await res.json()
        return data
    }

    async mealDetails() {
        let res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52952")
        let data = await res.json()
        return data
    }
}


const getReciepe = new GetReciepe()
getReciepe.getData()
    .then((data) => console.log(data))

getReciepe.mealDetails()
.then(data=> console.log(data, data.meals[0].strInstructions))