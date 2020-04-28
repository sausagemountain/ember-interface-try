import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {A} from '@ember/array';
import { action } from '@ember/object';

export default class DragTargetComponent extends Component {
  @tracked
  elementsCollection = A([])

  @action
  onDrop(event) {
    event.preventDefault()
    let data = event.dataTransfer.getData('text')
    this.elementsCollection.pushObject(data)
  }
  onDragOver(event) {
    event.preventDefault()
  }
}
