### bookstore
### POST
    `` http://127.0.0.1:8090/api/v1/book/getBookInfoByName``
### Request Headers
    ``Content-Type: application/json``
### Body
    ``{
          "book_name": "1288",
          "id":  ""
      }
     ``
### Response
    ``
    {
        "code": 200,
        "msg": "success",
        "data": [
            {
                "id": 99964,
                "book_name": "1288",
                "author": "49290",
                "price": 11167,
                "describe": "12294",
                "release_date": "2022-02-24T15:37:54+08:00",
                "status": 0
            },
            {
                "id": 59600,
                "book_name": "1288",
                "author": "30637",
                "price": 54357,
                "describe": "37717",
                "release_date": "2022-02-24T15:37:54+08:00",
                "status": 0
            },
            {
                "id": 32739,
                "book_name": "1288",
                "author": "67020",
                "price": 59561,
                "describe": "73135",
                "release_date": "2022-02-24T15:37:54+08:00",
                "status": 0
            },
            {
                "id": 11023,
                "book_name": "1288",
                "author": "63323",
                "price": 43098,
                "describe": "3189",
                "release_date": "2022-02-24T15:37:54+08:00",
                "status": 0
            }
        ]
    }
    ``