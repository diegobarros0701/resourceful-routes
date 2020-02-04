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
```
## Parameters

* The first parameters is the the express [router object](https://expressjs.com/pt-br/4x/api.html#router)
* The second parameter is an [options object](#options)

## Options

| Option | Type | Description |
| -- | -- | -- |
| debug | Boolean | If set to true the `/route/info` route will be created to list all your available routes |
