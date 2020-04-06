#### SET UP FOR DATABASE first!!!
In order to create category for local testing use,
please run:
```
$ node server/src/category/createCategory.js
```


### GET all
- route: /publicApi/category/all
- sample response: 
```
{
    "message": "All category is here.",
    "allCate": [
        {
            "_id": "5e81aaa041c5591a3eb92667",
            "title": "Taiwanese",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92668",
            "title": "Chinese",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92669",
            "title": "Thai",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb9266a",
            "title": "Mexican",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb9266b",
            "title": "Italian",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb9266c",
            "title": "Japanese",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb9266d",
            "title": "Korean",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb9266e",
            "title": "American",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb9266f",
            "title": "Middle Eastern",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92670",
            "title": "Dessert",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92671",
            "title": "Breakfast",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92672",
            "title": "Brunch",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92673",
            "title": "Lunch",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92674",
            "title": "Dinner",
            "__v": 0
        },
        {
            "_id": "5e81aaa041c5591a3eb92675",
            "title": "Late night",
            "__v": 0
        }
    ]
}
```

### POST
- route: /publicApi/category/create
- sample response:
```
{
    "message": "created category successfully",
    "newCate": {
        "_id": "5e81a5e051ca5d1a16ab65f0",
        "title": "this is first category",
        "__v": 0
    }
}
```
