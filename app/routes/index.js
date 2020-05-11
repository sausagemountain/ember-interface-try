import Route from '@ember/routing/route'
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import App from "../app";

export default class IndexRoute extends Route {
  constructor() {
    super(...arguments);

    const markers = App.getCookie(this.markerTreeViewContentsCookie)
    if (markers)
      this.markers = markers

    const chars = App.getCookie(this.charsTreeViewContentsCookie)
    if (chars)
      this.chars = chars
  }

  //region markerTreeViewModal

  @action
  markerModalOpen(){
    const input = document.getElementById("markerModalSidebarInput")
    input.focus()
    input.addEventListener('keydown', this.markerModalKeyDownCloseAction)
  }

  @action
  markerModalFailAction() {
    this.markerTreeViewModalSuccess = false
    this.markerTreeViewModalOpen = false
  }

  @action
  markerModalCloseAction() {
    this.markerTreeViewModalSuccess = true
    this.markerTreeViewModalOpen = false
  }

  @action
  markerModalKeyDownCloseAction(event) {
    if (event.key === 'Enter') {
      this.markerModalCloseAction()
    }
    else if (event.key === 'Escape') {
      this.markerModalFailAction()
    }
  }

  @tracked
  markerTreeViewModalOpen = false

  @tracked
  markerTreeViewModalSuccess = null

  @tracked
  markerModalTextValue = ""

  //endregion

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

  @action
  markerTreeViewShowModalAction() {
    this.markerModalTextValue = ""
    this.markerTreeViewModalOpen = true
    return App.sleep(100).then(async () => {
      while (this.markerTreeViewModalOpen){
        await App.sleep(100)
      }
    }).then(() => {
      if (this.markerTreeViewModalSuccess) {
        return {
          'node': this.markerModalTextValue,
        }
      }
      else {
        return null
      }
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
    console.log(1)
    this.markersOpen = !this.markersOpen
    this.optionsOpen = !this.optionsOpen
  }

  //endregion

  //region graphs

  addGraph(){

  }

  //endregion

  model() {
    return this;
  }
}
