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
        "category": [
            {
                "_id": "5e8a75a3a36cdf25885fc3b9",
                "title": "Taiwanese",
                "__v": 0
            },
            {
                "_id": "5e8a75a3a36cdf25885fc3bf",
                "title": "Korean",
                "__v": 0
            },
            {
                "_id": "5e8a75a3a36cdf25885fc3c0",
                "title": "American",
                "__v": 0
            }
        ],
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
- sample request body:
```
{
	"details": {
      "title": "Sample restaurant",
      "address": "2023 Homestead Rd, Cupertinoddd, CA 95014",
      "location": {
      	"type":"Point",
        "coordinates": [-122.40566, 37.79768]
      },
      "open_hour": {
            "monday": [{
                "from":11,
                "to":13.4
            },{
                "from":16,
                "to":18
            }],
            "tuesday": [{
                "from":11,
                "to":13.4
            },{
                "from":16,
                "to":18
            }]
      },
      "category": ["5e8a75a3a36cdf25885fc3b9", "5e8a75a3a36cdf25885fc3bf", "5e8a75a3a36cdf25885fc3c0"],
      "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
      "order": [{
        "type": "phone",
        "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
        "action": "4082532569"
      }, {
        "type": "grubhub",
        "notes": "Deliver by grubhub.",
        "action": "https://www.grubhub.com/restaurant/taiwan-porridge-kingdom-20956-homestead-road-cupertino/1827642"
      }, {
        "type": "doordash",
        "notes": "Deliver by doordash.",
        "action": "https://www.doordash.com/store/taiwan-restaurant-san-jose-195/en-US"
      }]
    }
}
  
```
- sample response:
```
{
    "message": "Pin is created successfully",
    "createdItem": {
        "category": [
            "5e8a75a3a36cdf25885fc3b9",
            "5e8a75a3a36cdf25885fc3bf",
            "5e8a75a3a36cdf25885fc3c0"
        ],
        "open_hour": {
            "monday": [{
                "from":11,
                "to":13.4
            },{
                "from":16,
                "to":18
            }],
            "tuesday": [{
                "from":11,
                "to":13.4
            },{
                "from":16,
                "to":18
            }]
        },
        "_id": "5e8ac3c2e9ec2c3809c50575",
        "title": "Sample restaurant",
        "address": "2023 Homestead Rd, Cupertinoddd, CA 95014",
        "location": {
            "type": "Point",
            "coordinates": [
                -122.40566,
                37.79768
            ]
        },
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            {
                "_id": "5e8ac3c2e9ec2c3809c50576",
                "type": "phone",
                "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
                "action": "4082532569"
            },
            {
                "_id": "5e8ac3c2e9ec2c3809c50577",
                "type": "grubhub",
                "notes": "Deliver by grubhub.",
                "action": "https://www.grubhub.com/restaurant/taiwan-porridge-kingdom-20956-homestead-road-cupertino/1827642"
            },
            {
                "_id": "5e8ac3c2e9ec2c3809c50578",
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
- sample request body: *if any order or category has been modified, they have to be sent in full(include the original), other can be sent just the new update.
```
{
	"details": {
      "order": [
            {
                "type": "phone",
                "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
                "action": "4082532569"
            }
        ],
        "category": [
                "5e8a75a3a36cdf25885fc3b9",
                "5e8a75a3a36cdf25885fc3bf"
        ],
        "title": "Sample restaurant1"
    }
}
  
