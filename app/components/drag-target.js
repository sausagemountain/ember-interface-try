import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {A} from '@ember/array';
import {action} from '@ember/object';
import App from "../app";

export default class DragTargetComponent extends Component {
  constructor() {
    super(...arguments);

    if (this.args.Name)
      this.elementsCookieName = this.args.Name + 'Cookie'

    let list = App.getCookie(this.elementsCookieName)
    if (list)
      this.elementsCollection.pushObjects(list)

    this.elementsCollection.addArrayObserver(this, {
      willChange: 'elementsWillChange',
      didChange: 'elementsDidChange'
    })
  }

  elementsWillChange() {
    //console.log(arguments)
  }

  elementsDidChange() {
    App.setCookie(this.elementsCookieName, this.elementsCollection)
  }

  elementsCookieName = 'graphItemsCookie'
  @tracked
  elementsCollection = A([])

  @action
  clear() {
    this.elementsCollection.clear()
  }

  @action
  onDrop(event) {
    event.preventDefault()
    const data = event.dataTransfer.getData('text');
    this.elementsCollection.pushObject(data)

  }

  onDragOver(event) {
    event.preventDefault()
  }
}
