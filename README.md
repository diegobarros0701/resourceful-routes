# Resourceful routes

A effortlessly [express](https://github.com/expressjs/express) package to generate resourceful routes

## Installation

```bash
npm install resourceful-routes
```
or
```bash
yarn add resourceful-routes
```

## How to use

Import the package and pass your express router object as a param.

Example:

```javascript
// routes.js

const router = require('express').Router();
require('resourceful-routes')(router, { debug: true });

router.resource('/users', UsersController, {
  except: ['show', 'destroy']
});
router.resource('contacts', ContactsController, {
  only: ['show'],
  paramName: 'contact_id'
})
```

Will mount the following routes:

| Route | Method |
|--|--|
| `/users` | `get` |
| `/users` | `post` |
| `/users/:id` | `put and patch` |
| `/contacts/:contact_id` | `get` |

## Methods

### Constructor

### constructor(router, options = {})

The initial setup for the package

### # constructor params

| Param | Description |
| -- | -- |
| `router` | The express [router object](https://expressjs.com/pt-br/4x/api.html#router) |
| `options` | [setup options object](#options) `

### # constructor options

| Option | Type | Description |
| -- | -- | -- |
| debug | Boolean | If set to true the `/route/info` route will be created to list all your available routes |

### Resource

### resource(path, controller, options = {})

Mount all the following routes, if not specified different in `options`

| Route | Method |
|--|--|
| `/path` | `get` |
| `/path` | `post` |
| `/path/:id` | `get` |
| `/path/:id` | `put` `patch` |
| `/path/:id` | `destroy` |

### # resource params

| Param | Description |
| -- | -- |
| `path` | The path name to be mounted |
| `controller` | The object containing the functions |
| `options` | The [options object](#resource-options)

### # resource options

```javascript
{
  only: [],
  except: [],
  paramName: ':id'
}
```

| Option | Type | Default | Description |
| -- | -- | -- | -- |
| `only` | `Array` | `[]` | An array containg the actions that should be mounted |
| `except` | `Array` | `[]` | An array containg the actions that should not be mounted |
| `paramName` | `string` | `:id` | The route param name |
