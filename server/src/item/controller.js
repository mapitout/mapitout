import Item from './model';
// import OpenHour from './openHour.model';
// import Category from '../category/model';

export default {
  show: async (req, res, next) => {
    const itemId = req.params.id;
    try {
      const findItem = await Item.findById(itemId).populate('category');
      return res.json({ "message": "find pin successfully", findItem })
    } catch (err) {
      return next('500:Cannot find the pin you are looking for')
    }
  },
  showAll: async (req, res, next) => {
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
      res.status(200).json({ "message": "successfully find all pins.", items })
    } catch (err) {
      res.status(500).json({ "message": err })
    }
  },
  create: async (req, res, next) => {
    // const open_hour = req.body.details.open_hour;
    // delete req.body.details.open_hour;
    const item = req.body.details;
    try {
      const createdItem = await Item.create(item);
      return res.json({ "message": "Pin is created successfully", createdItem })
    } catch (err) {
      if (err.code === 11000) {
        return next(`500:item title must be uniqued.`)
      }
      if (err.errors && err.errors.title) {
        return next(`500:${err.errors.title.message}`)
      } else if (err.errors && err.errors.address) {
        return next(`500:${err.errors.address.message}`)
      }
      return next(`500:${err.message}`)
    }

  },
  edit: async (req, res, next) => {
    const itemId = req.params.id;
    const updateditem = req.body.details;
    try {
      const editItem = await Item.findByIdAndUpdate(itemId, updateditem, { new: true }).populate('category');
      return res.status(200).json({ "message": "Updated pin is saved successfully.", editItem })
    } catch (err) {
      return next('500:failed to update this pin. Please try again.')
    }

  },
  destroy: async (req, res, next) => {
    const itemId = req.params.id;
    try {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      return res.status(200).json({ "message": "Pin is deleted successfully.", deletedItem })
    } catch (err) {
      return next('500:failed to delete this pin. Please try again.')
    }
  },
  search: async (req, res, next) => {
    if (req.query.lon && req.query.lat) {
      try {
        const findItem = await Item.find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [req.query.lon, req.query.lat]
              },
              $maxDistance: 1
            }
          }
        }).limit(1).populate('category');
        if (findItem.length === 0) {
          return next('404:nothing is here')
        }
        return res.status(200).json({ "message": "Here is the Pin.", findItem })
      } catch (err) {
        return next('500:Something went wrong.')
      }
    } else if (req.query.category) {
      const Ids = req.query.category.split(',');
      const newItems = [];
      const qId = []
      for (let i = 0; i < Ids.length; i++) {
        const Id = Ids[i];
        const newId = {};
        newId.category = Id;
        qId.push(newId);
      }
      try {
        const findItems = await Item.find({
          $or: qId
        });
        if (findItems.length > 0) {
          for (let i = 0; i < findItems.length; i++) {
            const item = findItems[i];
            const newItem = {
              _id: item._id,
              title: item.title,
              address: item.address,
              longitude: item.location.coordinates[0],
              latitude: item.location.coordinates[1],
            }
            newItems.push(newItem);
          }
        }
        return res.status(200).json(newItems)
      } catch (err) {
        return next('500:Something went wrong.')
      }
    } else if (req.query.day && req.query.time) {
      const time = Number(req.query.time);
      const day = req.query.day;
      const qfrom = 'open_hour.' + day + '.from';
      const qto = 'open_hour.' + day + '.to';
      try {
        const findItem = await Item.find(
          {
            $and: [
              { [qfrom]: { $lte: time } },
              { [qto]: { $gte: time } }
            ]
          }
        ).populate('category')
        const newItems = [];
        if (findItem.length > 0) {
          for (let i = 0; i < findItem.length; i++) {
            const item = findItem[i];
            const curDay = item.open_hour[day]
            for (let j = 0; j < curDay.length; j++) {
              const hour = curDay[j];
              if ((time > hour.from || time == hour.from) && (time < hour.to || time == hour.to)) {
                const newItem = {
                  _id: item._id,
                  title: item.title,
                  address: item.address,
                  longitude: item.location.coordinates[0],
                  latitude: item.location.coordinates[1],
                }
                newItems.push(newItem);
              }
            }
          }
          return res.status(200).json(newItems)
        } else {
          return res.status(200).json([])
        }
      } catch (err) {
        return next('500:Something went wrong.')
      }
    } else {
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
        res.status(200).json({ "message": "successfully find all pins.", items })
      } catch (err) {
        res.status(500).json({ "message": err })
      }
    }
  },
  uploadImage: (req, res, next) => {
    // const file = req.file;
    // const itemId = req.body.item_id;
    // if(!file) return next('500:image bad');
    // const fieldname = file.fieldname;
    const file = req.file;
    const body = req.body;
    console.log(file);
    console.log(body);
    return res.status(200).json({'message':'you hit the image upload'})
  }
}
