import Item from './model';
import OpenHour from './openHour.model';


export default {
  show: (req, res, next) => {
    res.json({ message: 'this is show' })
  },
  create: async(req, res, next) => {
    // const open_hour = req.body.details.open_hour;
    // delete req.body.details.open_hour;
    const item = req.body.details;
    const createItem = await Item.create(item);
    res.json(createdItem)

  },
  edit: (req, res, next) => {
    res.json({ message: 'this is edit' })
  },
  delete: (req, res, next) => {
    res.json({ message: 'this is delete' })
  }

}