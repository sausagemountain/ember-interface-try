import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AddToListItemComponent extends Component {
  @action
  addItem() {
    this.args.list.pushObject(this.args.item)
  }
}
