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
  async clear() {
    await this.elementsCollection.clear()
  }

  @action
  async addItem() {
    await this.args.addItem(...arguments)
  }

  @action
  async edit(){
    await this.args.edit(...arguments)
  }

  @action
  async save(){
    await this.args.save(...arguments)
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
