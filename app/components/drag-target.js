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
    return await this.elementsCollection.clear()
  }

  @action
  async addItem() {
    this.args.addItem(...arguments).then((value) => {
      if (value !== undefined && value !== null) {
        this.elementsCollection.pushObject(value)
      }
    })
  }

  @action
  async edit(){
    return await this.args.edit(...arguments)
  }

  @action
  async save(){
    return await this.args.save(...arguments)
  }

  @action
  onDrop(event) {
    event.preventDefault()
    if (this.args.action !== undefined){
      this.args.action()
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
