# Listed API 
Listed API is the definitive list making API for your list making application needs! 

This API was built for a `React & Redux` workshop. No keys / no auth, just fun and learning!

<!-- ### Authorization 
In order to make requests to the HackerYou API you need to first obtain an API key. Getting a key is easy, you need to make a POST request to `/key` and provide your email address, you will then be returned an `key` that you can use for your requests! -->

## Routes

All requests need to be prefixed with `http://lists.hackeryou.com`

<!-- ### Key
#### `/key`
**POST** or **GET** _Return or register an api key for use based on email provided_

Params | Value | Description
------ | ---- | ------
`email` : string | `your-email` | Api key to make requests

**Examples:** `http://api.hackeryou.com/v1/key?email=snickers@example.com` 

#### Sample Response 

*New Key*

	{
	  "response": {
	    "key": "$2a$10$ifelhq/xoaa3t0TTWsrz2eXx.6VyV26z92zuN.e68SosdHwnuyF/q",
	    "email": "tes@tes.com",
	  }
	}
	
*Key Exists*

	{
	  "response": {
	    "key": "$2a$10$ifelhq/xoaa3t0TTWsrz2eXx.6VyV26z92zuN.e68SosdHwnuyF/q",
	    "email": "tes@tes.com"
	  },
	  "message": "Key for email already exists"
	} -->

### Lists
### `/list`
<strong>GET</strong> _Return All Lists_

#### Sample Response 
```json

  [
    {
      "_id": "5a208081ee97e351d81e5cc5",
      "title": "Best Pizza",
      "__v": 0,
      "items": [
        {
        "_id": "5a2080aaee97e351d81e5cc6",
        "item": "Maker Pizza",
        "created_at": 1512079530916,
        "score": 192
        },
        {
        "_id": "5a2080afee97e351d81e5cc7",
        "item": "Terroni",
        "created_at": 1512079535629,
        "score": 23
        },
        {
        "_id": "5a2080baee97e351d81e5cc8",
        "item": "Old Man Pizza & Wings",
        "created_at": 1512079546455,
        "score": 2
        }
      ]
    },
    {
      "_id": "5a208081ee97e351d81e5345",
      "title": "Best James Bond",
      "__v": 0,
      "items": [
        {
        "_id": "5a2080aaee97e351d81e5cc6",
        "item": "Sean Connery",
        "created_at": 1512079530916,
        "score": 45
        },
        {
        "_id": "5a2080afee97e351d81e5cc7",
        "item": "Daniel Craig",
        "created_at": 1512079535629,
        "score": 64
        },
        {
        "_id": "5a2080baee97e351d81e5cc8",
        "item": "Pierce Brosnan",
        "created_at": 1512079546455,
        "score": 5
        }
      ]
    }
]
```

<strong>POST</strong> _Post A New List_
Params | Value | Description
------ | ------ | ------
`title` : string | `title of list` |  Required

**Example:** `http://lists.hackeryou.com/list/5a208081ee97e351d81e5cc5`

#### Sample Response 
```json
  {
    "message":"List successfully added!",
    "list": {
        "__v":0,
        "title":"Best Pizza Topping",
        "_id":"5a20b1c606c60352769f970b",
        "items":[]
      }
  }
```

### `/list/:listId`
<strong>GET</strong> _Return List By Id_

**Example:** `http://lists.hackeryou.com/list/5a208081ee97e351d81e5cc5`

#### Sample Response 

```json
{
  "_id": "5a208081ee97e351d81e5cc5",
  "title": "Best Pizza",
  "__v": 0,
  "items": [
    "5a2080aaee97e351d81e5cc6",
    "5a2080afee97e351d81e5cc7",
    "5a2080baee97e351d81e5cc8",
    "5a2080cfee97e351d81e5cc9",
    "5a2080d5ee97e351d81e5cca"
  ]
}
```

### Adding Items To Lists
### `/list/:listId/item`
<strong>POST</strong> _Post Item To List_

Params | Value | Description
------ | ------ | ------
`item` : string | `list item` | required


#### Sample Response 

```json
{
  "message":"Item successfully added!",
  "item":{
    "__v":0,
    "item":"Pineapple",
    "belongs_to":"5a20b1c606c60352769f970b",
    "created_at":1512092768230,
    "_id":"5a20b46006c60352769f970c",
    "score":0
    }
}
```


### Updating Items
### `/item/:itemId`
<strong>POST</strong> _Update_

Params | Value | Description
------ | ------ | ------
`item`: string | `some new text` | 
`belongs_to`: string | `listId` | unique id for list
`score`: number |  | updated score

#### Sample Response 

```json
{
  "message":"item updated!",
  "item":{
    "_id":"5a20b46006c60352769f970c",
    "item":"Pineapple",
    "belongs_to":"5a20b1c606c60352769f970b",
    "created_at":1512092768230,
    "__v":0,
    "score":50
    }
}
```