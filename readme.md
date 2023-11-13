# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs
* Body Parser

---

## URL

_Server_
```
http://localhost:8080
```
---

## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

## RESTful endpoints

### GET /all

> Get all data

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{

    "data": {
        "<data_type>": [
	         "name": "<name>",
           "description": "<description>",
	       ],
        "<data_type>": [
	         "name": "<name>",
           "description": "<description>",
	       ],
        },

    "status": "Success"

}
```

---

### GET /all/:type

> Get all by type

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{

    "data": {
        "<data_type>": [
	        <data_product>
	       ]
        },

    "status": "Success"

}
```

---

### GET /all/:type/:product/:name

 > Get by name

_Request Params_

```
<type_name>/<product_name>/<tokopedia_or_shopee_name>

```

_Request Header_

```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "name": "<name>",
        "description": "<description>"
    },
    "message": "Success"
}
```

_Response (404)_
```
{
    "message": "Data Not Found"
}
```

### POST /create/:type/:product

> Create tokopedia or shopee

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
  "description" : "<description>"
}
```

_Response (200)_
```
{
    "data": [<data_product>]
    "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"description\" is required"
}
```

---

### PUT /all/:type/:product/:name

> Update by name

_Request Params_
```
/<type_name>/<product_name>/<tokopedia_or_shopee_name>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "<name>",
  "description": "<description>",
}
```

_Response (200)_
```
{
    "data": [
        <product_list>
    ],
    "message": "Success"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### DELETE /all/:type/:product/:name

> Delete by name

_Request Params_
```
/<type_name>/<product_name>/<name>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [<product_list>],
    "message": "Success"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---