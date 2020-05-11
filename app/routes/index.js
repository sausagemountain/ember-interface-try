import Route from '@ember/routing/route'
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import App from "../app";

export default class IndexRoute extends Route {
  constructor() {
    super(...arguments);

    let tree = App.getCookie(this.treeViewContentsCookie)
    if (tree)
      this.tree = tree
  }

  @action
  treeviewShowModalAction() {
    function sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    console.log("treeViewShowModalAction")
    this.modalTextValue = ""
    this.treeViewModalOpen = true
    sleep(100).then(() => {
      document.getElementById("modalSidebarInput").focus()
    })
    let result = sleep(100).then(async () => {
      while (this.treeViewModalOpen){
        await sleep(100)
      }
    }).then(() => result = this.modalTextValue)
    return result
  }

  @action
  saveTreeviewCookie() {
    App.setCookie(this.treeViewContentsCookie, this.tree)
  }

  @action
  modalFailAction() {
    this.modalTextValue = null
    this.treeViewModalOpen = false
    return undefined
  }

  @action
  modalCloseAction() {
    this.treeViewModalOpen = false
    return undefined
  }

  @tracked
  treeViewModalOpen = false

  @tracked
  modalTextValue = ""

  treeViewContentsCookie = "treeViewContentsCookie"

  tree = [
    {
      'node': 'test 0',
      'items': [
        '0',
      ]
    },
  ]

  model() {
    window.addEventListener('getNewName', this.showSidebarTreeviewModal)
    window.addEventListener('hide', this.treeviewModalHidden)
    return this;
  }
}