```
- sample response: 
```
{
    "message": "Updated pin is saved successfully.",
    "editItem": {
        "location": {
            "type": "Point",
            "coordinates": [
                -122.40566,
                37.79768
            ]
        },
        "category": [
            {
                "items": [
                    "5e8aaecc61c9722dc2e15073",
                    "5e8aaeea61c9722dc2e15077",
                    "5e8ac3194de90b378afb7b52",
                    "5e8ac3c2e9ec2c3809c50575"
                ],
                "_id": "5e8a75a3a36cdf25885fc3b9",
                "title": "Taiwanese",
                "__v": 4
            },
            {
                "items": [
                    "5e8aaecc61c9722dc2e15073",
                    "5e8aaeea61c9722dc2e15077",
                    "5e8ac3194de90b378afb7b52",
                    "5e8ac3c2e9ec2c3809c50575"
                ],
                "_id": "5e8a75a3a36cdf25885fc3bf",
                "title": "Korean",
                "__v": 4
            }
        ],
        "open_hour": {
            "monday": [{
                "from":11,
                "to":13.4
            },{
                "from":16,
                "to":18
            }],
            "tuesday": [{
                "from":11,
                "to":13.4
            },{
                "from":16,
                "to":18
            }]
        },
        "_id": "5e8ac3c2e9ec2c3809c50575",
        "title": "Sample restaurant1",
        "address": "2023 Homestead Rd, Cupertinoddd, CA 95014",
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            {
                "_id": "5e8ac49be9ec2c3809c5057a",
                "type": "phone",
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
- route: /publicApi/item/
- sample response: 
```
{
    "message": "successfully find all pins.",
    "items": [
        {
            "_id": "5e8146c2e3de4c0b5b1e8cf0",
            "title": "Taiwan Porridge Kingdom1",
            "address": "20956 Homestead Rd, Cupertino, CA 95014",
            "longitude": 40,
            "latitude": -122
        },
        {
            "_id": "5e814b09e497c40c4a723643",
            "title": "Taiwan Porridge Kingdom1ddd",
            "address": "20956 Homestead Rd, Cupertinoddd, CA 95014",
            "longitude": 40,
            "latitude": -122
        },
        {
            "_id": "5e8191b51b7e8e1481629a76",
            "title": "Sample restaurant",
            "address": "20956 Homestead Rd, Cupertinoddd, CA 95014",
            "longitude": 40,
            "latitude": -122
        }
    ]
}
```
### GET search
- route: /publicApi/item?key=value
- example api route: 

for searching longitude and latitude within 
```
/publicApi/item?lon=-122.0123&lat=37.0123

```
response: 
```
{
    "message": "Here is the Pin.",
    "findItem": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -122.40566,
                    37.79768
                ]
            },
            "category": [
                {
                    "items": [
                        "5e8aaecc61c9722dc2e15073",
                        "5e8aaeea61c9722dc2e15077"
                    ],
                    "_id": "5e8a75a3a36cdf25885fc3b9",
                    "title": "Taiwanese",
                    "__v": 2
                },
            ],
            "open_hour": [],
            "_id": "5e8aaeea61c9722dc2e15077",
            "title": "Sample333 restaurantqq2dd055",
            "address": "2023 Homestead Rd, Cupertinoddd, CA 95014",
            "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
            "order": [
                {
                    "_id": "5e8aaeea61c9722dc2e15078",
                    "type": "phone",
                    "notes": "Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.",
                    "action": "4082532569"
                }
            ],
            "__v": 0
        }
    ]
}
```

for searching items within specific hour in day:
```
/publicApi/item?day=monday&time=11.3
```
response:(array of objects)
```
[
    {
        "location": {
            "type": "Point",
            "coordinates": [
                -122.40566,
                37.79768
            ]
        },
        "category": [
           ...
        ],
        "_id": "5e8e50e11c4a168e96070e1a",
        "title": "Sample restaurantss",
        "address": "2023 Homestead Rd, Cupertinoddd, CA 95014",
        "open_hour": {
            "_id": "5e8e50e11c4a168e96070e1b",
            "monday": [
                {
                    "_id": "5e8e50e11c4a168e96070e1c",
                    "from": 11,
                    "to": 13.4
                },
                {
                    "_id": "5e8e50e11c4a168e96070e1d",
                    "from": 16,
                    "to": 18
                }
            ],
            "tuesday": [
                {
                    "_id": "5e8e50e11c4a168e96070e1e",
                    "from": 11,
                    "to": 13.4
                },
                {
                    "_id": "5e8e50e11c4a168e96070e1f",
                    "from": 16,
                    "to": 18
                }
            ],
            "wednesday": [],
            "thursday": []
        },
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            ...
        ],
        "__v": 0
    },
    {
        "location": {
            "type": "Point",
            "coordinates": [
                -122.40566,
                37.79768
            ]
        },
        "category": [
            ...
        ],
        "_id": "5e8e5bfaf03bc792d15b8477",
        "title": "Sample restaurantss123",
        "address": "2023 Homestead Rd, Cupertinoddd, CA 95014",
        "open_hour": {
            "_id": "5e8e5bfaf03bc792d15b8478",
            "monday": [
                {
                    "_id": "5e8e5bfaf03bc792d15b8479",
                    "from": 10,
                    "to": 16.3
                },
                {
                    "_id": "5e8e5bfaf03bc792d15b847a",
                    "from": 18,
                    "to": 22
                }
            ],
            "tuesday": [
                {
                    "_id": "5e8e5bfaf03bc792d15b847b",
                    "from": 11,
                    "to": 13.4
                },
                {
                    "_id": "5e8e5bfaf03bc792d15b847c",
                    "from": 16,
                    "to": 18
                }
            ],
            "wednesday": [],
            "thursday": []
        },
        "menu": "https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg",
        "order": [
            ...
        ],
        "__v": 0
    }
]
```
