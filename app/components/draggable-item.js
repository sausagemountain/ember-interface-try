import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DraggableItemComponent extends Component {

  @action
  onDragStart(event) {
    event.dataTransfer.setData('text', this.args.data)
  }
}
