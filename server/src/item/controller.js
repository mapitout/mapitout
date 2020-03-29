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
    let createdItem; 
    try{
      createdItem = await Item.create(item);
      res.json(createdItem)
    }catch(err){
      return next('Error when creating item')
    }

  },
  edit: (req, res, next) => {
    res.json({ message: 'this is edit' })
  },
  delete: (req, res, next) => {
    res.json({ message: 'this is delete' })
  }

}