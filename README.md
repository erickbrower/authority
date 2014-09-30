# authority

Node.js OAuth2 Provider service on Express and PostgreSQL.

### API Specification

#### `GET /api/users`

##### Query Parameters
* __page__ (Integer) - Starts with 1
* __limit__ (Integer) - Minimum of 1, maximum of 1000

##### Response (200 OK)

```
{
  "sample": "response"
}
```

#### `GET /api/users/:user_id`

##### URI Parameters
* __user_id__ (Integer) 


##### Response (200 OK)

```
{
  "sample": "response"
}
```

#### `POST /api/users`

##### Request (Content-Type: application/json)
```
{
  "username": "solidsnake",
  "password": "raidensucks"
}
```

#### `PUT /api/users/:user_id`

#### `DELETE /api/users/:user_id`




