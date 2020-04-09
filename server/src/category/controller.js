import Category from './model';
import checkCategories from './createCategory';

checkCategories();

export default {
  showAll: async(req, res, next) => {
    try {
      const allCate = await Category.find({});
      res.status(200).json({"message":"All category is here.", allCate})
    } catch(err){
      return next('500:fail to find any category')
    }
  },
  create: async(req, res, next) => {
    try {
      const newCate = await Category.create(req.body);
      res.status(200).json({"message":"created category successfully", newCate})
    } catch(err) {
      return next('500:fail to create category.')
    }
  }

}