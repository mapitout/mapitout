import Item from './model';
// import OpenHour from './openHour.model';


export default {
  show: async(req, res, next) => {
    const itemId = req.params.id;
    try {
      const findItem = await Item.findById(itemId)
      return res.json({"message":"find pin successfully",findItem})
    } catch(err) {
      return next('500:Cannot find the pin you are looking for')
    }
  },
  showAll: async(req, res, next) => {
    try {
      const allItem = await Item.find({});
      const items = []
      for (let i = 0; i < allItem.length; i++) {
        const item = allItem[i];
        let newItem = {
          _id: item._id,
          title: item.title,
          address: item.address,
          longitude: item.location.coordinates[0],
          latitude: item.location.coordinates[1]
        }
        items.push(newItem);
      }
      res.status(200).json({"message":"successfully find all pins.", items})
    } catch(err) {
      res.status(500).json({"message":err})
    }
  },
  create: async(req, res, next) => {
    // const open_hour = req.body.details.open_hour;
    // delete req.body.details.open_hour;
    const item = req.body.details;
    console.log(item)
    try{
      const createdItem = await Item.create(item);
      return res.json({"message":"Pin is created successfully",createdItem})
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
      return res.status(200).json({"message":"Updated pin is saved successfully.",editItem})
    } catch(err) {
      return next('500:failed to update this pin. Please try again.')
    }
    
  },
  destroy: async(req, res, next) => {
    const itemId = req.params.id;
    try {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      return res.status(200).json({"message":"Pin is deleted successfully.",deletedItem})
    } catch(err) {
      return next('500:failed to delete this pin. Please try again.')
    }
  },
  search: async(req, res, next) => {
    
    res.json("this is search")
  }

}