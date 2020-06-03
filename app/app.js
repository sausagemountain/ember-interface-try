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

  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  static encodeUrl(val) {
    if (!val)
      return ''
    return encodeURIComponent(this.stringify(val))
  }

  static stringify(val) {
    if (!val)
      return ''
    return JSON.stringify(val)
  }

  static decodeUrl(val) {
    if (!val)
      return null
    return this.unStringify(decodeURIComponent(val))
  }

  static unStringify(val) {
    if (!val)
      return null
    return JSON.parse(val)
  }

  static setCookie(name, value) {
    window.localStorage[name] = this.stringify(value)
  }

  static getCookie(name){
    return this.unStringify(window.localStorage[name])
  }

  static getCookieObject(){
    let res = {}
    for (let key in window.localStorage) {
      res[key] = this.getCookie(key)
    }
    return res;
  }

  static setCookieObject(myObject){
    for (let i in myObject) {
      // eslint-disable-next-line no-prototype-builtins
      if (myObject.hasOwnProperty(i)) {
        this.setCookie(i, myObject[i])
      }
    }
  }
}

loadInitializers(App, config.modulePrefix);
