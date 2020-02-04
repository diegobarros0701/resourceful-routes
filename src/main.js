function setup(router, options = {}) {
  Object.defineProperty(router, 'namespace', {
    value: namespace
  });

  Object.defineProperty(router, 'resource', {
    value: resource
  });

  if (options.debug) {
    router.get('/routes/info', (req, res) => {
      let routesInfo = [];
      router.stack.forEach(stack => {
        stack.route.stack.forEach(routePathStack => {
          routesInfo.push('path: ' + stack.route.path + ' | to: ' + routePathStack.name + ' | method: ' + routePathStack.method);
          // routesInfo.push({
          //   path: stack.route.path,
          //   to: routePathStack.name,
          //   method: routePathStack.method
          // });
        });
      });

      res.json(routesInfo);
    });
  }
}

/**
 * 
 * @param {string} path the base path
 * @param {{}} controller controller containing the handlers for the requests
 * @param {{ only?: [], except?: [], prefix: string, paramName: string,
 *           index?: { actionName?: string, handlers?: [] }, 
 *           show: { paramName?: string, actionName?: string, handlers?: [] }, 
 *           store: { actionName?: string, handlers?: [] }, 
 *           update: { paramName?: string, actionName?: string, handlers?: [] }, 
 *           destroy: { paramName?: string, actionName?: string, handlers?: [] } }} options a set of options to configure the route
 */
function resource(path, controller, options = {}) {
  setDefaultResourceOptionsValues(options);

  let actions = getActions(options.paramName);
  let basePath = removeSlashsFromSides(path);

  if (options.prefix)
    basePath = removeSlashsFromSides(options.prefix) + '/' + basePath;

  basePath = '/' + basePath;

  Object.keys(actions).forEach(action => {
    if (controller[action] && options.only.includes(action) && !options.except.includes(action)) {
      let actionSettings = actions[action];
      let fullRoutePath = basePath + actionSettings.path;

      actionSettings.methods.forEach(actionMethod => {
        this[actionMethod](fullRoutePath, controller[action]);
      });
    }
  });
}

function getActions(paramName = 'id') {
  return {
    index: {
      path: '',
      methods: ['get']
    },
    show: {
      path: `/:${paramName}`,
      methods: ['get']
    },
    update: {
      path: `/:${paramName}`,
      methods: ['patch', 'put']
    },
    store: {
      path: '',
      methods: ['post']
    },
    destroy: {
      path: `/:${paramName}`,
      methods: ['delete']
    }
  };
};

function setDefaultResourceOptionsValues(options) {
  options.only = options.only || Object.keys(getActions(options.paramName));
  options.except = options.except || [];
}

function removeSlashsFromSides(value) {
  value = value.replace(/^\/*/, '');
  value = value.replace(/\/*$/, '');

  return value;
}

function namespace(value, routeParams = []) {
  routeParams.forEach(routeParam => {
    routeParam.options = {
      prefix: value
    };
    resource.call(this, routeParam);
  });
}

module.exports = setup;