import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {A} from '@ember/array';
import {action} from '@ember/object';
import App from "../app";

export default class DragTargetComponent extends Component {
  constructor() {
    super(...arguments);
    if(this.args.elementsCollection)
      this.elementsCollection = this.args.elementsCollection
  }
  @tracked
  elementsCollection = A([])

  @action
  clear() {
    this.elementsCollection.clear()
  }

  @action
  addItem() {
    this.args.addItem(...arguments)
  }

  @action
  edit(){
    this.args.edit(...arguments)
  }

  @action
  save(){
    this.args.save(...arguments)
  }

  @action
  onDrop(event) {
    event.preventDefault()
    if (this.args.action !== undefined){
      this.args.action()
      return
    }
    else {
      const data = event.dataTransfer.getData('data')
      const index = event.dataTransfer.getData('index')
      if (index === undefined) {
        this.elementsCollection.pushObject(data)
      } else {
        this.elementsCollection.insertAt(index, data)
      }
    }
  }

  onDragOver(event) {
    event.preventDefault()
  }
}
