const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({


  name: 'mfe1',

  exposes: {
   // './Component': './src/app/app.component.ts',
   './OrderModule': './src/app/order/order.module.ts'
  },

  remotes: {
  "mfe-rule":"mfe-rule@http://localhost:4002/remoteEntry.js" ,
  "mfe-user":"mfe-user@http://localhost:4004/remoteEntry.js" ,

   
   },


  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});