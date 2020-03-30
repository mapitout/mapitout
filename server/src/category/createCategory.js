const axios = require('axios');

const category = [
  "Taiwanese",
  "Chinese",
  "Thai",
  "Mexican",
  "Italian",
  "Japanese",
  "Korean",
  "American",
  "Middle Eastern",
  "Dessert",
  "Breakfast",
  "Brunch",
  "Lunch",
  "Dinner",
  "Late night"
]

for (let i = 0; i < category.length; i++) {
  const item = category[i];
  console.log(item)
  const cateToCreate = {
    title: item
  }
  console.log(cateToCreate)
  axios.post('http://localhost:8000/publicApi/category/create',cateToCreate)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.response)
    })
}

