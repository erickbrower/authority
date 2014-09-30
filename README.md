# authority

Node.js OAuth2 Provider service on Express and PostgreSQL.

### Development

0. `brew install postgres`

1. `npm install`
2. `npm install -g foreman mocha nodemon gulp`
3. `gulp dev:deps`
4. `nf start --procfile=Procfile.dev`
5. Log into postgres and create the `authority_dev` and `authority_test` databases.
6. `gulp db:migrate`
7. `gulp db:test:prepare`

8. `bower install`
9. `gulp assets:precompile`

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




