'use strict';
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

export default class App extends Application {
  constructor() {
    super(...arguments);
  }


  static sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  static encodeCookieValue(val) {
    if (!val)
      return ''
    const json = JSON.stringify(val)
    return encodeURIComponent(json)
  }

  static decodeCookieValue(val) {
    if (!val)
      return null
    const decoded = decodeURIComponent(val)
    return JSON.parse(decoded)
  }

  static getCookie(name){
    const nm = name + "="
    const ca = document.cookie.split(';')
    for (let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(nm) === 0) {
        return App.decodeCookieValue(c.substring(nm.length))
      }
    }
    return ""
  }

  static setCookie(name, value, exDays = 1) {
    let d = new Date()
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000))
    const expires = 'expires' + '=' + d.toUTCString() + ';';
    const path = 'path=/;';
    const sameSite = 'SameSite=Strict;'
    document.cookie = name + '=' + App.encodeCookieValue(value) + ';' + expires + path + sameSite

  }

  static getCookieObject(){
    const ca = document.cookie.split(';')
    let cookie = {}
    for (let i = 0; i <ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      let cName = c.substring(0, c.indexOf('='))
      cookie[cName] = App.decodeCookieValue(c.substring(cName.length))
    }
    return cookie
  }

  static setCookieObject(object, exDays = 1){
    for (let i in object) {
      this.setCookie(i, object[i], exDays)
    }
  }
}

loadInitializers(App, config.modulePrefix);
