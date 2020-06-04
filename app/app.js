'use strict';
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

export default class App extends Application {
  constructor() {
    super(...arguments);
    document.app = App;
  }

  static sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static repeat(ms, func, stop){
    setTimeout(() => {
      if (!stop){
        func();
        this.repeat(ms, func)
      }
    },ms)
  }

  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
