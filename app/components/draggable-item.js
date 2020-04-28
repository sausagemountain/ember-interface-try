import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DraggableItemComponent extends Component {
  data = ""

  @action
  onDragStart(event) {
    console.log(this.args)
    event.dataTransfer.setData('text', this.data)
  }
}
