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
    this.modalTextValue = ""
    this.treeViewModalOpen = true
    let result = App.sleep(100).then(async () => {
      while (this.treeViewModalOpen){
        await App.sleep(100)
      }
    }).then(() => {
      if (this.treeViewModalSuccess) {
        result = this.modalTextValue
      }
      else {
        result = null
      }
      return result
    })
    return result
  }

  @action
  saveTreeviewCookie() {
    App.setCookie(this.treeViewContentsCookie, this.tree)
  }

  @action
  modalFailAction() {
    this.treeViewModalSuccess = false
    this.treeViewModalOpen = false
  }

  @action
  modalCloseAction() {
    this.treeViewModalSuccess = true
    this.treeViewModalOpen = false
  }

  @action
  modalKeyDownCloseAction(event) {
    console.log(event)
    if (event.key === 'Enter') {
      this.treeViewModalSuccess = true
      this.treeViewModalOpen = false
    }
    else if (event.key === 'Escape') {
      this.treeViewModalSuccess = false
      this.treeViewModalOpen = false
    }
  }

  @tracked
  treeViewModalOpen = false

  @tracked
  treeViewModalSuccess = null

  @tracked
  modalTextValue = ""

  treeViewContentsCookie = "treeViewContentsCookie"

  @action
  modalOpen(){
    const input = document.getElementById("modalSidebarInput")
    input.focus()
    input.addEventListener('keydown', this.modalKeyDownCloseAction)
  }

  tree = [
    {
      'node': 'test 0',
      'items': [
        '0',
      ]
    },
  ]

  model() {
    return this;
  }
}
