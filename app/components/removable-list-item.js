import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RemovableListItemComponent extends Component {
  @action
  removeItem() {
    this.args.list.removeObject(this.args.item)
  }
}
