import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DraggableItemComponent extends Component {

  @action
  onDragStart(data, index ,event) {
    event.dataTransfer.setData('data', data)
    if (index !== undefined) {
      event.dataTransfer.setData('index', index)
    }
  }
}
