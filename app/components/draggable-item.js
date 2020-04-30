import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DraggableItemComponent extends Component {

  @action
  onDragStart(data ,event) {
    event.dataTransfer.setData('text', data)
  }
}
