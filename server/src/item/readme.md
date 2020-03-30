### GET
- route: /publicApi/item/:id
- sample response: 
```
{
    "message": "find pin successfully",
    "findItem": {
        "location": {
            "coordinates": [
                40,
                -122
            ],
            "type": "Point"
        },
        "category": [],
        "open_hour": [],
        "_id": "5e814676204e810b519126aa",
        "title": "Taiwan Porridge Kingdom",
        "address": "20956 Homestead Rd, Cupertino, CA 95014",
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            {
                "_id": "5e814676204e810b519126ab",
                "type": "phone",
                "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
                "action": "4082532569"
            },
            {
                "_id": "5e814676204e810b519126ac",
                "type": "grubhub",
                "notes": "Deliver by grubhub.",
                "action": "https://www.grubhub.com/restaurant/taiwan-porridge-kingdom-20956-homestead-road-cupertino/1827642"
            },
            {
                "_id": "5e814676204e810b519126ad",
                "type": "doordash",
                "notes": "Deliver by doordash.",
                "action": "https://www.doordash.com/store/taiwan-restaurant-san-jose-195/en-US"
            }
        ],
        "__v": 0
    }
}
```
### POST
- route: /publicApi/item/create
- sample response:
```
{
    "message": "Pin is created successfully",
    "createdItem": {
        "location": {
            "coordinates": [
                40,
                -122
            ],
            "type": "Point"
        },
        "category": [],
        "open_hour": [],
        "_id": "5e8191b51b7e8e1481629a76",
        "title": "Sample restaurant",
        "address": "20956 Homestead Rd, Cupertinoddd, CA 95014",
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            {
                "_id": "5e8191b51b7e8e1481629a77",
                "type": "phone",
                "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
                "action": "4082532569"
            },
            {
                "_id": "5e8191b51b7e8e1481629a78",
                "type": "grubhub",
                "notes": "Deliver by grubhub.",
                "action": "https://www.grubhub.com/restaurant/taiwan-porridge-kingdom-20956-homestead-road-cupertino/1827642"
            },
            {
                "_id": "5e8191b51b7e8e1481629a79",
                "type": "doordash",
                "notes": "Deliver by doordash.",
                "action": "https://www.doordash.com/store/taiwan-restaurant-san-jose-195/en-US"
            }
        ],
        "__v": 0
    }
}
```

### PUT
- route: /publicApi/item/edit/:id
- sample response: 
```
{
    "message": "Updated pin is saved successfully.",
    "editItem": {
        "location": {
            "coordinates": [
                40,
                -122
            ],
            "type": "Point"
        },
        "category": [],
        "open_hour": [],
        "_id": "5e814676204e810b519126aa",
        "title": "",
        "address": "20956 Homestead Rd, Cupertino, CA 95014",
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            {
                "_id": "5e818f5c1da3ac1217b25be5",
                "type": "phonefffwef",
                "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
                "action": "4082532569"
            }
        ],
        "__v": 0
    }
}
```

### DELETE
- route: /publicApi/item/delete/:id
- sample response: 
```
{
    "message": "Pin is deleted successfully.",
    "deletedItem": {
        "location": {
            "coordinates": [
                40,
                -122
            ],
            "type": "Point"
        },
        "category": [],
        "open_hour": [],
        "_id": "5e814676204e810b519126aa",
        "title": "",
        "address": "20956 Homestead Rd, Cupertino, CA 95014",
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            {
                "_id": "5e818f5c1da3ac1217b25be5",
                "type": "phonefffwef",
                "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
                "action": "4082532569"
            }
        ],
        "__v": 0
    }
}
```

### GET ALL
### GET search