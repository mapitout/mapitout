import Category from './model';

function create() {
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
    const cateToCreate = {
      title: item
    }
    Category.create(cateToCreate)
      .then(() => console.log(`${item} created in Category DB`))
      .catch(e => console.error(`fail to create ${item} in Category DB`, e));
  }
  
}

function checkCategories() {
  Category.find({})
    .then((categories) => {
      const catelength = categories.length;
      if(catelength === 0){
        console.log('Intend to init categories.')
        create();
      }else{
        console.log(`Health check: ${catelength} categories found in DB`)
      }
    })
    .catch(e => console.error(`fail to fetch all in Category DB`, e));
}

export default checkCategories;
