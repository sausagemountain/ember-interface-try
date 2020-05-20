import Route from '@ember/routing/route'
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import App from "../app";

export default class IndexRoute extends Route {
  constructor() {
    super(...arguments);

    this.last = this.last.bind(this)

    const markers = App.getCookie(this.markerTreeViewContentsCookie)
    if (markers)
      this.markers = markers

    const chars = App.getCookie(this.charsTreeViewContentsCookie)
    if (chars)
      this.chars = chars
  }

  //region markerTreeView

  markers = [
    {
      'node': 'test 0',
      'canAdd': true,
      'items': [
        {
          'node': '0',
          'canAdd': false
        },
      ]
    },
  ]

  markerTreeViewContentsCookie = "markerTreeViewContentsCookie"

  @action
  saveMarkerTreeViewCookie() {
    App.setCookie(this.markerTreeViewContentsCookie, this.markers)
  }

  @tracked
  editableProperty = null

  @action
  markerTreeViewShowModalAction() {
    return App.sleep(0).then(async () => {
      this.editableProperty = {
        'name': '',
        'index': -1
      }
      this.toggleSidebar()
      while (this.optionsOpen){
        await App.sleep(100)
      }
    }).then(() => {
      let res = this.editableProperty.name
      this.editableProperty = null
      return res
    })
  }

  //endregion

  //region characteristicsTreeView

  characteristics = [
    {
      'node': 'characteristic 0',
      'items': [
        {
          'node': '0',
          'canAdd': false
        },
      ]
    },
  ]

  charsTreeViewCookie = "charTreeViewContentsCookie"

  @action
  saveCharTreeViewCookie() {
    App.setCookie(this.charsTreeViewCookie, this.characteristics)
  }

  @action
  charsTreeViewShowModalAction(){

  }

  //endregion

  //region sidebar sync

  @tracked
  markersOpen = true

  @tracked
  optionsOpen = false

  @action
  toggleSidebar() {
    this.markersOpen = !this.markersOpen
    this.optionsOpen = !this.optionsOpen
  }

  //endregion

  //region graphs

  addGraph(){

  }
  debug() {
    console.log(1)
  }

  last() {
    this.toggleSidebar()
  }

  //endregion


  model() {
    return this;
  }
}
