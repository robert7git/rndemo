import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

/*
import React from 'react';
import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';
export { connect };

export default (options) => {
  const app = create(options);
  if (!global.registered) options.models.forEach(model => app.model(model));
  global.registered = true;
  app.start();
  const store = app._store;
  app.start = container => () => (
      {container}
  );

  app.getStore = () => store;
  return app;
}; */
