


export default {
  show: (req, res, next) => {
    res.json({message: 'this is show'})
  },
  create: (req, res, next) => {
    res.json({message: 'this is create'})
  },
  edit: (req, res, next) => {
    res.json({message: 'this is edit'})
  },
  delete: (req, res, next) => {
    res.json({message: 'this is delete'})
  }

}