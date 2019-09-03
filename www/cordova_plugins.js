cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    },
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-pdialog.PDialog",
      "file": "plugins/cordova-plugin-pdialog/www/plugins.PDialog.js",
      "pluginId": "cordova-plugin-pdialog",
      "clobbers": [
        "cordova.plugin.pDialog"
      ]
    },
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-screen-orientation.screenorientation",
      "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
      "pluginId": "cordova-plugin-screen-orientation",
      "clobbers": [
        "cordova.plugins.screenorientation"
      ]
    },
    {
      "id": "cordova-plugin-spinnerdialog.SpinnerDialog",
      "file": "plugins/cordova-plugin-spinnerdialog/www/spinner.js",
      "pluginId": "cordova-plugin-spinnerdialog",
      "merges": [
        "window.plugins.spinnerDialog"
      ]
    },
    {
      "id": "cordova-plugin-spinner.SpinnerPlugin",
      "file": "plugins/cordova-plugin-spinner/www/spinner-plugin.js",
      "pluginId": "cordova-plugin-spinner",
      "clobbers": [
        "SpinnerPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-geolocation": "4.0.2",
    "cordova-plugin-network-information": "2.0.2",
    "cordova-plugin-pdialog": "2.0.1",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-screen-orientation": "3.0.2",
    "cordova-plugin-spinnerdialog": "1.3.2",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-spinner": "1.1.0"
  };
});