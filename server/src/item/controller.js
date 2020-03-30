import Item from './model';
// import OpenHour from './openHour.model';


export default {
  show: async(req, res, next) => {
    const itemId = req.params.id;
    try {
      const findItem = await Item.findById(itemId)
      return res.json({"message":"find item successfully",findItem})
    } catch(err) {
      return next('500:Cannot find the item you are looking for')
    }
  },
  create: async(req, res, next) => {
    // const open_hour = req.body.details.open_hour;
    // delete req.body.details.open_hour;
    const item = req.body.details;
    console.log(item)
    try{
      const createdItem = await Item.create(item);
      return res.json({"message":"item is created successfully",createdItem})
    }catch(err){
      if (err.code === 11000) {
        return next(`500:iten title must be uniqued.`)
      } 
      if (err.errors && err.errors.title) {
        return next(`500:${err.errors.title.message}`)
      } else if (err.errors && err.errors.address) {
        return next(`500:${err.errors.address.message}`)
      } 
      return res.status(500).json({"message": err.message})
    }

  },
  edit: async(req, res, next) => {
    const itemId = req.params.id;
    const updateditem = req.body.details;
    try {
      const editItem = await Item.findByIdAndUpdate(itemId, updateditem,{new: true});
      return res.status(200).json({"message":"edit item successfully",editItem})
    } catch(err) {
      return next('500:failed to update item. Please try again.')
    }
    
  },
  destroy: async(req, res, next) => {
    const itemId = req.params.id;
    try {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      return res.status(200).json({"message":"delete item successfully",deletedItem})
    } catch(err) {
      return next('500:failed to delete item. Please try again.')
    }
  }

}