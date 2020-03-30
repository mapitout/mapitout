import Item from './model';
// import OpenHour from './openHour.model';


export default {
  show: (req, res, next) => {
    res.json({ message: 'this is show' })
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
        return next(`500:iten must be unique`)
      } 
      if (err.errors && err.errors.title) {
        return next(`500:${err.errors.title.message}`)
      } else if (err.errors && err.errors.address) {
        return next(`500:${err.errors.address.message}`)
      } 
      return res.json({"message": err})
    }

  },
  edit: (req, res, next) => {
    res.json({ message: 'this is edit' })
  },
  delete: (req, res, next) => {
    res.json({ message: 'this is delete' })
  }

}