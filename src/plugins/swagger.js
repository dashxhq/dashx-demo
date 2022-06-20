module.exports = {
  DefaultServerPlugin: function () {
    return {
      statePlugins: {
        oas3: {
          wrapActions: {
            setSelectedServer: (oriAction, system) => (str) => {
              var params = new URLSearchParams(location.search);
              params.set('server', str);

              var newPath =
                location.pathname + '?' + params.toString() + location.hash;
              history.pushState(null, '', newPath);

              return oriAction(str);
            },
          },
        },
      },
      afterLoad(system) {
        const params = new URLSearchParams(location.search);
        if (params.has('server')) {
          system.oas3Actions.setSelectedServer(params.get('server'));
        }
      },
    };
  },
};
