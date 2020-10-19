## Migrations

```sh
mongodump --uri="mongodb://heroku_xxxxxxx:ap4bs72xxxxxxxxxpp3fmms6@ds239368.mlab.com:39368/heroku_xxxxxxx" -d heroku_xxxxxxx -c categories -o categories.bson
mongodump --uri="mongodb://heroku_xxxxxxx:ap4bs72xxxxxxxxxpp3fmms6@ds239368.mlab.com:39368/heroku_xxxxxxx" -d heroku_xxxxxxx -c items -o items.bson
mongorestore --uri="mongodb+srv://mapitout-heroku:bTrxxxxxxxxxxe8Yn@cluster0.xm6g0.mongodb.net/mapitout?retryWrites=true&w=majority" -d mapitout -c items ./server/db/items.bson/heroku_xxxxxxx/items.bson
mongorestore --uri="mongodb+srv://mapitout-heroku:bTrxxxxxxxxxxe8Yn@cluster0.xm6g0.mongodb.net/mapitout?retryWrites=true&w=majority" -d mapitout -c categories ./server/db/categories.bson/heroku_xxxxxxx/categories.bson
```
